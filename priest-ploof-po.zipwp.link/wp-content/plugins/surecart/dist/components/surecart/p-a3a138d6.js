const w = (w, o) => {
  ((null === window || void 0 === window ? void 0 : window.dataLayer) ||
    (null === window || void 0 === window ? void 0 : window.gtag)) &&
    o &&
    ((null === window || void 0 === window ? void 0 : window.gtag)
      ? window.gtag("event", w, o)
      : (window.dataLayer.push({ ecommerce: null }),
        window.dataLayer.push({ event: w, ecommerce: o })));
};
export { w as t };
