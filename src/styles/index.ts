import { createGlobalStyle } from "styled-components";
export interface Theme {
  colors: {
    primary: string;
    submitted: string;
    returned: string;
    secondary: string;
    tertiary: string;
    danger: string;
    transparent: string;
    success: string;
    confirmed: string;
    hover: {
      submitted: string;
      primary: string;
      secondary: string;
      tertiary: string;
      danger: string;
      success: string;
      returned: string;
      confirmed: string;
    };
    tertiaryMedium: string;
    tertiaryLight: string;
    new: string;
    not_finished: string;
    finished: string;
    late: string;
    input: string;
    border: string;
    label: string;
    error: string;
    light: string;
    white: string;
    darkerWhite: string;
    pending: string;
    grey: string;
  };
}

export const theme: Theme = {
  colors: {
    primary: "#009886 ",
    returned: "#FEBC1D",
    secondary: "#13C9E7",
    tertiary: "#7A7E9F",
    danger: "#FE5B78",
    transparent: "transparent",
    success: "#4FB922",
    confirmed: "#4FB922",
    submitted: "#4FB922",
    hover: {
      submitted: "#4FB922",
      confirmed: "#4FB922",
      success: "#4FB922",
      returned: "#FEBC1D",
      primary: "#008374 ",
      secondary: "#13C9E78F",
      tertiary: "#7A7E9F",
      danger: "#FE5B78E6"
    },
    tertiaryMedium: "#C6C8D6",
    tertiaryLight: "#F3F3F7",
    new: "#00cae9",
    not_finished: "#fea700",
    finished: "#60b456",
    late: "#FE5B78",
    input: "#F3F3F7",
    border: "#D3D2D2",
    label: "#231F20",
    error: "#FE5B78",
    light: "#f3f3f7",
    white: "#ffffff",
    darkerWhite: "#A4A7BD",
    pending: "#fea700",
    grey: "#B3B5C4"
  }
};

export const GlobalStyle = createGlobalStyle`




  html, body{
  height:100%
}
body {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin:0;
  color:#1D2941;
  font-size: 1.125em;
  box-sizing: border-box;
  background: url("./bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
}






`;

export const device = {
  mobileS: `(max-width: 320px)`,
  mobileM: `(max-width: 425px)`,
  mobileL: `(max-width: 788px)`,
  mobileXL: `(max-width: 1025px)`,
  tablet: `(max-width: 1024px) and (min-width: 769px)`,
  desktop: `(min-width: 1025px)`
};
