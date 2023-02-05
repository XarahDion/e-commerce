import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";

const ConfirmationPage = ({ orderId }) => {
    return (
        <Wrapper>
            {!orderId ? (
                <Logo src={logo} alt="loading" />
            ) : (
                <>
                    <Title>
                        Thank you for shopping with Wearably! Your order will be
                        with you soon.
                    </Title>
                    <P>Confirmation# : {orderId} </P>
                    <Img
                        src={
                            "https://res.cloudinary.com/dk9mn4cvz/image/upload/v1669046298/96237-success_uf4bqu.gif"
                        }
                    />
                </>
            )}
        </Wrapper>
    );
};

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const Img = styled.img`
    width: 400px;
    height: auto;
    @media screen and (max-width: 590px) {
        max-width: 240px;
    }
`;
const P = styled.p`
    padding: 5px;
    font-size: 12px;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0rem 2rem;
`;
const Title = styled.span`
    text-align: center;
    font-weight: 600;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: -20px;
`;

export default ConfirmationPage;
