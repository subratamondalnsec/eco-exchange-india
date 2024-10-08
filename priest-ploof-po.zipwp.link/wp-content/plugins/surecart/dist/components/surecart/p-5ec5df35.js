import { s as i } from "./p-24f06282.js";
import { a as o } from "./p-18e45a13.js";
import { a as d } from "./p-1c2e2695.js";
import { g as t } from "./p-4d73f82a.js";
const a = "surecart/v1/checkouts/",
  n = [
    "line_items",
    "line_item.price",
    "line_item.fees",
    "line_item.variant",
    "variant.image",
    "price.product",
    "product.featured_product_media",
    "product.product_collections",
    "product_media.media",
    "customer",
    "customer.shipping_address",
    "payment_intent",
    "discount",
    "discount.promotion",
    "recommended_bumps",
    "bump.price",
    "current_upsell",
    "product.variants",
    "discount.coupon",
    "shipping_address",
    "billing_address",
    "tax_identifier",
    "manual_payment_method",
    "shipping_choices",
    "shipping_choice.shipping_method",
  ],
  e = (d = {}) => {
    var a, o, e, t, n, l, u;
    return {
      live_mode: "test" !== i.mode,
      group_key: i.groupId,
      abandoned_checkout_enabled: i.abandonedCheckoutEnabled,
      billing_matches_shipping:
        null === (a = i.checkout) || void 0 === a
          ? void 0
          : a.billing_matches_shipping,
      metadata: {
        ...((null == d ? void 0 : d.metadata) || {}),
        ...((null ===
          (o = null === window || void 0 === window ? void 0 : window.scData) ||
        void 0 === o
          ? void 0
          : o.page_id) && {
          page_id:
            null ===
              (e =
                null === window || void 0 === window
                  ? void 0
                  : window.scData) || void 0 === e
              ? void 0
              : e.page_id,
        }),
        ...((null === (t = null == i ? void 0 : i.product) || void 0 === t
          ? void 0
          : t.id) && {
          buy_page_product_id:
            null === (n = null == i ? void 0 : i.product) || void 0 === n
              ? void 0
              : n.id,
        }),
        page_url: window.location.href,
      },
      ...((null === (l = null == i ? void 0 : i.checkout) || void 0 === l
        ? void 0
        : l.email) && {
        email:
          null === (u = null == i ? void 0 : i.checkout) || void 0 === u
            ? void 0
            : u.email,
      }),
      ...d,
    };
  },
  l = (d = {}) => {
    var a, o;
    return {
      ...(!!(null == i ? void 0 : i.formId) && {
        form_id: null == i ? void 0 : i.formId,
      }),
      ...(!!(null === (a = null == i ? void 0 : i.product) || void 0 === a
        ? void 0
        : a.id) && {
        product_id:
          null === (o = null == i ? void 0 : i.product) || void 0 === o
            ? void 0
            : o.id,
      }),
      ...d,
    };
  },
  u = () => {
    var d, a;
    return (
      t(window.location.href, "checkout_id") ||
      ((
        null === (d = null == i ? void 0 : i.checkout) || void 0 === d
          ? void 0
          : d.id
      )
        ? null === (a = null == i ? void 0 : i.checkout) || void 0 === a
          ? void 0
          : a.id
        : null)
    );
  },
  r = (i, o = "") => {
    let e = i ? `${a}${i}` : a;
    return (e = `${e}${o}`), d(e, { expand: n });
  },
  v = async ({ id: i, query: a = {} }) => await o({ path: d(r(i), l(a)) }),
  s = async ({ id: i = null, data: a = {}, query: t = {} }) => (
    (i = i || u()),
    await o({ method: i ? "PATCH" : "POST", path: d(r(i), l(t)), data: e(a) })
  ),
  c = async ({ data: i = {}, query: a = {} }) =>
    await o({ method: "POST", path: d(r(null), l(a)), data: e(i) }),
  p = async ({ id: i, data: a = {}, query: t = {} }) =>
    await o({ method: "PATCH", path: d(r(i), l(t)), data: e(a) }),
  m = async ({ id: i, data: a = {}, query: t = {}, processor: n }) =>
    await o({
      method: "POST",
      path: d(
        r(i, "/finalize"),
        l({
          ...((null == n ? void 0 : n.manual)
            ? {
                manual_payment: !0,
                manual_payment_method_id: null == n ? void 0 : n.id,
              }
            : { processor_type: null == n ? void 0 : n.id }),
          ...t,
        })
      ),
      data: e(a),
    }),
  _ = async ({ checkout: i, data: a, live_mode: e = !1 }) => {
    var t;
    const l = (
      (null === (t = null == i ? void 0 : i.line_items) || void 0 === t
        ? void 0
        : t.data) || []
    ).find((i) => {
      var d;
      return (
        null === (d = null == i ? void 0 : i.variant) || void 0 === d
          ? void 0
          : d.id
      )
        ? i.variant.id === a.variant && i.price.id === a.price
        : i.price.id === a.price;
    });
    if (!(null == i ? void 0 : i.id))
      return await o({
        method: "POST",
        path: d(r(null)),
        data: { line_items: [a], live_mode: e },
      });
    if (l)
      return await w({
        id: null == l ? void 0 : l.id,
        data: {
          ...a,
          quantity:
            (null == l ? void 0 : l.quantity) +
            (null == a ? void 0 : a.quantity),
        },
      });
    const u = await o({
      path: d(
        `surecart/v1/line_items/${
          (null == l ? void 0 : l.id) ? (null == l ? void 0 : l.id) : ""
        }`,
        {
          consolidate: !0,
          expand: [
            ...(n || []).map((i) => (i.includes(".") ? i : `checkout.${i}`)),
            "checkout",
          ],
        }
      ),
      method: "POST",
      data: { ...a, checkout: i.id },
    });
    return null == u ? void 0 : u.checkout;
  },
  h = async ({ checkoutId: i, itemId: d }) => {
    const { deleted: a } = await o({
      path: `surecart/v1/line_items/${d}`,
      method: "DELETE",
    });
    if (!a)
      throw {
        code: "error",
        message: wp.i18n.__("Failed to delete", "surecart"),
      };
    return await v({ id: i });
  },
  w = async ({ id: i, data: a }) => {
    const e = await o({
      path: d(`surecart/v1/line_items/${i}`, {
        expand: [
          ...(n || []).map((i) => (i.includes(".") ? i : `checkout.${i}`)),
          "checkout",
        ],
      }),
      method: "PATCH",
      data: a,
    });
    return null == e ? void 0 : e.checkout;
  };
export {
  _ as a,
  a as b,
  s as c,
  p as d,
  n as e,
  m as f,
  v as g,
  c as h,
  h as r,
  w as u,
};
