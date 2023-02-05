import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <h3>Wow sorry about this, it looks like something went wrong.</h3>
      <img
        src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1668992341/38463-error_aqvveb.gif"
        alt="animated gif of computer not working"
      />
      <LinkHome onClick={handleHome}>
        This truck is going to the Homepage if you want to hop in?
        <FiTruck size={48} style={{ marginLeft: "1em" }} />
      </LinkHome>
    </Wrapper>
  );
};
export default ErrorPage;

const Wrapper = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkHome = styled.a`
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline solid black 2px;
    cursor: pointer;
  }
`;
