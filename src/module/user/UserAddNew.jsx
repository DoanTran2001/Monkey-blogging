import Button from "components/button/Button";
import Radio from "components/custom/Radio";
import Field from "components/field/Field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { auth, db } from "firebase-app/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

function UserAddNew() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      status: userStatus.ACTIVE,
      username: "",
      avatar: "",
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const {
    image,
    progressState,
    handleResetImage,
    handleDeleteImage,
    onSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status"); // Theo dõi sự thay đổi của status user
  const watchRole = watch("role"); // Theo dõi sự thay đổi của role user

  const handleAddUser = async (values) => {
    // console.log(values);
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password); // Tạo user trong authen của  firestore.
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL: image,
      })
      await addDoc(collection(db, "users"), {
        // Thêm user vào firebase database.
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        status: Number(values.status),
        username: slugify(values.username || values.fullname, { lower: true }),
        avatar: image,
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      
      toast.success("Create new user successfully");
      reset({
        fullname: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        username: "",
        avatar: "",
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetImage();
    } catch (error) {
      toast.error("asdas", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <DashboardHeading title="New user" desc="Add new user to system" />
      <form action="" autoComplete="off" onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-60 h-40 mx-auto rounded-full">
          <ImageUpload
            className=" h-[20px] mx-auto rounded-full"
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
          Add new user
        </Button>
      </form>
    </div>
  );
}

export default UserAddNew;
