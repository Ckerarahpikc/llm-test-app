import styled from "styled-components";

const StyledFormRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  align-self: flex-start;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) button {
    width: 100%;
  }
`;

const Label = styled.label`
  width: 100%;
  font-weight: 600;
  text-align: left;
`;

function FormRow({ children, label }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

export default FormRow;
