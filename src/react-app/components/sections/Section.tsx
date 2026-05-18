import styled from "styled-components";

const SectionRoot = styled.section` margin-bottom: 56px; `;

export const TextPanel = styled.div`
  width: 100%;
  padding: 22px 24px;
  background: color-mix(in srgb, var(--panel) 42%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 62%, transparent);
  border-radius: 12px;

  @media (max-width: 640px) { padding: 0; background: transparent; border: 0; }
`;

export const SectionHeading = styled.h2`
  font: 700 22px/1.3 'Inter', sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

export const BodyText = styled.p`
  font: 400 14px/1.65 'Inter', sans-serif;
  color: var(--label);
  max-width: none;
  margin-bottom: 12px;
`;

export const MutedText = styled.p`
  color: var(--label);
  font: 400 14px/1.65 'Inter', sans-serif;
  margin-bottom: 18px;
  max-width: none;
`;

export const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;
  span { font: 500 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--label); background: var(--panel); border: 1px solid var(--border); padding: 5px 9px; border-radius: 4px; }
`;

export default SectionRoot;
