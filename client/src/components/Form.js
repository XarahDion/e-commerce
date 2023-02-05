import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";

const Form = ({ handleSubmit }) => {
    const [formData, setFormData] = useState();

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    return (
        /// onSubmit, sends the formData to OrderPage component with handleSubmit function
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <InstDiv>
                <DivDet>Enter shipping address</DivDet>{" "}
                <DivDet>All fields are mandatory</DivDet>
            </InstDiv>
            <Div>
                <Input
                    type="text"
                    placeholder="First Name"
                    name={"firstName"}
                    required={true}
                    handleChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    name={"lastName"}
                    required={true}
                    handleChange={handleChange}
                />
            </Div>
            <Div>
                <Input
                    type="email"
                    placeholder="Email"
                    name={"email"}
                    required={true}
                    handleChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Phone Number"
                    name={"phone"}
                    required={true}
                    handleChange={handleChange}
                />
            </Div>
            <Div>
                <Input
                    type="text"
                    placeholder="Address"
                    name={"address"}
                    required={true}
                    handleChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Postal Code"
                    name={"postalCode"}
                    required={true}
                    handleChange={handleChange}
                />
            </Div>
            <Div>
                <Input
                    type="text"
                    placeholder="Credit Card Number"
                    name={"creditCard"}
                    required={true}
                    handleChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Expiration Date"
                    name={"expiration"}
                    required={true}
                    handleChange={handleChange}
                />
            </Div>
            {/* the Submit button fires the handleSubmit function */}
            <Submit type="submit">Order Now</Submit>
        </StyledForm>
    );
};

const DivDet = styled.div`
    justify-content: space-between;
`;
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 680px) {
        flex-direction: column;
        gap: 3px;
    }
`;
const InstDiv = styled.div`
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
`;
const Submit = styled.button`
    width: 250px;
    margin-top: 15px;
    align-self: center;
    &:hover {
        cursor: pointer;
    }
    &:disabled {
        color: grey;
    }
`;
const StyledForm = styled.form`
    max-width: 700px;
    margin: 20px 20px 0px 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 48px;
    gap: 8px;
    font-size: 14px;
    @media screen and (max-width: 990px) {
        max-width: 600px;
    }
`;

export default Form;
