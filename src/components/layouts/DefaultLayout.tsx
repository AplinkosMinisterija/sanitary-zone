import styled from "styled-components";
import { ChildrenType } from "../../types";

export interface DefaultLayoutProps {
  children?: ChildrenType;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <Content>{children}</Content>;
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 16px;
`;

export default DefaultLayout;
