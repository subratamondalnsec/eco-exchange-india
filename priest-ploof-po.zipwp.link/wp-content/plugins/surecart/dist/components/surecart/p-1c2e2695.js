function t(t) {
  let e;
  try {
    e = new URL(t, "http://example.com").search.substring(1);
  } catch (t) {}
  if (e) return e;
}
function e(t) {
  let e = "";
  const n = Object.entries(t);
  let r;
  for (; (r = n.shift()); ) {
    let [t, o] = r;
    if (Array.isArray(o) || (o && o.constructor === Object)) {
      const e = Object.entries(o).reverse();
      for (const [r, o] of e) n.unshift([`${t}[${r}]`, o]);
    } else
      void 0 !== o &&
        (null === o && (o = ""),
        (e += "&" + [t, o].map(encodeURIComponent).join("=")));
  }
  return e.substr(1);
}
function n(t, e, n) {
  const r = e.length,
    o = r - 1;
  for (let s = 0; s < r; s++) {
    let r = e[s];
    !r && Array.isArray(t) && (r = t.length.toString());
    const c = !isNaN(Number(e[s + 1]));
    (t[r] = s === o ? n : t[r] || (c ? [] : {})),
      Array.isArray(t[r]) && !c && (t[r] = { ...t[r] }),
      (t = t[r]);
  }
}
function o(e) {
  return (t(e) || "")
    .replace(/\+/g, "%20")
    .split("&")
    .reduce((t, e) => {
      const [r, o = ""] = e.split("=").filter(Boolean).map(decodeURIComponent);
      return r && n(t, r.replace(/\]/g, "").split("["), o), t;
    }, {});
}
function c() {
  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
    n = arguments.length > 1 ? arguments[1] : void 0;
  if (!n || !Object.keys(n).length) return t;
  let r = t;
  const s = t.indexOf("?");
  return (
    -1 !== s && ((n = Object.assign(o(t), n)), (r = r.substr(0, s))),
    r + "?" + e(n)
  );
}
export { c as a, e as b, o as g };
