import styled from "styled-components";
import { pages, type PageId } from "../site-model";
import HeroRoot, { HeroH1, LeafPrefix, Tagline } from "./sections/Hero";

const Heading = styled(HeroH1)<{ $article: boolean }>`
  font-size: ${({ $article }) => ($article ? "clamp(24px, 5vw, 32px)" : "clamp(29px, 7vw, 40px)")};
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export default function PageHeading({ page, article = false }: { page: PageId; article?: boolean }) {
  const { heading, description } = pages[page];
  return (
    <HeroRoot $inline>
      <Heading $article={article}><LeafPrefix aria-hidden="true">/</LeafPrefix>{heading}</Heading>
      <Tagline>{description}</Tagline>
    </HeroRoot>
  );
}
