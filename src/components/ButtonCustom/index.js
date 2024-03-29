import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  width: ${(props) => (props.width ? props.width : "100%")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  font-family: "Roboto", sans-serif;
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  display: block;
  outline: none;
  flex-shrink: 0;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : "0")};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : "0")};
  margin-top: ${(props) => (props.mt ? `${props.mt}px` : "0")};
  margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : "0")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "5px")};
  color: #222233;
  background-color: transparent;
  background-image: none;
  border-color: #222233;
  border-width: 1px;
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
  &:hover {
    color: #fff;
    background-color: #222233;
    border-color: #222233;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
  }
`;

export const ButtonCustom = ({
  children,
  width,
  fontWeight,
  textAlign,
  padding,
  height,
  mr,
  fontSize,
  ml,
  mt,
  mb,
  backgroundColor,
  textColor,
  disabled,
  type,
  borderRadius,
  onClick
}) => (
  <Btn
    width={width}
    fontWeight={fontWeight}
    textAlign={textAlign}
    padding={padding}
    fontSize={fontSize}
    height={height}
    mr={mr}
    ml={ml}
    mt={mt}
    mb={mb}
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
    textColor={textColor}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </Btn>
);