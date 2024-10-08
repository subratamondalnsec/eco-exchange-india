import { a as n } from "./p-1c2e2695.js";
function e(e) {
  const t = (e, n) => {
    const { headers: o = {} } = e;
    for (const r in o)
      if ("x-wp-nonce" === r.toLowerCase() && o[r] === t.nonce) return n(e);
    return n({ ...e, headers: { ...o, "X-WP-Nonce": t.nonce } });
  };
  return (t.nonce = e), t;
}
const t = (e, t) => {
    let n,
      o,
      r = e.path;
    return (
      "string" == typeof e.namespace &&
        "string" == typeof e.endpoint &&
        ((n = e.namespace.replace(/^\/|\/$/g, "")),
        (o = e.endpoint.replace(/^\//, "")),
        (r = o ? n + "/" + o : n)),
      delete e.namespace,
      delete e.endpoint,
      t({ ...e, path: r })
    );
  },
  o = (e) => (n, o) =>
    t(n, (t) => {
      let n,
        r = t.url,
        i = t.path;
      return (
        "string" == typeof i &&
          ((n = e),
          -1 !== e.indexOf("?") && (i = i.replace("?", "&")),
          (i = i.replace(/^\//, "")),
          "string" == typeof n &&
            -1 !== n.indexOf("?") &&
            (i = i.replace("?", "&")),
          (r = n + i)),
        o({ ...t, url: r })
      );
    });
function r(e) {
  let t;
  try {
    t = new URL(e, "http://example.com").search.substring(1);
  } catch (e) {}
  if (t) return t;
}
function i(e) {
  let t = "";
  const n = Object.entries(e);
  let o;
  for (; (o = n.shift()); ) {
    let [e, r] = o;
    if (Array.isArray(r) || (r && r.constructor === Object)) {
      const t = Object.entries(r).reverse();
      for (const [o, r] of t) n.unshift([`${e}[${o}]`, r]);
    } else
      void 0 !== r &&
        (null === r && (r = ""),
        (t += "&" + [e, r].map(encodeURIComponent).join("=")));
  }
  return t.substr(1);
}
function s(e, t, n) {
  const o = t.length,
    r = o - 1;
  for (let i = 0; i < o; i++) {
    let o = t[i];
    !o && Array.isArray(e) && (o = e.length.toString()),
      (o = ["__proto__", "constructor", "prototype"].includes(o)
        ? o.toUpperCase()
        : o);
    const a = !isNaN(Number(t[i + 1]));
    (e[o] = i === r ? n : e[o] || (a ? [] : {})),
      Array.isArray(e[o]) && !a && (e[o] = { ...e[o] }),
      (e = e[o]);
  }
}
function c(e) {
  return (r(e) || "")
    .replace(/\+/g, "%20")
    .split("&")
    .reduce((e, t) => {
      const [n, o = ""] = t.split("=").filter(Boolean).map(decodeURIComponent);
      return n && s(e, n.replace(/\]/g, "").split("["), o), e;
    }, Object.create(null));
}
function u() {
  let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
    t = arguments.length > 1 ? arguments[1] : void 0;
  if (!t || !Object.keys(t).length) return e;
  let n = e;
  const o = e.indexOf("?");
  return (
    -1 !== o && ((t = Object.assign(c(e), t)), (n = n.substr(0, o))),
    n + "?" + i(t)
  );
}
function d(e, t) {
  return c(e)[t];
}
function l(e, t) {
  return void 0 !== d(e, t);
}
function a(e) {
  const t = e.split("?"),
    n = t[1],
    o = t[0];
  return n
    ? o +
        "?" +
        n
          .split("&")
          .map((e) => e.split("="))
          .map((e) => e.map(decodeURIComponent))
          .sort((e, t) => e[0].localeCompare(t[0]))
          .map((e) => e.map(encodeURIComponent))
          .map((e) => e.join("="))
          .join("&")
    : o;
}
function f(e) {
  const t = Object.fromEntries(
    Object.entries(e).map((e) => {
      let [t, n] = e;
      return [a(t), n];
    })
  );
  return (e, n) => {
    const { parse: o = !0 } = e;
    let r = e.path;
    if (!r && e.url) {
      const { rest_route: t, ...n } = c(e.url);
      "string" == typeof t && (r = u(t, n));
    }
    if ("string" != typeof r) return n(e);
    const i = e.method || "GET",
      s = a(r);
    if ("GET" === i && t[s]) {
      const e = t[s];
      return delete t[s], w(e, !!o);
    }
    if ("OPTIONS" === i && t[i] && t[i][s]) {
      const e = t[i][s];
      return delete t[i][s], w(e, !!o);
    }
    return n(e);
  };
}
function w(e, t) {
  return Promise.resolve(
    t
      ? e.body
      : new window.Response(JSON.stringify(e.body), {
          status: 200,
          statusText: "OK",
          headers: e.headers,
        })
  );
}
const p = (e, t) => {
    let { path: n, url: o, ...r } = e;
    return { ...r, url: o && u(o, t), path: n && u(n, t) };
  },
  v = (e) => (e.json ? e.json() : Promise.reject(e)),
  h = (e) => {
    if (!e) return {};
    const t = e.match(/<([^>]+)>; rel="next"/);
    return t ? { next: t[1] } : {};
  },
  m = (e) => {
    const { next: t } = h(e.headers.get("link"));
    return t;
  },
  g = (e) => {
    const t = !!e.path && -1 !== e.path.indexOf("per_page=-1"),
      n = !!e.url && -1 !== e.url.indexOf("per_page=-1");
    return t || n;
  },
  _ = async (e, t) => {
    if (!1 === e.parse) return t(e);
    if (!g(e)) return t(e);
    const n = await D({ ...p(e, { per_page: 100 }), parse: !1 }),
      o = await v(n);
    if (!Array.isArray(o)) return o;
    let r = m(n);
    if (!r) return o;
    let i = [].concat(o);
    for (; r; ) {
      const t = await D({ ...e, path: void 0, url: r, parse: !1 }),
        n = await v(t);
      (i = i.concat(n)), (r = m(t));
    }
    return i;
  },
  y = new Set(["PATCH", "PUT", "DELETE"]),
  O = "GET",
  P = (e, t) => {
    const { method: n = O } = e;
    return (
      y.has(n.toUpperCase()) &&
        (e = {
          ...e,
          headers: {
            ...e.headers,
            "X-HTTP-Method-Override": n,
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      t(e)
    );
  },
  T = (e, t) => (
    "string" != typeof e.url ||
      l(e.url, "_locale") ||
      (e.url = u(e.url, { _locale: "user" })),
    "string" != typeof e.path ||
      l(e.path, "_locale") ||
      (e.path = u(e.path, { _locale: "user" })),
    t(e)
  ),
  b = function (e) {
    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return t
      ? 204 === e.status
        ? null
        : e.json
        ? e.json()
        : Promise.reject(e)
      : e;
  },
  j = (e) => {
    const t = {
      code: "invalid_json",
      message: wp.i18n.__("The response is not a valid JSON response."),
    };
    if (!e || !e.json) throw t;
    return e.json().catch(() => {
      throw t;
    });
  },
  E = function (e) {
    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return Promise.resolve(b(e, t)).catch((e) => N(e, t));
  };
function N(e) {
  let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (!t) throw e;
  return j(e).then((e) => {
    const t = {
      code: "unknown_error",
      message: wp.i18n.__("An unknown error occurred."),
    };
    throw e || t;
  });
}
function S(e) {
  const t = !!e.method && "POST" === e.method;
  return (
    ((!!e.path && -1 !== e.path.indexOf("/wp/v2/media")) ||
      (!!e.url && -1 !== e.url.indexOf("/wp/v2/media"))) &&
    t
  );
}
const x = (e, t) => {
    if (!S(e)) return t(e);
    let n = 0;
    const o = (e) => (
      n++,
      t({
        path: `/wp/v2/media/${e}/post-process`,
        method: "POST",
        data: { action: "create-image-subsizes" },
        parse: !1,
      }).catch(() =>
        n < 5
          ? o(e)
          : (t({ path: `/wp/v2/media/${e}?force=true`, method: "DELETE" }),
            Promise.reject())
      )
    );
    return t({ ...e, parse: !1 })
      .catch((t) => {
        const n = t.headers.get("x-wp-upload-attachment-id");
        return t.status >= 500 && t.status < 600 && n
          ? o(n).catch(() =>
              !1 !== e.parse
                ? Promise.reject({
                    code: "post_process",
                    message: wp.i18n.__(
                      "Media upload failed. If this is a photo or a large image, please scale it down and try again."
                    ),
                  })
                : Promise.reject(t)
            )
          : N(t, e.parse);
      })
      .then((t) => E(t, e.parse));
  },
  A = { Accept: "application/json, */*;q=0.1" },
  C = { credentials: "include" },
  I = [T, t, P, _];
function U(e) {
  I.unshift(e);
}
const k = (e) => {
    if (e.status >= 200 && e.status < 300) return e;
    throw e;
  },
  R = (e) => {
    const { url: t, path: n, data: o, parse: r = !0, ...i } = e;
    let { body: a, headers: s } = e;
    return (
      (s = { ...A, ...s }),
      o && ((a = JSON.stringify(o)), (s["Content-Type"] = "application/json")),
      window
        .fetch(t || n || window.location.href, {
          ...C,
          ...i,
          body: a,
          headers: s,
        })
        .then(
          (e) =>
            Promise.resolve(e)
              .then(k)
              .catch((e) => N(e, r))
              .then((e) => E(e, r)),
          (e) => {
            if (e && "AbortError" === e.name) throw e;
            throw {
              code: "fetch_error",
              message: wp.i18n.__("You are probably offline."),
            };
          }
        )
    );
  };
let $ = R;
function J(e) {
  $ = e;
}
function D(e) {
  const t = I.reduceRight((e, t) => (n) => t(n, e), $);
  return t(e).catch((t) =>
    "rest_cookie_invalid_nonce" !== t.code
      ? Promise.reject(t)
      : window
          .fetch(D.nonceEndpoint)
          .then(k)
          .then((e) => e.text())
          .then((t) => ((D.nonceMiddleware.nonce = t), D(e)))
  );
}
var G, L, H, M, X, q, z;
(D.use = U),
  (D.setFetchHandler = J),
  (D.createNonceMiddleware = e),
  (D.createPreloadingMiddleware = f),
  (D.createRootURLMiddleware = o),
  (D.fetchAllMiddleware = _),
  (D.mediaUploadMiddleware = x),
  (D.fetchAllMiddleware = null),
  D.use(
    D.createRootURLMiddleware(
      (null ===
        (L =
          null ===
            (G =
              null === window || void 0 === window ? void 0 : window.parent) ||
          void 0 === G
            ? void 0
            : G.scData) || void 0 === L
        ? void 0
        : L.root_url) ||
        (null ===
          (H = null === window || void 0 === window ? void 0 : window.scData) ||
        void 0 === H
          ? void 0
          : H.root_url)
    )
  ),
  (null ===
    (M = null === window || void 0 === window ? void 0 : window.scData) ||
  void 0 === M
    ? void 0
    : M.nonce) &&
    ((D.nonceMiddleware = D.createNonceMiddleware(
      null ===
        (X = null === window || void 0 === window ? void 0 : window.scData) ||
        void 0 === X
        ? void 0
        : X.nonce
    )),
    D.use(D.nonceMiddleware)),
  (null ===
    (q = null === window || void 0 === window ? void 0 : window.scData) ||
  void 0 === q
    ? void 0
    : q.nonce_endpoint) &&
    (D.nonceEndpoint =
      null ===
        (z = null === window || void 0 === window ? void 0 : window.scData) ||
      void 0 === z
        ? void 0
        : z.nonce_endpoint),
  D.use((e, t) => ((e.path = n(e.path, { t: Date.now() })), t(e)));
const B = (e) => {
    const t = {
      code: "invalid_json",
      message: wp.i18n.__(
        "The response is not a valid JSON response.",
        "surecart"
      ),
    };
    if ((null == e ? void 0 : e.code) && (null == e ? void 0 : e.message))
      throw e;
    if (!e || !e.json) throw t;
    return e.json().catch(() => {
      throw t;
    });
  },
  K = async (e) => {
    const t = await B(e);
    if ("rest_cookie_invalid_nonce" !== t.code) throw t;
    return window
      .fetch(D.nonceEndpoint)
      .then((e) => {
        if (e.status >= 200 && e.status < 300) return e;
        throw e;
      })
      .then((e) => e.text())
      .then((e) => {
        D.nonceMiddleware.nonce = e;
      });
  };
export { D as a, K as h };
