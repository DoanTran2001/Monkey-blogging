import Label from 'components/label/Label'
import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Input from 'components/input/Input'
import IconEyeOpen from 'components/icons/IconEyeOpen'
import Field from 'components/field/Field'
import IconEyeClose from 'components/icons/IconEyeClose'
import { useState } from 'react'
import Button from 'components/button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from 'firebase-app/firebaseConfig'
import { NavLink, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import AuthenPage from './AuthenPage'
import slugify from 'slugify'
import { userRole, userStatus } from 'utils/constants'


const SignUpPage = styled.div`
  min-height: 100vh;
  padding: 10px;
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
  .field {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  .label {
    color: ${props => props.theme.grayDark};
    font-weight: 500;
    cursor: pointer;
  }
  .input-field {
    width: 100%;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    transition: .25s ease-in-out;
    background-color: ${props => props.theme.grayLight};;
    :focus {
      border-color: green;
    }
  }
  input::-webkit-input-placeholder{
  color: #84878b;
  }
  input::-moz-input-placeholder{
  color: #84878b;
  }
`
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().email("Please enter valid email address").required("Please enter your email"),
  password: yup.string().min(8, "Your password must be at least 8 character").required("Please enter your password")
})

export default function SignupPage() {
  const navigate = useNavigate();
  const {control, handleSubmit, formState: {
    errors, isValid, isSubmitting
  }, watch, reset} = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  })
  const handleSignUp = async (values) => {
    // console.log(values); // Giá trị khi nhập đúng các trường
    if(!isValid) return;
    // tạo user với email và mật khẩu
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    // Cập nhật profile là cái tên đăng nhập 
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bG92ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    })
    // Thêm user vào collection (Thêm user vào database)
    // const colRef = collection(db, "users");
    // Tạo id user trong db trùng với id trong auth
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bG92ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    })
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password
    // })
    // Hiển thị thanh toast khi đăng ký thành công
    toast.success("Create user success");
    // Sau khi đăng ký thành công rồi thì chuyển vầ trang chủ
    navigate("/");
  }
  
  const [toggleShow, setToggleShow] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if(arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors])
  return (
    <SignUpPage>
        <AuthenPage>
          <form action="" className='form' onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
          <Field>
            <Label htmlFor='fullname' >Fullname</Label>
            {/* <input type="text" id='fullname' className='input-field' placeholder="Please enter your fullname"/> */}
            <Input control={control} placeholder="Enter your fullname..." name="fullname">
              
            </Input>
          </Field>
          <Field>
            <Label htmlFor='email' >Email</Label>
            {/* <input type="text" id='email' className='input-field' placeholder="Please enter your email"/> */}
            <Input type="email" control={control} placeholder="Enter your email..." name="email">
              
            </Input>
          </Field>
          <Field>
            <Label htmlFor='password' >Password</Label>
            {/* <input type="text" id='password' className='input-field' placeholder="Please enter your password"/> */}
            <Input type={toggleShow ? "text" : "password"} control={control} placeholder="Enter your password..." name="password">
              
              {
                !toggleShow ? (
                  <IconEyeClose className='' onClick={() => setToggleShow(true)} />
                ) : (
                  <IconEyeOpen className='' onClick={() => setToggleShow(false)} />
                )
              }
            </Input>
          </Field>
          <div className="have-account">You already have an account? <NavLink to={"/sign-in"}>Sign In</NavLink></div>
          <Button type='submit' isLoading={isSubmitting}>Sign Up</Button>
          </form>
        </AuthenPage>
    </SignUpPage>
  )
}
