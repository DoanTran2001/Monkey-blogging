import PostItem from 'module/post/PostItem'
import PostNewestItem from 'module/post/PostNewestItem'
import PostNewestLarge from 'module/post/PostNewestLarge'
import React from 'react'
import styled from 'styled-components'

const HomeNewestStyled = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`

export const HomeNewest = () => {
  return (
    <HomeNewestStyled>
      <div className="container">
        <div className="layout">
          <PostNewestLarge />
          <div className="sidebar">
            <PostNewestItem />
            <PostNewestItem />
            <PostNewestItem />
          </div>
        </div>
        <div className="grid-layout grid-layout-primary">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </HomeNewestStyled>
  )
}