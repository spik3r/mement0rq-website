import styled from "styled-components";

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
