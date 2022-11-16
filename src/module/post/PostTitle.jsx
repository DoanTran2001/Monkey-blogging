import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  a {
    display: block;
  }
`;

function PostTitle({ className, children, to = "/" }) {
  return (
    <PostTitleStyles className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
}

export default PostTitle;
