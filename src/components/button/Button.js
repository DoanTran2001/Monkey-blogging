import LoadingSpinner from "components/loading/Loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0px 15px;
  border-radius: 8px;
  line-height: 1;
  /* color: white; */
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || "66px"};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: #fff;
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color:  rgba(29, 129, 113, 0.1) !important;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: #fff;
      background-color: ${(props) => props.theme.primary} !important;
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 *
 * @param {string} type Type of button 'button' || 'submit'
 * @param {function} onCLick handle click button
 * @param {*} children
 * @returns
 */

export default function Button({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) {
  const { isLoading, to } = props; // Lấy isLoading từ this.props.
  // Ép isLoading về kiểu boolean và kiểm tra nếu isLoading thì hiển thị loading, còn không thì hiển thị children đc truyền vào
  const child = !!isLoading ? <LoadingSpinner /> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles type={type} {...props} kind={kind}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} onClick={onClick} {...props} kind={kind}>
      {child}
    </ButtonStyles>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired, // Chỉ truyền "button" hoặc "submit"
  onclick: PropTypes.func,
  isLoading: PropTypes.bool,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};
