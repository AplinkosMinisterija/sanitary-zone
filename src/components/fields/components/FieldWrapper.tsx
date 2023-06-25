import styled from "styled-components";
import { ChildrenType } from "../../../types";
export interface FieldWrapperProps {
  error?: string;
  showError?: boolean;
  label?: string;
  className?: string;
  padding?: string;
  onClick?: () => void;
  handleBlur?: (event: any) => void;
  bottomLabel?: string;
  subLabel?: string;
  secondLabel?: JSX.Element;
  children: ChildrenType;
}

const FieldWrapper = ({
  error,
  showError = true,
  label,
  className,
  padding,
  onClick,
  handleBlur,
  subLabel,
  secondLabel,
  children
}: FieldWrapperProps) => {
  return (
    <Container
      tabIndex={0}
      onBlur={handleBlur}
      className={className}
      padding={padding || "0"}
      onClick={onClick}
    >
      <LabelRow>
        {!!label && (
          <LabelContainer>
            <Label>{label}</Label>
            {!!subLabel && <SubLabel>{subLabel}</SubLabel>}
          </LabelContainer>
        )}
        {secondLabel}
      </LabelRow>
      {children}
      {error && showError && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const ErrorMessage = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1rem;
  white-space: nowrap;
  margin-top: 4px;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const Container = styled.div<{ padding: string }>`
  display: block;
  position: relative;
  padding: ${({ padding }) => padding};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  text-align: left;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.label};
  opacity: 1;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const SubLabel = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0b1f518f;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
`;

export default FieldWrapper;
