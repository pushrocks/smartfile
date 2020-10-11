import { tap, expect } from '@pushrocks/tapbundle';

import * as smartfile from '../ts';

tap.test('should create a virtualdirectory', async () => {
  const virtualDir = await smartfile.VirtualDirectory.fromFsDirPath('./test/testassets/testfolder');
  expect(virtualDir.smartfileArray.length).to.equal(4);
});

tap.test('should write to a directory', async () => {
  const virtualDir = await smartfile.VirtualDirectory.fromFsDirPath('./test/testassets/testfolder');
  virtualDir.saveToDisk('./test/testassets/test');
});

tap.start();