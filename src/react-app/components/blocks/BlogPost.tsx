import styled from "styled-components";

export const BlogPostBlock = styled.article`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
`;

export const BlogPostDate = styled.div`
  font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--leaf);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
`;

export const BlogPostTitle = styled.h3`
  font: 700 26px/1.3 'Inter', sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
`;

export const BlogPostBody = styled.div`
  font: 400 15px/1.75 'Inter', sans-serif;
  color: var(--label);
  p { margin-bottom: 18px; }
  strong { color: var(--ink); }
  h4 { font: 600 17px/1.4 'Inter', sans-serif; color: var(--ink); margin: 28px 0 10px; }
  code { font: 400 13px/1.6 'JetBrains Mono', ui-monospace, monospace; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; color: var(--leaf); }
  pre { font: 400 12px/1.9 'JetBrains Mono', ui-monospace, monospace; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 16px 18px; overflow-x: auto; margin-bottom: 18px; color: var(--label); }
  pre .c1 { color: var(--muted); }
  pre .kw { color: var(--leaf); }
  pre .s1 { color: var(--accent); }
`;
