import {expect} from 'chai';

import scan, {forExt} from '../src/index';

describe('scan', () => {
  it('should scan files', async () => {
    const list = await scan(__dirname + '/dir');
    expect(list.sort()).to.be.deep.equal([
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/dir1/special.file",
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/node_modules",
    ]);
    return true;
  });

  it('should scan all files', async () => {
    const list = await scan(__dirname + '/dir', () => true, () => false);
    expect(list.sort()).to.be.deep.equal([
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/dir1/node_modules/node.js",
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/dir1/node_modules/special.file",
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/dir1/special.file",
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/node_modules",
    ]);
    return true;
  });

  it('should find special file', async () => {
    const list = await scan(__dirname + '/dir', forExt('file'));
    expect(list).to.be.deep.equal([
      "/Users/akorzunov/dev/Z/mellis/github/utils/scan-directory/_tests/dir/dir1/special.file"
    ]);
    return true;
  });
});