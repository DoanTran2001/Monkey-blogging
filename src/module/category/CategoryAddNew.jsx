import Button from "components/button/Button";
import Radio from "components/custom/Radio";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { db } from "firebase-app/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { status } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const handleAddNewCategory = async (values) => {
    if(!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.slug || newValues.name, { lower: true }); // tạo slug
    newValues.status = Number(newValues.status); // Ép kiểu của status về Number
    // console.log(newValues);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading title="New category" desc="Add new category" />
      <form action="" onSubmit={handleSubmit(handleAddNewCategory)}>
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
        <Button className="mx-auto" type="submit" kind="primary" isLoading={isSubmitting} disabled={isSubmitting}>
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
