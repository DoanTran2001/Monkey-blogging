import Button from 'components/button/Button'
import Field from 'components/field/Field'
import ImageUpload from 'components/image/ImageUpload'
import Input from 'components/input/Input'
import Label from 'components/label/Label'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import React from 'react'
import { useForm } from 'react-hook-form'

function UserProfile() {
  const { control } = useForm({
    mode: "onChange",
  })
  return (
    <div>
      <DashboardHeading title='Account information' />
      <form action="">
        <div className="text-center mb-10">
          <ImageUpload className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto" />
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input control={control} name="fullname" placeholder="Emter your fullname" />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input control={control} name="username" placeholder="Emter your username" />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input control={control} name="birthday" placeholder="dd/mm/yyyy" />
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input control={control} name="phone" placeholder="Enter your number" />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input control={control} name="email" placeholder="Enter your email" />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input control={control} name="passowrd" placeholder="Enter your password" type="passowrd"/>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input control={control} name="confirmPassword" placeholder="Enter your confirm password" type="password"/>
          </Field>
        </div>
        <Button className="mx-auto w-[200px]">Update</Button>
      </form>
    </div>
  )
}

export default UserProfile
