export default class Data {
  static objectToMap(v) {
    return Object.keys(v).reduce((acc, k) => {
      acc.set(k, v[k]);
      return acc;
    }, new Map());
  }
}
