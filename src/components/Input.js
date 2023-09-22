import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: "blue",
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.done};
  color: ${({ theme, completed }) => theme.text};
  font-size: 25px;
`;

const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  const { width } = Dimensions.get("window");
  return (
    <StyledInput
      backgroundColor="gray"
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Input;
