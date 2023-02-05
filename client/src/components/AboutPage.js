import styled from 'styled-components';
//Create an about page component consisting of one hero image in the first viewport and below it two columns of the same size with a picture on the left column and text on the right column
 

const AboutPage = () => {
  return (
    <AboutPageContainer>
      <h1> About us </h1>
      <HeroImageWrapper>
        <HeroImage src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1669044389/About-Hero_hnefhw.png" />
      </HeroImageWrapper>
      <h2> Bringing you the best tech </h2>
      <AboutPageContent>
        <AboutPageImage src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1669044387/Vertical-Image_av8q5l.png" />
        <AboutPageText>
          <h3>Authorized Resellers</h3>
          <p>
            Our store offers the latest and greatest in wearable technology from authorized resellers. Whether you're looking for a new fitness tracker, smartwatch, or more, we've got you covered. 

            We offer a variety of wearable tech products with an extended warranty so you can be sure your purchase is protected. We also offer free shipping on all orders over $50.
          </p> 
          <h3>Our Story</h3>
          <p> Wearably was funded in 2021 by a group of tech enthusiasts who wanted to bring the best wearable tech to the masses. We're based in Canada. </p>
        </AboutPageText>
      </AboutPageContent>
    </AboutPageContainer>
  );
};


const HeroImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  border-radius: 40px;
  `;
  
  const AboutPageContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100%;
  max-width: 100%;

  h1 {
    text-align: left;
    margin-left: 6%;
  }

  h2 {
    margin: 50px 10px;
    text-align: left;
    margin-left: 6%;
  }
  `;

const HeroImage = styled.img`
  width: 90%;    
  height: 60%;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 2%;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AboutPageContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


`;

const AboutPageImage = styled.img`
  width: 50%;
  //add margin to the left
  margin: 0 100px;
  object-fit: cover;
  border-radius: 56px;
`;


const AboutPageText = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 50%;
  height: 100%;
  padding: 0 4rem;
  text-align: left;
  line-height: 48px;
  font-size: 24px;

  h2 {
    text-align: left;
  }
  
  p {
    text-align: left;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 0 2rem;
    text-align: left;
    line-height: 48px;
    font-size: 24px;
  }

  h3 {
    margin: 30px 0;  }
`;

export default AboutPage;


