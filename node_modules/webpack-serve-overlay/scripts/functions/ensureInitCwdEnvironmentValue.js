const /** @type {module:path} */ path = require('path');

/**
 * Ensures that `process.env.INIT_CWD` has been set to a value (and that that value is a string).
 *
 * This env value is provided by `npm`, but other package managers (such as yarn) may
 * not provide it; in those cases we want to use a fallback value that should work fine.
 *
 * This method expects to be called by a script running one level down from the project root,
 * and thus accessible via `<callers __dirname>/..`.
 *
 * @param {string} scriptsDirname value of the `__dirname` of the script calling this method.
 *
 * @return {boolean}
 */
const ensureInitCwdEnvironmentValue = scriptsDirname => {
    if (typeof process.env.INIT_CWD === 'string') {
        return true;
    } // we don't have to fallback if it exists

    const fallbackCwd = path.join(scriptsDirname, '..');

    console.warn(`process.env.INIT_CWD is not defined; falling back to ${fallbackCwd}`);
    console.warn(`if you're using yarn, you should checkout this issue: https://github.com/yarnpkg/yarn/issues/5698`);
    console.log();

    if (process.env.INIT_CWD) {
        console.warn(`(actually, it is defined, but with a value of ${process.env.INIT_CWD}, which we don't like?)`);
    }

    process.env.INIT_CWD = fallbackCwd;

    return false;
};

module.exports = ensureInitCwdEnvironmentValue;
