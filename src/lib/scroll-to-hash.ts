export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (!hash.startsWith("#")) return false;

  const target = document.querySelector(hash);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: "start" });
  window.history.pushState(null, "", hash);
  return true;
}
