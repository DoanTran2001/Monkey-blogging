import Button from "components/button/Button";
import Radio from "components/custom/Radio";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { db } from "firebase-app/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { status } from "utils/constants";

function CategoryUpdate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { control, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {

    }
  })
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    console.log(values);
    const colRef = doc(db, "categories", categoryId);
    values.status = Number(values.status);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    })
    toast.success("Update category successfully");
    navigate("/manage/category");
  }
  useEffect(() => {
    async function fetData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef); // Lấy dữ liệu trong db dựa theo id của category
      reset(singleDoc.data()); // reset về trạng thái dữ liệu mà ta nhận được
    }
    fetData();
  }, [categoryId, reset]);
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update Category"
        desc={`Update your category id: ${categoryId}`}
      />
      
      <form action="" onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === status.APPROVED}
                value={status.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === status.UNAPPROVED}
                value={status.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          className="mx-auto"
          type="submit"
          kind="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
}

export default CategoryUpdate;
