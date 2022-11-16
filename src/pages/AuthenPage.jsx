import React from 'react'
import styled from 'styled-components'

const AuthenPageStyles = styled.div`
  min-height: 100vh;
  /* padding: 20px; */
  .logo {
    margin: 0 auto 20px;
  }
  .heading{
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .form {
    width: 700px;
    margin: 0 auto;
  }
`
// Layout signin, signup page
function AuthenPage({children}) {
  return (
    <AuthenPageStyles>
      <div className="container">
        <img srcSet='/logo.png 2x' alt="logo_monkey" className='logo'/>
        <h1 className='heading'>Mokey Blogging </h1>
        {children}
      </div>
    </AuthenPageStyles>
  )
}

export default AuthenPage
