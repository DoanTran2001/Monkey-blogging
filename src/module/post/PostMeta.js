import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-time {
      font-size: 12px;
    }
    &-author {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const PostMeta = ({ date = "", authorname = "", to = "/" }) => {
  return (
    <PostMetaStyles>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to}>
       <span className="post-author">{authorname}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
