import { g as t, f as e } from "./p-cc7ce8c7.js";
const n = (e, t, s) => {
    const r = e.get(t);
    r ? r.includes(s) || r.push(s) : e.set(t, [s]);
  },
  s = (e, t) => {
    let s;
    return (...r) => {
      s && clearTimeout(s),
        (s = setTimeout(() => {
          (s = 0), e(...r);
        }, t));
    };
  },
  o = (e) => !("isConnected" in e) || e.isConnected,
  r = s((e) => {
    for (let t of e.keys()) e.set(t, e.get(t).filter(o));
  }, 2e3),
  c = () => {
    if ("function" != typeof t) return {};
    const s = new Map();
    return {
      dispose: () => s.clear(),
      get: (e) => {
        const r = t();
        r && n(s, e, r);
      },
      set: (t) => {
        const n = s.get(t);
        n && s.set(t, n.filter(e)), r(s);
      },
      reset: () => {
        s.forEach((t) => t.forEach(e)), r(s);
      },
    };
  },
  i = (e) => ("function" == typeof e ? e() : e),
  u = (e, t = (e, t) => e !== t) => {
    const s = i(e);
    let r = new Map(Object.entries(null != s ? s : {}));
    const n = { dispose: [], get: [], set: [], reset: [] },
      o = () => {
        var t;
        (r = new Map(
          Object.entries(null !== (t = i(e)) && void 0 !== t ? t : {})
        )),
          n.reset.forEach((e) => e());
      },
      c = (e) => (n.get.forEach((t) => t(e)), r.get(e)),
      u = (e, s) => {
        const o = r.get(e);
        t(s, o, e) && (r.set(e, s), n.set.forEach((t) => t(e, s, o)));
      },
      p =
        "undefined" == typeof Proxy
          ? {}
          : new Proxy(s, {
              get(e, t) {
                return c(t);
              },
              ownKeys(e) {
                return Array.from(r.keys());
              },
              getOwnPropertyDescriptor() {
                return { enumerable: !0, configurable: !0 };
              },
              has(e, t) {
                return r.has(t);
              },
              set(e, t, s) {
                return u(t, s), !0;
              },
            }),
      a = (e, t) => (
        n[e].push(t),
        () => {
          f(n[e], t);
        }
      );
    return {
      state: p,
      get: c,
      set: u,
      on: a,
      onChange: (t, s) => {
        const r = a("set", (e, r) => {
            e === t && s(r);
          }),
          n = a("reset", () => s(i(e)[t]));
        return () => {
          r(), n();
        };
      },
      use: (...e) => {
        const t = e.reduce(
          (e, t) => (
            t.set && e.push(a("set", t.set)),
            t.get && e.push(a("get", t.get)),
            t.reset && e.push(a("reset", t.reset)),
            t.dispose && e.push(a("dispose", t.dispose)),
            e
          ),
          []
        );
        return () => t.forEach((e) => e());
      },
      dispose: () => {
        n.dispose.forEach((e) => e()), o();
      },
      reset: o,
      forceUpdate: (e) => {
        const t = r.get(e);
        n.set.forEach((s) => s(e, t, t));
      },
    };
  },
  f = (e, t) => {
    const s = e.indexOf(t);
    s >= 0 && ((e[s] = e[e.length - 1]), e.length--);
  },
  p = (e, t) => {
    const s = u(e, t);
    return s.use(c()), s;
  };
export { p as c };
