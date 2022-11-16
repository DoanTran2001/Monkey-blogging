import Button from "components/button/Button";
import Radio from "components/custom/Radio";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify"; // Tạo slug thông qua chuỗi.
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/custom/Toggle";
import Dropdown from "components/dropdown/Dropdown";
import Option from "components/dropdown/Option";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebaseConfig";
import Select from "components/dropdown/Select";
import List from "components/dropdown/List";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

function PostAddNew() {
  const { userInfo } = useAuth(); // user trong firebase store
  const { control, handleSubmit, setValue, getValues, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status"); // Theo dõi sự thay đổi của status.
  const watchHot = watch("hot"); 
  const {
    image,
    handleResetImage,
    progressState,
    onSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]); // state danh sách category
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchUser() {
      if(!userInfo.email) return; // Nếu không có userInfo thì return, không làm gì cả
      const q = query(collection(db, "users"), where("email", "==", userInfo.email)); // Tìm kiếm user qua email
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        setValue("user", { // Thêm trường user vào react-hook-form.
          id: doc.id,
          ...doc.data()
        })
      })
    }
    fetchUser();
  }, [setValue, userInfo.email]);

  // |===== Thực hiện thêm user =====|
  const handleAddPost = async (values) => {
    setLoading(true); // Loading khi click button Add new post.
    try {
      const cloneValues = { ...values }; // clone values
      console.log(cloneValues);
      // Nếu k nhập slug thì nó sẽ lấy title làm làm slug
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        createAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        image: "",
        category: {}
      });
      handleResetImage();
      setSelectCategory({});
      console.log(cloneValues);
      // handleUpLoadImage(cloneValues.image); // Upload lên firebase/storage
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false)
    }
  };
  // Lấy category từ firebase ra 
  useEffect(() => {
    async function getCategories() {
      const categoryRef = collection(db, "categories");
      const q = query(categoryRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategories();
  }, []);

  // Thêm title khi vào trang add post.
  useEffect(() => {
    document.title = "Monkey blogging - Add new post";
  }, []);
  // Xử lý khi click vào option category.
  const handleClickOptiton = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData  = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data()
    })
    // setValue("categotyId", item.id);
    setSelectCategory(item);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            {/* <input type="file" name="image" onChange={onSelectImage} /> */}
            <ImageUpload
              onChange={onSelectImage}
              className=""
              progress={progressState}
              image={image}
              handleDeleteImage={handleDeleteImage}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                placeholder={`${selectCategory.name || "Select the category"}`}
              ></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((cate) => (
                    <Option
                      key={cate.id}
                      // onClick={() => setValue("categotyId", cate.id)}
                      onClick={() => handleClickOptiton(cate)}
                    >
                      {cate.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-sm bg-green-300 text-green-500 text-sm font-bold border-2 border-green-200">
                {selectCategory.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature Post</Label>
            <Toggle on={watchHot} onClick={() => setValue("hot", !watchHot)} />
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Category</Label>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto" isLoading={loading} disabled={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
}

export default PostAddNew;
