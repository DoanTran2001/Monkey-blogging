import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";


const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    /* &-category {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      background-color: #f3f3f3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    } */
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      font-size: 22px;
      color: white;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

function PostFeatureItem({ post }) {
  const { image, title, category, slug, createAt, user } = post;
  const date = new Date(createAt.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyles>
      {/* <img src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80" alt="" className='post-image'/> */}
      <PostImage url={image} className="post-image" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {/* <span className="post-category">Kiến thức</span> */}
          <PostCategory to={category?.slug}>{category?.name}</PostCategory>
          {/* <div className="post-info">
            <span className="post-time">Mar 23</span>
            <span className="post-dot"></span>
            <span className="post-author">{user?.fullname}</span>
          </div> */}
          <PostMeta className="post-info" to={slugify(user?.fullname || "")} date={formatDate} authorname={user?.fullname} />
        </div>
        {/* <h3 className="post-title">
              Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
            </h3> */}
        <PostTitle className="post-title" to={slug}>{title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
}

export default PostFeatureItem;
