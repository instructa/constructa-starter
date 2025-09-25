import { useEffect } from 'react';

const BASE_STYLE_ID = 'assistant-ui-scoped-styles';
const MARKDOWN_STYLE_ID = 'assistant-ui-markdown-styles';

function scopeAssistantCss(css: string, scopeClass: string) {
  const scopeSelector = `.${scopeClass}`;
  return css
    .replaceAll(':root :where(.aui-root)', `${scopeSelector} :where(.aui-root)`)
    .replace(/:root\s*\{/g, `${scopeSelector} {`)
    .replace(/\n\.dark\s*\{/g, `\n${scopeSelector}.dark {`);
}

function scopeMarkdownCss(css: string, scopeClass: string) {
  const scopeSelector = `.${scopeClass}`;
  return css.replaceAll(':root :where(.aui-root)', `${scopeSelector} :where(.aui-root)`);
}

function ensureStyleElement(id: string) {
  let styleEl = document.getElementById(id) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }
  return styleEl;
}

export function ScopedAssistantStyles({ scopeClass }: { scopeClass: string }) {
  useEffect(() => {
    let cancelled = false;
    const baseEl = ensureStyleElement(BASE_STYLE_ID);
    const markdownEl = ensureStyleElement(MARKDOWN_STYLE_ID);

    async function loadStyles() {
      const [baseModule, markdownModule] = await Promise.all([
        import('@assistant-ui/styles/index.css?raw'),
        import('@assistant-ui/styles/markdown.css?raw'),
      ]);

      if (cancelled) return;

      baseEl.textContent = scopeAssistantCss(baseModule.default, scopeClass);
      markdownEl.textContent = scopeMarkdownCss(markdownModule.default, scopeClass);
    }

    void loadStyles();

    return () => {
      cancelled = true;
    };
  }, [scopeClass]);

  return null;
}
