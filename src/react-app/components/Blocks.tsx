import styled from "styled-components";

// ── Typography & basic elements ──
export const SectionHeading = styled.h2`
  font: 700 22px/1.3 'Inter', sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

export const BodyText = styled.p`
  font: 400 14px/1.65 'Inter', sans-serif;
  color: var(--label);
  max-width: 650px;
  margin-bottom: 12px;
`;

export const MutedText = styled.p`
  color: var(--muted);
  font: 400 13px/1.55 'Inter', sans-serif;
  margin-bottom: 18px;
  max-width: 650px;
`;

export const InlineLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent);
  &:hover { color: var(--leaf); border-color: var(--leaf); }
  &:visited { color: var(--accent); }
`;

// ── Resource card ──
export const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

export const ResourceCard = styled.a`
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 16px;
  text-decoration: none;
  transition: border-color 0.15s ease, transform 0.15s ease;
  color: var(--ink);
  &:hover { border-color: var(--leaf-line); transform: translateY(-1px); }
  &:visited { color: var(--ink); }
`;

export const ResourceBody = styled.div` flex: 1; min-width: 0; `;

export const ResourceTitle = styled.div`
  font: 600 14px/1.35 'Inter', sans-serif;
  margin-bottom: 4px;
  display: flex; align-items: center; gap: 10px;
  color: var(--ink);
`;

export const PillBadge = styled.code`
  font: 500 10px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const ResourceDescription = styled.p`
  font: 400 13px/1.5 'Inter', sans-serif;
  color: var(--label);
  margin: 0;
`;

export const OutboundArrow = styled.span`
  font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  flex-shrink: 0;
  margin-top: 2px;
  transition: color 0.15s ease, transform 0.15s ease;
  ${ResourceCard}:hover & { color: var(--leaf); transform: translate(2px,-2px); }
`;

// ── Tag pills ──
export const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;
  span {
    font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--label);
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 5px 9px;
    border-radius: 4px;
  }
`;

// ── Focus cards ──
export const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const FocusCard = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  .label {
    font: 600 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--leaf);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  h4 { font: 600 16px/1.3 'Inter', sans-serif; margin-bottom: 6px; }
  p { font: 400 13px/1.55 'Inter', sans-serif; color: var(--label); margin: 0; }
`;

// ── Project card (Monstera showcase) ──
export const ProjectCard = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
`;

export const ProjectCardHeader = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  .label {
    font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--leaf);
  }
  .status {
    font: 400 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted);
  }
`;

export const ProjectCardTitle = styled.h3`
  font: 700 22px/1.2 'Inter', sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  .version {
    font: 400 14px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted);
    margin-left: 8px;
  }
`;

export const ProjectScreenshot = styled.img`
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--border);
  margin-bottom: 18px;
  display: block;
`;

export const PillGroup = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  span {
    font: 400 12px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--label);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 5px 10px;
  }
`;

// ── External links list ──
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
    .name code {
      font: 400 11px/1 'JetBrains Mono', ui-monospace, monospace;
      color: var(--muted);
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 2px 6px;
      margin-right: 8px;
    }
    .handle { font: 400 12px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); }
  }
`;

// ── Blog blocks ──
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
  h4 {
    font: 600 17px/1.4 'Inter', sans-serif;
    color: var(--ink);
    margin: 28px 0 10px;
  }
  code {
    font: 400 13px/1.6 'JetBrains Mono', ui-monospace, monospace;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2px 6px;
    color: var(--leaf);
  }
  pre {
    font: 400 12px/1.6 'JetBrains Mono', ui-monospace, monospace;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 16px 18px;
    overflow-x: auto;
    margin-bottom: 18px;
    color: var(--muted);
    line-height: 1.8;
    .g { color: var(--leaf); }
    .c { color: var(--muted); }
  }
`;

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
    background:
      radial-gradient(circle at 30% 20%, rgba(158, 206, 106, 0.08), transparent 45%),
      radial-gradient(circle at 70% 80%, rgba(122, 162, 247, 0.06), transparent 45%);
    pointer-events: none;
  }
  & > * { position: relative; }
  .badge {
    font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--leaf);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px; justify-content: center;
    &::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--leaf);
      box-shadow: 0 0 8px var(--leaf);
      animation: pulse 2.2s ease-in-out infinite;
    }
  }
  @keyframes pulse { 50% { opacity: 0.4; } }
  h3 {
    font: 700 28px/1.2 'Inter', sans-serif;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
  }
  p {
    font: 400 15px/1.6 'Inter', sans-serif;
    color: var(--label);
    max-width: 480px;
    margin: 0 auto 24px;
  }
`;

export const PostList = styled.div` margin-top: 24px; `;

export const PostRow = styled.a`
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: var(--ink);
  &:visited { color: var(--ink); }
  .left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .number {
    font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted);
    width: 24px; text-align: right; flex-shrink: 0;
  }
  .title {
    font: 500 15px/1.3 'Inter', sans-serif;
    color: var(--label);
    transition: color 0.15s ease;
  }
  &:hover .title { color: var(--ink); }
  .meta {
    font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted); flex-shrink: 0;
  }
`;

export const PostRowPlaceholder = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  .left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .number {
    font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted);
    width: 24px; text-align: right; flex-shrink: 0;
  }
  .title {
    font: 500 15px/1.3 'Inter', sans-serif;
    color: var(--label);
    opacity: 0.45;
  }
  .meta {
    font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace;
    color: var(--muted); flex-shrink: 0;
    .status { color: var(--leaf); margin-left: 10px; }
  }
`;
