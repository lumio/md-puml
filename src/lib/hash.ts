import { createHash } from 'crypto';

/**
 * Returns the SHA-256 hash of a value
 * @param val
 */
export default function hash(val: string) {
  const newHash = createHash('sha256');
  newHash.update(val);
  return newHash.digest('hex');
}
