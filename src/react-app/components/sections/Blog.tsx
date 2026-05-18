import styled from "styled-components";

export const TerminalBlock = styled.div`
  display: inline-block;
  font: 500 12px/1.6 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 18px;
  text-align: left;
  .line { display: block; }
  .prompt { color: var(--leaf); }
`;

export const BlogComingSoon = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 36px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 30% 20%, rgba(158,206,106,0.08), transparent 45%), radial-gradient(circle at 70% 80%, rgba(122,162,247,0.06), transparent 45%);
    pointer-events: none;
  }
  & > * { position: relative; }
  .badge {
    font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--leaf);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px; justify-content: center;
    &::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--leaf); box-shadow: 0 0 8px var(--leaf); animation: pulse 2.2s ease-in-out infinite; }
  }
  @keyframes pulse { 50% { opacity: 0.4; } }
  h3 { font: 700 28px/1.2 'Inter', sans-serif; letter-spacing: -0.01em; margin-bottom: 10px; }
  p { font: 400 15px/1.6 'Inter', sans-serif; color: var(--label); max-width: 480px; margin: 0 auto 24px; }
`;

export const PostList = styled.div` margin-top: 24px; `;

export const PostRow = styled.a`
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px; padding: 16px 0; border-bottom: 1px solid var(--border);
  text-decoration: none; color: var(--ink);
  &:visited { color: var(--ink); }
  .left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .number { font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); width: 24px; text-align: right; flex-shrink: 0; }
  .title { font: 500 15px/1.3 'Inter', sans-serif; color: var(--label); transition: color 0.15s ease; }
  &:hover .title { color: var(--ink); }
  .meta { font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); flex-shrink: 0; }
`;

export const PostRowPlaceholder = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px; padding: 16px 0; border-bottom: 1px solid var(--border);
  .left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .number { font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); width: 24px; text-align: right; flex-shrink: 0; }
  .title { font: 500 15px/1.3 'Inter', sans-serif; color: var(--label); opacity: 0.45; }
  .meta { font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); flex-shrink: 0; .status { color: var(--leaf); margin-left: 10px; } }
`;
