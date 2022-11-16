import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  background-color: #f3f3f3;
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: #f3edff;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: #fff;
    `};
`;

function PostCategory({ children, type = "primary", className = "", to = "" }) {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={to}>
      {children}
      </NavLink>
    </PostCategoryStyles>
  );
}

export default PostCategory;
