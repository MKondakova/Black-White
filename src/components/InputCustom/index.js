import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  width: auto;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : "0")};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : "0")};
  margin-top: ${(props) => (props.mt ? `${props.mt}px` : "0")};
  margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : "0")};
`;

const InputCustom = styled.input`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "62px")};
  outline: ${(props) => (props.outline ? props.outline : "none")};
  background: ${(props) => (props.background ? props.background : "white")};
  border: ${(props) => (props.border ? props.border : "none")};
  z-index: 1;
  border-bottom-style: solid;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  padding: ${(props) => (props.padding ? props.padding : "0 27px")};
  position: "relative";
  &::placeholder {
    font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
    color: ${(props) => (props.color ? props.color : "#838383")};
  }
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 20px;
  color: red;
  margin: 32px 0 0;
`;

export const Input = ({
  mb,
  mr,
  mt,
  ml,
  noError,
  errorMessage,
  width,
  height,
  outline,
  background,
  border,
  fontSize,
  color,
  placeholder,
  onChange,
  disabled,
  name,
  value,
  padding,
  type,
  textAlign,
}) => (
  <InputWrapper mb={mb} ml={ml} mt={mt} mr={mr}>
    <InputCustom
      width={width}
      height={height}
      outline={outline}
      background={background}
      border={border}
      fontSize={fontSize}
      color={color}
      name={name}
      placeholder={placeholder}
      padding={padding}
      value={value}
      disabled={disabled}
      type={type}
      textAlign={textAlign}
      onChange={(event) => onChange(event.target.value, event)}
    />
    {!noError ? <ErrorText>{errorMessage}</ErrorText> : null}
  </InputWrapper>
);
