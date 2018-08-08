/**
 * Script for keeping files surrounding the `package.json` up to date with version increments.
 *
 * This script updates the `CHANGELOG.md` to include the new version in place of [Unreleased].
 * This script updates the `CHANGELOG.md` to include the correct version links & urls.
 *
 * Called by `npm` when `npm version` is run, resulting in a new git commit & version tag.
 */

// ensure that process.env.INIT_CWD is set to *something*
require('./functions/ensureInitCwdEnvironmentValue')(__dirname);

const /** @type {module:path} */ path = require('path');
const /** @type {Object} */ packageJson = require('./../package.json');

const moveChangelogUnreleasedHeaderForVersion = require('./functions/moveChangelogUnreleasedHeaderForVersion');
const updateChangelogTagLinksForNewVersion = require('./functions/updateChangelogTagLinksForNewVersion');
const addFilesToGit = require('./functions/addFilesToGit');

/**
 * Map of file paths that will be altered in this script.
 *
 * The paths are passed in a call to the {@link addFilesToGit} method
 * at the end of this script, which is required for `npm version` to include the file
 * changes in it's version-bumping commit.
 */
const filePaths = {
    CHANGELOG: path.join(process.env.INIT_CWD, 'CHANGELOG.md')
};

// region update CHANGELOG.md [Unreleased] header
console.log(`moving [Unreleased] header in CHANGELOG.md to be ${packageJson.version}...`);
moveChangelogUnreleasedHeaderForVersion(packageJson.version, filePaths.CHANGELOG);
// endregion
// region update CHANGELOG.md version header links
packageJson.repository
    ? console.log(`updating tag links in CHANGELOG.md...`) || updateChangelogTagLinksForNewVersion(packageJson.version, packageJson.repository.url, filePaths.CHANGELOG)
    : console.log('skipping changelog links since there\'s no repository...');
// endregion

console.log();
// add all changed files to git, so they'll be committed by npm
addFilesToGit(Object.values(filePaths), process.env.INIT_CWD);
console.log();
console.log('all done! -- have a nice day :)');
console.log();

