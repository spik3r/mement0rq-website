import styled from "styled-components";

export const ExternalLinks = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  a {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    text-decoration: none;
    transition: border-color 0.15s ease;
    color: var(--ink);
    &:hover { border-color: var(--leaf-line); }
    &:visited { color: var(--ink); }
    .name { font: 500 14px/1 'Inter', sans-serif; }
    .name code { font: 400 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); background: var(--bg); border: 1px solid var(--border); border-radius: 3px; padding: 2px 6px; margin-right: 8px; }
    .handle { font: 400 12px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); }
  }
`;
