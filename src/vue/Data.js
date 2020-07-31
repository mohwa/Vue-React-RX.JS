export default class Data {
  static objectToMap(v) {
    return Object.keys(v).reduce((acc, k) => {
      acc.set(k, v[k]);
      return acc;
    }, new Map());
  }
  static forEach(v = {}, f = () => {}) {
    Object.keys(v).forEach(f);
  }
  static map(v = {}, f = () => {}) {
    return Object.keys(v).map(f);
  }
}
