import styled from "styled-components";

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
