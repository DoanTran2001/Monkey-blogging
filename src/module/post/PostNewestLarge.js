import React from 'react'
import styled from 'styled-components'
import PostCategory from './PostCategory';
import PostImage from './PostImage';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      font-size: 22px;
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      {/* <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div> */}
      <PostImage url='https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80' className='post-image' to="/" />
      {/* <div className="post-category">Kiến thức</div> */}
      <PostCategory className='post-category'>Kiến thức</PostCategory>
      {/* <h3 className="post-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3> */}
      <PostTitle className="post-title">Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
      {/* <div className="post-info">
        <span className="post-time">Mar 23</span>
        <span className="post-dot"></span>
        <span className="post-author">Andiez Le</span>
      </div> */}
      <PostMeta date='Mar 23' authorname='Andisze' />
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;