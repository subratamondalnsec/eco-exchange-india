import { r as i, h as t, H as s } from "./p-cc7ce8c7.js";
import { f as a } from "./p-a27e9b70.js";
import "./p-c27fae79.js";
import "./p-25433d0f.js";
import "./p-f70181c4.js";
const r =
  "sc-cart-submit{position:relative;width:100%}sc-cart-submit a.wp-block-button__link{position:relative;text-decoration:none;width:100%;display:block;box-sizing:border-box;text-align:center}sc-cart-submit sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-cart-submit [data-text],sc-cart-submit [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-cart-submit [data-loader]{opacity:0;visibility:hidden}sc-cart-submit.is-disabled{pointer-events:none}sc-cart-submit.is-busy [data-text]{opacity:0;visibility:hidden}sc-cart-submit.is-busy [data-loader]{opacity:1;visibility:visible}";
const e = class {
  constructor(t) {
    i(this, t);
    this.busy = undefined;
  }
  render() {
    return t(
      s,
      {
        class: { "is-busy": a() || this.busy, "is-disabled": a() || this.busy },
        onClick: () => {
          this.busy = true;
          return true;
        },
      },
      t("slot", null)
    );
  }
};
e.style = r;
export { e as sc_cart_submit };
//# sourceMappingURL=p-21cb3030.entry.js.map
