import { s, o as t, v as o, c as a } from "./p-c27fae79.js";
import { s as e } from "./p-830ab1a3.js";
const r = o(a);
r.subscribe((t) => (s.formState = t)),
  r.start(),
  t("formState", () => {
    const { formState: t } = s,
      { value: a } = t;
    void 0 !== s.text.loading[a] && e(s.text.loading[a], "assertive");
  });
const { send: n } = r,
  c = (s) => n(s);
export { c as u };
