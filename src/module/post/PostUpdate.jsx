import Button from 'components/button/Button'
import Radio from 'components/custom/Radio'
import Toggle from 'components/custom/Toggle'
import Dropdown from 'components/dropdown/Dropdown'
import List from 'components/dropdown/List'
import Option from 'components/dropdown/Option'
import Select from 'components/dropdown/Select'
import Field from 'components/field/Field'
import ImageUpload from 'components/image/ImageUpload'
import Input from 'components/input/Input'
import Label from 'components/label/Label'
import { db } from 'firebase-app/firebaseConfig'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import useFirebaseImage from 'hooks/useFirebaseImage'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { postStatus } from 'utils/constants'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import ImageUploader from 'quill-image-uploader';
import axios from 'axios'
import { imgbbAPI } from 'config/apiConfig'
Quill.register('modules/imageUploader', ImageUploader);

function PostUpdate() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { handleSubmit, control, reset, watch, formState: { isSubmitting }, setValue, getValues} = useForm({
    mode: "onChange"
  })
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const [content, setContent] = useState("");
  const { image, setImage, progressState, onSelectImage, handleDeleteImage } = useFirebaseImage(getValues, setValue, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "posts", id);
    await updateDoc(colRef, {
      
    })
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  const [loading, setLoading] = useState(false);
  const watchHot = watch("hot");
  const watchStatus = watch("status")
  const handleUpdatePost = async (values) => {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...values,
      content
    })
    toast.success("Update post successfully");
  }
  useEffect(() => {
    async function fetchData() {
      if(!id) return;
      const docRef = doc(db, "posts", id);
      const docSnapshot = await getDoc(docRef);
      if(docSnapshot.data()){
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    fetchData();
  }, [id, reset]);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
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
  // Sử dụng useMemo để tránh tạo object mới. Ví dụ khi nhập thêm nội dung content => state thay đổi => component re-render thì object modules tạo mới
  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image']
    ],
    imageUploader: {
      upload: async (file) => {
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        const response = await axios({
          method: "post",
          url: imgbbAPI,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        return response.data.data.url;
      }
    }
  }), [])

  if(!id) return null;
  return (
    <>
      <DashboardHeading title='Update Post' desc='Update post content' />
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
        <div className="">
          <Label>Content</Label>
          <div className="w-full entry-content">
            <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent} />
          </div>
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
          Update
        </Button>
      </form>
    </>
  )
}

export default PostUpdate
