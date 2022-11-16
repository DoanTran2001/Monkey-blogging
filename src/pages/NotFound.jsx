import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundStyles = styled.div`
  height: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  gap: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  h1 {
    /* color: white; */
    font-size: 45px;
    font-weight: bold;
  }
`
const BackToHome = styled(NavLink)`
  padding: 5px 10px;
  background-color: green;
  color: white;
  border-radius: 8px;
`

export default function NotFound() {
  return (
    <NotFoundStyles style={{backgroundImage: `url('./notfound.avif')`}}>
      <NavLink to={"/"}>
        <img srcSet="./logo.png 2x" alt="" />
      </NavLink>
      <h1 className=''>Oops! Page not found</h1>
      <BackToHome to={"/"}>Back to HomePage</BackToHome>
    </NotFoundStyles>
  )
}