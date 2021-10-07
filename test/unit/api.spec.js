// TODO
import { example_import } from '../../lib/api';

/**
 * When running straight mocha this will fail as we're loading an ES module
 */
describe('A unit test', () => {
  describe('foo', () => {
    expect(example_import()).to.eql('hello world')
  });
});
