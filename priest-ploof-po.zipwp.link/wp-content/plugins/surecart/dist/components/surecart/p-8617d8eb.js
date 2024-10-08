class i {
  constructor(t, i) {
    (this.form = null),
      (this.input = t),
      (this.options = {
        form: (t) => {
          var i, e;
          return (
            (null ===
              (e =
                null === (i = this.closestElement("sc-form", t)) || void 0 === i
                  ? void 0
                  : i.shadowRoot) || void 0 === e
              ? void 0
              : e.querySelector("form")) || this.closestElement("form", t)
          );
        },
        name: (t) => t.name,
        value: (t) => t.value,
        disabled: (t) => t.disabled,
        ...i,
      }),
      (this.form = this.options.form(this.input)),
      (this.handleFormData = this.handleFormData.bind(this));
  }
  closestElement(t, i) {
    return i
      ? (i && i != document && i != window && i.closest(t)) ||
          this.closestElement(t, i.getRootNode().host)
      : null;
  }
  addFormData() {
    this.form && this.form.addEventListener("formdata", this.handleFormData);
  }
  removeFormData() {
    this.form && this.form.removeEventListener("formdata", this.handleFormData);
  }
  handleFormData(t) {
    const i = this.options.name(this.input),
      e = this.options.value(this.input);
    "string" == typeof i &&
      void 0 !== e &&
      (Array.isArray(e)
        ? e.forEach((e) => {
            e && t.formData.append(i, e.toString());
          })
        : e && t.formData.append(i, e.toString()));
  }
}
const t = (t) => {
    var i;
    const {
        email: e,
        name: n,
        first_name: o,
        last_name: s,
        phone: a,
        password: r,
        shipping_city: l,
        shipping_country: d,
        shipping_line_1: m,
        shipping_line_2: h,
        shipping_postal_code: p,
        shipping_state: c,
        billing_city: _,
        billing_country: u,
        billing_line_1: f,
        billing_line_2: y,
        billing_postal_code: g,
        billing_state: b,
        "tax_identifier.number_type": v,
        "tax_identifier.number": D,
        ...F
      } = t,
      w = {
        ...(l ? { city: l } : {}),
        ...(d ? { country: d } : {}),
        ...(m ? { line_1: m } : {}),
        ...(h ? { line_2: h } : {}),
        ...(p ? { postal_code: p } : {}),
        ...(c ? { state: c } : {}),
      },
      E = {
        ...(_ ? { city: _ } : {}),
        ...(u ? { country: u } : {}),
        ...(f ? { line_1: f } : {}),
        ...(y ? { line_2: y } : {}),
        ...(g ? { postal_code: g } : {}),
        ...(b ? { state: b } : {}),
      };
    return {
      ...(n ? { name: n } : {}),
      ...(e ? { email: e } : {}),
      ...(o ? { first_name: o } : {}),
      ...(s ? { last_name: s } : {}),
      ...(a ? { phone: a } : {}),
      ...(r ? { password: r } : {}),
      ...(Object.keys(w || {}).length ? { shipping_address: w } : {}),
      ...(Object.keys(E || {}).length ? { billing_address: E } : {}),
      ...(v && D ? { tax_identifier: { number: D, number_type: v } } : {}),
      ...((null === (i = Object.keys(F)) || void 0 === i ? void 0 : i.length)
        ? { metadata: F }
        : {}),
    };
  },
  n = async (t) => {
    const i = [...t.shadowRoot.querySelectorAll("*")].filter(
      (t) => "function" == typeof t.reportValidity
    );
    for (const t of i) if (!(await t.reportValidity())) return !1;
    return !0;
  };
export { i as F, t as p, n as r };
