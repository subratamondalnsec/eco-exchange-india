const x = [
    "bif",
    "byr",
    "clp",
    "djf",
    "gnf",
    "isk",
    "jpy",
    "kmf",
    "krw",
    "pyg",
    "rwf",
    "ugx",
    "vnd",
    "vuv",
    "xaf",
    "xag",
    "xau",
    "xba",
    "xbb",
    "xbc",
    "xbd",
    "xdr",
    "xof",
    "xpd",
    "xpf",
    "xpt",
    "xts",
  ],
  d = (x, d) => (o(d) ? x : x / 100),
  o = (d) => {
    var o;
    return x.includes(
      null === (o = null == d ? void 0 : d.toLowerCase) || void 0 === o
        ? void 0
        : o.call(d)
    );
  };
export { o as i, d as m, x as z };
