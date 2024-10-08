function t(t) {
  "undefined" != typeof document &&
    ("complete" !== document.readyState && "interactive" !== document.readyState
      ? document.addEventListener("DOMContentLoaded", t)
      : t());
}
function e() {
  const t = document.createElement("p");
  (t.id = "a11y-speak-intro-text"),
    (t.className = "a11y-speak-intro-text"),
    (t.textContent = wp.i18n.__("Notifications")),
    t.setAttribute(
      "style",
      "position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"
    ),
    t.setAttribute("hidden", "hidden");
  const { body: e } = document;
  return e && e.appendChild(t), t;
}
function n(t = "polite") {
  const e = document.createElement("div");
  (e.id = `a11y-speak-${t}`),
    (e.className = "a11y-speak-region"),
    e.setAttribute(
      "style",
      "position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"
    ),
    e.setAttribute("aria-live", t),
    e.setAttribute("aria-relevant", "additions text"),
    e.setAttribute("aria-atomic", "true");
  const { body: n } = document;
  return n && n.appendChild(e), e;
}
function i() {
  const t = document.getElementsByClassName("a11y-speak-region"),
    e = document.getElementById("a11y-speak-intro-text");
  for (let e = 0; e < t.length; e++) t[e].textContent = "";
  e && e.setAttribute("hidden", "hidden");
}
let o = "";
function a(t) {
  return (t = t.replace(/<[^<>]+>/g, " ")), o === t && (t += " "), (o = t), t;
}
function p() {
  const t = document.getElementById("a11y-speak-intro-text"),
    i = document.getElementById("a11y-speak-assertive"),
    o = document.getElementById("a11y-speak-polite");
  null === t && e(), null === i && n("assertive"), null === o && n("polite");
}
function d(t, e) {
  i(), (t = a(t));
  const n = document.getElementById("a11y-speak-intro-text"),
    o = document.getElementById("a11y-speak-assertive"),
    d = document.getElementById("a11y-speak-polite");
  o && "assertive" === e ? (o.textContent = t) : d && (d.textContent = t),
    n && n.removeAttribute("hidden");
}
t(p);
export { d as s };
