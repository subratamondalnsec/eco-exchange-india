import { s as i } from "./p-c27fae79.js";
const n = () => i.formState.value,
  a = () => "loading" === i.formState.value,
  s = () =>
    ["updating", "finalizing", "paying", "confirming", "redirecting"].includes(
      i.formState.value
    );
export { a, n as c, s as f };
