import React from "react";

/**
 * Decides the initial theme on first paint.
 * Order of precedence:
 *   1. localStorage("vite-ui-theme") – updated instantly on toggle
 *   2. "vite-ui-theme" cookie – updated on the next server round-trip
 *   3. OS preference via prefers-color-scheme
 *
 * Result: Adds either "light" or "dark" class to <html> and ensures a
 *         <meta name="color-scheme" content="light dark"> tag exists.
 */
export function ThemeInitScript() {
	const js = `(() => {
    try {
      const COOKIE = "vite-ui-theme";
      // 1. Try localStorage first – instant client-side updates when the user toggles.
      // 2. Fallback to the cookie (updated on the next server round-trip).
      // This prevents a flicker where the cookie still contains the old value
      // between the client update and the (async) server response.
      let theme = null;

      try {
        theme = localStorage.getItem(COOKIE);
      } catch (_) {}

      if (!theme) {
        const match = document.cookie.match(new RegExp("(?:^|; )" + COOKIE + "=([^;]*)"));
        theme = match ? decodeURIComponent(match[1]) : null;
      }

      if (theme !== "light" && theme !== "dark") {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);

      let meta = document.querySelector('meta[name="color-scheme"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "color-scheme");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", "light dark");
    } catch (_) { /* never block page load */ }
  })();`;

	// Children string executes while avoiding react/no-danger complaints.
	return (
		<script id="theme-init" suppressHydrationWarning>
			{js}
		</script>
	);
}
