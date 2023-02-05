import styled from "styled-components";

const Input = ({ type, placeholder, name, required, handleChange }) => {
    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            required={required}
            // send the text to form with handleChange
            onChange={(e) => handleChange(name, e.target.value)}
        />
    );
};

const StyledInput = styled.input`
    font-size: 16px;
    border-radius: 48px;
    width: 300px;
    border: 2px solid #eeeff4;
    padding: 12px;
    margin: 5px 10px;
    @media screen and (max-width: 470px) {
        width: 220px;
    }
`;

export default Input;
