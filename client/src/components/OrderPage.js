import Form from "./Form";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";

const OrderPage = ({ setorderId }) => {
    const { Total, cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-order`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: setorderId,
                order: cart,
                total: Total,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                postalCode: formData.postalCode,
                creditCard: formData.creditCard,
                expiration: formData.expiration,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status >= 300) {
                    window.alert(data.message);
                } else {
                    setorderId(data.data.insertedId, "orderId");
                    navigate(`/confirmation`);
                }
            })
            .catch((error) => {
                window.alert(error);
            });
    };

    return (
        <Div>
            <div>
                <TitleDiv>
                    <h2>Checkout</h2>
                    <p>
                        This is a demo app, no information or order will be
                        processed.
                    </p>
                </TitleDiv>
                <Form handleSubmit={handleSubmit} />
            </div>
            <TotalDiv>
                <Span>Order Summary</Span>
                {!Total ? (
                    <Logo src={logo} alt="loading" />
                ) : (
                    <h4>Total: ${Total}</h4>
                )}
            </TotalDiv>
        </Div>
    );
};

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const TitleDiv = styled.div`
    margin: 20px 0px 0px 20px;
    p {
        color: red;
    }
    @media (max-width: 500px) {
        p {
            font-size: small;
            line-height: 16px;
        }
    }
`;
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 2rem 4rem 2rem;
    @media screen and (max-width: 900px) {
        flex-direction: column;
        gap: 2rem;
    }
`;
const TotalDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 48px;
    padding: 24px;
    height: 300px;
    width: 340px;
    @media screen and (max-width: 900px) {
        width: 604px;
        height: 160px;
    }
    @media screen and (max-width: 680px) {
        width: 412px;
    }
    @media screen and (max-width: 470px) {
        width: 330px;
    }
`;
const Span = styled.span`
    margin-bottom: 80px;
    font-size: 24px;
    font-weight: 600;
    padding: 0px 24px;
    text-align: center;
    border-bottom: 2px solid #f6f7fb;
    @media screen and (max-width: 900px) {
        margin-bottom: 30px;
        font-size: 20px;
    }
`;

export default OrderPage;
