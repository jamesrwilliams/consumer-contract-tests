import { foo } from './config.js';

/**
 * An ES module function that returns "foo".
 * @returns {string}
 */
const firstLevel = () => {
  return foo;
}

export default firstLevel;
