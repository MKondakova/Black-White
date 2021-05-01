/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
import { __DEV__ } from '../constants/env';

const emptyFn = () => {};
export default {
  info: __DEV__
    ? function() {
        console.info(...arguments);
      }
    : emptyFn,
  debug: __DEV__
    ? function() {
        console.debug(...arguments);
      }
    : emptyFn,
  error: __DEV__
    ? function() {
        console.error(...arguments);
      }
    : emptyFn,
  warn: __DEV__
    ? function() {
        console.warn(...arguments);
      }
    : emptyFn,
};