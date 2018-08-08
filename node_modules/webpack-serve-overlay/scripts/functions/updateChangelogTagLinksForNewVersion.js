const /** @type {module:fs} */ fs = require('fs');

/**
 * Transforms a 'loose' url to a git repo into a more usable one.
 *
 * This transformation includes a number of things:
 *  - Replacing `ssh://git@` with `https://`, if present, and
 *  - Removing `.git` from the end of the url, if present.
 *
 * For example:
 *
 * `ssh://git@bitbucket.org/preferizi/bot-configs-manager.git`
 *
 * would become
 *
 * `https://bitbucket.org/preferizi/bot-configs-manager`.
 *
 * @param {string} gitRepoUrl
 *
 * @return {string}
 */
const ensureProperGitRepoLink = gitRepoUrl => {
    return gitRepoUrl
        .replace('ssh://git@', 'https://')
        .replace('.git', '');
};

/**
 * Gets the separator used by the remote host of the given repository,
 * that's used in their /compare/<source><separator><destination> url.
 *
 * For github, it's `...`, and for bitbucket it's `..`.
 *
 * @param {string} repoUrl
 *
 * @return {string}
 */
const getCompareSpacerFromRepoHostUrl = repoUrl => {
    if (repoUrl.startsWith('https://bitbucket')) { // bitbucket
        return '..';
    }
    if (repoUrl.startsWith('https://github')) { // github
        return '...';
    }

    throw new Error(`unknown repo host ${repoUrl}`);
};

/**
 * Builds the url for comparing two tags on a git repo host (either bitbucket or github).
 *
 * @param {string} repoUrl
 * @param {string} newVersionTag
 * @param {string} lastVersionTag
 *
 * @return {?string}
 */
const buildCompareUrl = (repoUrl, newVersionTag, lastVersionTag) => {
    const repoCompareSpacer = getCompareSpacerFromRepoHostUrl(repoUrl);

    if (repoUrl.startsWith('https://bitbucket')) { // bitbucket: source -> destination
        return `${repoUrl}/compare/${newVersionTag}${repoCompareSpacer}${lastVersionTag}`;
    }

    if (repoUrl.startsWith('https://github')) { // github: base <- compare
        return `${repoUrl}/compare/${lastVersionTag}${repoCompareSpacer}${newVersionTag}`;
    }

    throw new Error(`unknown repo host ${repoUrl}`);
};

/**
 * Gets the tag of the old version from the changelog's unreleased url.
 *
 * This url is expected to be comparing between HEAD & the last version tag,
 * either `HEAD..<version>` (if bitbucket) or `<version>...HEAD` (if github).
 *
 * @param {string} unreleasedLinkUrl
 *
 * @return {string}
 */
const getOldVersionTagFromUnreleasedLink = unreleasedLinkUrl => {
    const repoCompareSpacer = getCompareSpacerFromRepoHostUrl(unreleasedLinkUrl);
    const compareRangeString = unreleasedLinkUrl.split('/').pop();

    if (unreleasedLinkUrl.startsWith('https://bitbucket')) { // bitbucket
        return compareRangeString.split(repoCompareSpacer)[1];
    }
    if (unreleasedLinkUrl.startsWith('https://github')) { // github
        return compareRangeString.split(repoCompareSpacer)[0];
    }

    throw new Error(`unknown repo host ${unreleasedLinkUrl}`);
};

/**
 * Gets the `[Unreleased]` url link from the `CHANGELOG.md`.
 *
 * @param {string} changelog the contents of the `CHANGELOG.md` file.
 * @param {string} gitUrl the url to the repos git remote.
 *
 * @return {string}
 */
const getUnreleasedCompareUrl = (changelog, gitUrl) => {
    const unreleasedLinkPrefix = '[Unreleased]: ';

    const unreleasedVersionCompareUrlStart = changelog.lastIndexOf(`${unreleasedLinkPrefix}${gitUrl}/compare/`) + unreleasedLinkPrefix.length;
    const unreleasedVersionCompareUrlEnd = changelog.indexOf('\n', unreleasedVersionCompareUrlStart);

    if (unreleasedVersionCompareUrlStart - unreleasedLinkPrefix.length === -1) {
        throw new Error(`unable to find '${`${unreleasedLinkPrefix}${gitUrl}/compare/`} in changelog`);
    }

    return changelog.substring(unreleasedVersionCompareUrlStart, unreleasedVersionCompareUrlEnd);
};

/**
 * Updates the version tag compare links at the bottom of the `CHANGELOG.md`.
 *
 * It's assumed there is a blank newline between the [Unreleased] url & next version url.
 *
 * The `gitRepoUrl` will be passed through the {@link ensureProperGitRepoLink} method,
 * meaning that it's fine to pass git ssh urls, and urls that end with `'.git'`.
 *
 * It's assumed that the git tag used will be `newVersionString` prefixed with a `v`,
 * per the usual behaviour of calling `npm version`.
 *
 * @param {string} newVersionString the version string used by the package in the `version` field of the `package.json`.
 * @param {string} gitRepoUrl url to the bitbucket repo, taking from the `repository.url` field of the `package.json`.
 * @param {string} changelogPath the path to the `CHANGELOG.md` file.
 */
const updateChangelogTagLinksForNewVersion = (newVersionString, gitRepoUrl, changelogPath) => {
    const oldChangelogFile = fs.readFileSync(changelogPath).toString();

    const repoUrl = ensureProperGitRepoLink(gitRepoUrl);
    const unreleasedCompareUrl = getUnreleasedCompareUrl(oldChangelogFile, repoUrl);

    const newVersionTag = `v${newVersionString}`;
    const oldVersionTag = getOldVersionTagFromUnreleasedLink(unreleasedCompareUrl);

    const newChangelogFile = oldChangelogFile.replace(
        [
            `[Unreleased]: ${buildCompareUrl(repoUrl, 'HEAD', oldVersionTag)}`,
            null // there should be a blank line between the [Unreleased] url & the block of tag urls
        ].join('\n'),
        [
            `[Unreleased]: ${buildCompareUrl(repoUrl, 'HEAD', newVersionTag)}`,
            null, // there should be a blank line between the [Unreleased] url & the block of tag urls
            `[${newVersionString}]: ${buildCompareUrl(repoUrl, newVersionTag, oldVersionTag)}`
        ].join('\n')
    );

    fs.writeFileSync(changelogPath, newChangelogFile);
};

module.exports = updateChangelogTagLinksForNewVersion;
