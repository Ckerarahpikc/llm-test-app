import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-soft-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
`;
const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 800;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading type="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </Box>
    </StyledPageNotFound>
  );
}
