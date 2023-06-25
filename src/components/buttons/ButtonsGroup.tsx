import { isEmpty, map } from "lodash";
import styled from "styled-components";
import FieldWrapper from "../fields/components/FieldWrapper";

export interface ToggleButtonProps {
  options: any[];
  onChange: (option?: any) => void;
  isSelected: (option: any) => boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  getOptionLabel?: (option: any) => string;
}

const ButtonsGroup = ({
  options,
  onChange,
  disabled,
  isSelected,
  className,
  label,
  getOptionLabel
}: ToggleButtonProps) => {
  if (isEmpty(options)) return <></>;

  return (
    <div>
      <FieldWrapper className={className} label={label}>
        <Container className={className}>
          {map(options, (option, index) => (
            <StyledButton
              type="button"
              disabled={disabled}
              key={`group-button${index}`}
              left={index === 0}
              right={index === options.length - 1}
              selected={isSelected(option)}
              onClick={() => (disabled ? {} : onChange(option))}
            >
              {getOptionLabel ? getOptionLabel(option) : option.label}
            </StyledButton>
          ))}
        </Container>
      </FieldWrapper>
    </div>
  );
};

const Container = styled.div`
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
  gap: 12px;
  margin: 16px 0;
`;

const StyledButton = styled.button<{
  left: boolean;
  right: boolean;
  selected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;

  align-items: center;
  height: 48px;
  padding: 0 12px;
  border-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#d1d1d1"};

  border-style: solid;
  font-weight: normal;
  font-size: 1.1rem;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#F4F4F6"};
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.primary};
  justify-content: center;
  border-width: 1px;
`;

export default ButtonsGroup;
