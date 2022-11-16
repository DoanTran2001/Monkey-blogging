import React from 'react'
import { useController } from 'react-hook-form'
import styled from 'styled-components'

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${props => props.hasIcon ? "20px 60px 20px 20px" : "20px"};
    background-color: ${props => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all .2s linear;
    border: 1px solid transparent;
    font-size: 14px;
    :focus {
      border-color: green;
    }
  }
  input::-webkit-input-placeholder{
  color: #b2b3bd;
  }
  input::-moz-input-placeholder{
  color: #b2b3bd;
  }
  .input-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`
/**
 * 
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react-hook-form
 * @returns Input
 */

const Input = ({name="", type="text", children, control, ...props}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })
  
  return (
    // Nếu có children thì có icon, ngược lại thì không có icon
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className='input-icon'>{children}</div> : null}
     </InputStyles>
    
  )
}
export default Input