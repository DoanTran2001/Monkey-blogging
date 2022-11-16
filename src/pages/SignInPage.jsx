import Button from 'components/button/Button';
import Field from 'components/field/Field';
import Input from 'components/input/Input';
import Label from 'components/label/Label';
import { useAuth } from 'contexts/AuthContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthenPage from './AuthenPage';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import IconEyeClose from 'components/icons/IconEyeClose';
import IconEyeOpen from 'components/icons/IconEyeOpen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase-app/firebaseConfig';

const schema = yup.object({
  email: yup.string().email("Please emter valid email address").required("Please enter your email address"),
  password: yup.string().min(8, "Your password must be at least 8 character").required("Please enter your password")
})

function SignInPage() {
  const [toggleShow, setToggleShow] = useState(false);
  const { handleSubmit, control, formState: {
    isSubmitting, isValid, errors
  } } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    const arrError = Object.values(errors);
    if(arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0
      })
    }
  }, [errors])
  const { userInfo } = useAuth();
  console.log(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    document.title="Login";
    // Nếu đã đăng nhập r mà vào trang đăng nhập tiếp thì cho về trang chủ.
    if(userInfo?.email) navigate("/")
  }, [navigate, userInfo?.email])

  const handleSignIn = async (values) => {
    if(!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password); // Đăng nhập với email và password
    navigate("/"); // Khi đang nhập thành công thì cho về trang chủ
  }
  return (
    <AuthenPage>
      <form action="" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
        <Field>
          <Label htmlFor='email'>
            Email
          </Label>
          <Input type="email" control={control} name="email" placeholder="Enter your email address" ></Input>
        </Field>
        <Field>
          <Label htmlFor='password'>
            Password
          </Label>
          <Input type={toggleShow ? "text" : "password"} control={control} name="password" placeholder="Enter your password" >
          {
                !toggleShow ? (
                  <IconEyeClose className='' onClick={() => setToggleShow(true)} />
                ) : (
                  <IconEyeOpen className='' onClick={() => setToggleShow(false)} />
                )
              }
          </Input>
        </Field>
        <div className="have-account">You have not an account? <NavLink to={"/sign-up"}>Sign up</NavLink></div>
        <Button type='submit' style={{maxWidth: '300px', margin: "0 auto"}} isLoading={isSubmitting} >Sign In</Button>
      </form>
    </AuthenPage>
  )
}
export default SignInPage