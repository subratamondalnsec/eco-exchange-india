import { r as o, c as i, h as r } from "./p-cc7ce8c7.js";
import { s as t } from "./p-24f06282.js";
import { i as s } from "./p-d556eec7.js";
import { f as n } from "./p-a27e9b70.js";
import "./p-25433d0f.js";
import "./p-f70181c4.js";
import "./p-4d73f82a.js";
import "./p-1c2e2695.js";
import "./p-830ab1a3.js";
import "./p-a3a138d6.js";
import "./p-7ef0f71c.js";
import "./p-50da3ba3.js";
import "./p-c27fae79.js";
const e =
  ":host{display:block}.coupon-form{position:relative}.form{opacity:0;visibility:hidden;height:0;transition:opacity var(--sc-transition-fast) ease-in-out}.coupon-form--is-open .form{opacity:1;visibility:visible;height:auto;margin-top:var(--sc-spacing-small);display:grid;gap:var(--sc-spacing-small)}.coupon-form--is-open .trigger{color:var(--sc-input-label-color)}.coupon-form--is-open .trigger:hover{text-decoration:none}.trigger{cursor:pointer;font-size:var(--sc-font-size-small);color:var(--sc-color-gray-500);user-select:none}.trigger:hover{text-decoration:underline}.order-coupon-form--is-rtl .trigger,.order-coupon-form--is-rtl .trigger:hover{text-align:right}";
const d = class {
  constructor(r) {
    o(this, r);
    this.scApplyCoupon = i(this, "scApplyCoupon", 7);
    this.label = undefined;
    this.loading = undefined;
    this.collapsed = undefined;
    this.placeholder = undefined;
    this.buttonText = undefined;
    this.open = undefined;
    this.value = undefined;
  }
  render() {
    var o, i, e, d, l, p, c, a, u;
    const v =
      (e =
        (i =
          (o = t === null || t === void 0 ? void 0 : t.checkout) === null ||
          o === void 0
            ? void 0
            : o.line_items) === null || i === void 0
          ? void 0
          : i.data) === null || e === void 0
        ? void 0
        : e.some((o) => {
            var i;
            return (i = o === null || o === void 0 ? void 0 : o.price) ===
              null || i === void 0
              ? void 0
              : i.recurring_interval;
          });
    return r("sc-coupon-form", {
      label: this.label || wp.i18n.__("Add Coupon Code", "surecart"),
      collapsed: this.collapsed,
      placeholder: this.placeholder,
      loading:
        n() &&
        !((p =
          (l =
            (d = t.checkout) === null || d === void 0
              ? void 0
              : d.line_items) === null || l === void 0
            ? void 0
            : l.data) === null || p === void 0
          ? void 0
          : p.length),
      busy: n(),
      discount: (c = t.checkout) === null || c === void 0 ? void 0 : c.discount,
      currency: (a = t.checkout) === null || a === void 0 ? void 0 : a.currency,
      "discount-amount":
        (u = t.checkout) === null || u === void 0 ? void 0 : u.discount_amount,
      class: { "order-coupon-form--is-rtl": s() },
      "button-text": this.buttonText || wp.i18n.__("Apply", "surecart"),
      "show-interval": v,
    });
  }
};
d.style = e;
export { d as sc_order_coupon_form };
//# sourceMappingURL=p-25eac736.entry.js.map
