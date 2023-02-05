import { useContext } from "react";
// import FeaturedItemsBox from "./FeaturedItemsBox";
import Suggestion from "./Suggestion";
import { ProductContext } from "./ProductContext";
import EmblaCarousel from "./EmblaCarousel";
import styled from "styled-components";

const HomePage = () => {
  const { allProducts } = useContext(ProductContext);

  return (
    <HomepageWrapper>
      <EmblaCarousel />
      {!allProducts ? null : <Suggestion />}
    </HomepageWrapper>
  );
};

const HomepageWrapper = styled.div`
  flex-direction: column;
  align-items: left;
  `;

export default HomePage;
