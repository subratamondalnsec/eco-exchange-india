const o = (l = "", i, o = "fit=scale-down,format=auto") => {
    var d, t;
    return l.includes("surecart.com") &&
      (null === (d = window.scData) || void 0 === d ? void 0 : d.cdn_root)
      ? `${
          null === (t = window.scData) || void 0 === t ? void 0 : t.cdn_root
        }/${o},width=${i}/${l}`
      : l;
  },
  i = (l, i) => {
    var o, d, t;
    const u = null == l ? void 0 : l.featured_product_media,
      a = null == i ? void 0 : i.image,
      n = {
        alt:
          (null === (o = null == u ? void 0 : u.media) || void 0 === o
            ? void 0
            : o.alt) || (null == l ? void 0 : l.name),
        url:
          (null === (d = null == u ? void 0 : u.media) || void 0 === d
            ? void 0
            : d.url) || (null == l ? void 0 : l.image_url),
        title:
          (null === (t = null == u ? void 0 : u.media) || void 0 === t
            ? void 0
            : t.title) || "",
      };
    return (
      (null == a ? void 0 : a.url) &&
        ((n.url = a.url),
        (n.alt = n.alt || a.alt),
        (n.title = n.title || a.title)),
      n
    );
  };
export { i as g, o as s };
