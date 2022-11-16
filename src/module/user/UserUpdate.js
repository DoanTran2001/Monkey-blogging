import Button from 'components/button/Button'
import Radio from 'components/custom/Radio'
import Field from 'components/field/Field'
import FieldCheckboxes from 'components/field/FieldCheckboxes'
import ImageUpload from 'components/image/ImageUpload'
import Input from 'components/input/Input'
import Label from 'components/label/Label'
import { auth, db } from 'firebase-app/firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import useFirebaseImage from 'hooks/useFirebaseImage'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userRole, userStatus } from 'utils/constants'

function UserUpdate() {
  const { control, handleSubmit, setValue, getValues, formState: { isSubmitting, isValid }, watch, reset } = useForm({
    mode: "onChange"
  })
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status"); // Theo dõi sự thay đổi của status user
  const watchRole = watch("role"); // Theo dõi sự thay đổi của role user
  const imageUrl = getValues("avatar"); // Lấy đường dẫn hình ảnh trong firestore.
  const image_name = /%2F(\S+)\?/gm.exec(imageUrl)?.[1]; // Kiểm tra xem trong 1 chuỗi có chứa chuỗi con nào khớp với mô hình chuỗi của biểu thức chính quy hay không.
  // console.log(image_name); 
  const { image, handleResetImage, progressState, onSelectImage, handleDeleteImage, setImage } = useFirebaseImage( setValue, getValues, image_name, deleteAvatar );
  
  const handleUpdateUser = async (values) => {
    if(!isValid) return;
    // Cập nhật lại displayname 
    await updateProfile(auth.currentUser, {
      displayName: values.fullname
    })
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
        status: Number(values.status)
      })
      toast.success("Update user infomation successfully");
    } catch (error) {
      toast.error("Update user failed")
    }
    
  }
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    })
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [image_name, setImage]);
  useEffect(() => {
    async function fetchData() {
      if(!userId) return;
      const colRef = doc(db, "users", userId);
      const docData =  await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
     
  }, [reset, userId]);
  
  if(!userId) return null;
  return (
    <div>
      <DashboardHeading title="Update user" desc="Update user infomation" />
      <form action="" autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-60 h-40 mx-auto rounded-full">
          <ImageUpload
            className=" !h-[150px] !w-[150px] mx-auto !rounded-full"
            handleDeleteImage={handleDeleteImage}
            image={image}
            process={progressState}
            onChange={onSelectImage}
          />
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  )
}

export default UserUpdate
