export default class Data {
  static objectToMap(v) {
    const ret = new Map();

    if (v) {
      return Object.keys(v).reduce((acc, k) => {
        acc.set(k, v[k]);
        return acc;
      }, ret);
    } else {
      return ret;
    }
  }
  static forEach(v = {}, f = () => {}) {
    Object.keys(v).forEach(f);
  }
  static map(v = {}, f = () => {}) {
    return Object.keys(v).map(f);
  }
}
