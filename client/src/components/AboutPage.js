import styled from "styled-components";

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
                        Our store offers the latest and greatest in wearable
                        technology from authorized resellers. Whether you're
                        looking for a new fitness tracker, smartwatch, or more,
                        we've got you covered. We offer a variety of wearable
                        tech products with an extended warranty so you can be
                        sure your purchase is protected. We also offer free
                        shipping on all orders over $50.
                    </p>
                    <h3>Our Story</h3>
                    <p>
                        {" "}
                        Wearably was funded in 2021 by a group of tech
                        enthusiasts who wanted to bring the best wearable tech
                        to the masses. We're based in Canada.{" "}
                    </p>
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
    margin-bottom: 4rem;
    @media screen and (max-width: 650px) {
        margin-bottom: 2rem;
    }
`;
const AboutPageContainer = styled.div`
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    height: 100%;
    max-width: 100%;
    h1 {
        text-align: left;
        margin-left: 8%;
    }
    h2 {
        text-align: left;
        margin-left: 8%;
    }
    @media screen and (max-width: 650px) {
        margin: 1rem 0;
        h1 {
            font-size: 30px;
        }
        h2 {
            font-size: 26px;
        }
    }
    @media screen and (max-width: 490px) {
        h1 {
            font-size: 24px;
        }
        h2 {
            font-size: 20px;
        }
    }
`;
const HeroImage = styled.img`
    width: 90%;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 2%;
    margin-bottom: 10px;
`;
const AboutPageContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    @media screen and (max-width: 850px) {
        flex-direction: column;
    }
`;
const AboutPageImage = styled.img`
    width: 40%;
    margin: 24px 60px 24px 100px;
    object-fit: cover;
    border-radius: 56px;
    @media screen and (max-width: 1140px) {
        margin-right: 30px;
    }
    @media screen and (max-width: 850px) {
        width: 50%;
        margin: 24px 0;
    }
`;
const AboutPageText = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: 30px;
    font-size: 20px;
    h3 {
        margin: 30px 0;
    }
    @media screen and (max-width: 1140px) {
        line-height: 26px;
        font-size: 18px;
        h3 {
            margin: 16px 0;
        }
    }
    @media screen and (max-width: 490px) {
        font-size: 12px;
        h3 {
            font-size: 20px;
        }
    }
`;

export default AboutPage;
