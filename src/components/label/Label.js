import React from 'react'
import styled from 'styled-components'

const LabelStyles = styled.label`
  color: ${props => props.theme.grayDark};
  font-weight: 500;
  cursor: pointer;
  transition: hover .25s linear;
  :hover {
    text-decoration: underline;
  }
`

const Label = ({ htmlFor = "", children, ...props}) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  )
}
export default Label;