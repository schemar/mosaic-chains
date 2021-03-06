import 'mocha';
import { assert } from 'chai';
import * as os from 'os';
import * as path from 'path';
import Directory from '../src/Directory';

describe('Directory.projectRoot', () => {
  it('returns the correct root of the project', () => {
    assert.strictEqual(
      Directory.projectRoot,
      path.join(
        __dirname,
        '..',
      ),
      'Project root is not set to the actual root of this project.',
    );
  });
});

describe('Directory.sanitize()', () => {
  it('replaces tilde with the home directory', () => {
    assert.strictEqual(
      Directory.sanitize('~/test/other'),
      path.join(
        os.homedir(),
        'test',
        'other',
      ),
      'Directory does not correctly replace the tilde with the home directory.',
    );
  });

  it('converts relative to absolute path', () => {
    assert.strictEqual(
      Directory.sanitize('./some/path'),
      path.join(
        Directory.projectRoot,
        'some',
        'path'
      ),
      'Does not properly replace `.` with the project root.',
    );

    assert.strictEqual(
      Directory.sanitize('other/path'),
      path.join(
        Directory.projectRoot,
        'other',
        'path'
      ),
      'Does not properly add project root before a relative path.',
    );
  });
});
