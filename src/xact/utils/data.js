export default class Data {
  static toMap(v, f) {
    const ret = new Map();

    if (v) {
      return Object.keys(v).reduce((acc, k) => {
        if (f) {
          acc.set(k, f(v[k]));
        } else {
          acc.set(k, v[k]);
        }
        return acc;
      }, ret);
    } else {
      return ret;
    }
  }
  static forEach(v = {}, f) {
    return Object.keys(v).forEach((k) => {
      const vv = v[k];

      if (f) {
        f(vv, k);
      }
    });
  }
  static map(v = {}, f) {
    return Object.keys(v).map((k) => {
      const vv = v[k];

      if (f) {
        return f(vv, k);
      } else {
        return vv;
      }
    });
  }
  static reduce(v = {}, f, defaultValue = {}) {
    return Object.keys(v).reduce((acc, k) => {
      const vv = v[k];

      if (f) {
        acc[k] = f(vv, k);
      } else {
        acc[k] = vv;
      }

      return acc;
    }, defaultValue);
  }
}
