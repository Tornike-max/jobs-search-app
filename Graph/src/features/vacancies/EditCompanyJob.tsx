import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowLeft, HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
  methods,
  categories,
  vacancyTypes,
  georgianRegions,
} from "../../constants";
import { HiOutlinePubType } from "../../types/types";
import { Models } from "appwrite";
import { useUpdateJob } from "../../hooks/jobHooks/useUpdateJob";
import SmallSpinner from "../../ui/SmallSpinner";
import { useUserContext } from "../../context/useUserContext";
import { useDarkMode } from "../../context/useDarkMode";
import { useNavigate } from "react-router-dom";

export default function EditCompanyJob({
  editedData,
}: {
  editedData?: Models.Document | HiOutlinePubType;
}) {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const { editData, isDataEditing } = useUpdateJob();
  const { company } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HiOutlinePubType>();

  const onSubmit: SubmitHandler<HiOutlinePubType> = (data) => {
    const updatedData = {
      name: data.name,
      email: data.email,
      identicalCode: data.identicalCode,
      phone: data.phone,
      caption: data.caption,
      description: data.description,
      salary: Number(data.salary),
      paymentMethod: data.paymentMethod,
      category: data.category,
      vacancytype: data.vacancytype,
      location: data.location,
      companies: company.id,
      price: editedData?.price,
      users: "",
    };
    editData(updatedData);
  };

  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col duration-150 transition-all">
      <div className="w-full text-start px-10">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
          variant="ghost"
          color="primary"
        >
          <HiOutlineArrowLeft />
          <span>უკან</span>
        </Button>
      </div>
      <div className="w-full text-center pb-6">
        <h1
          className={`text-xl sm:text-3xl ${
            !isDark ? "text-stone-200" : "text-primary-600"
          }  font-semibold`}
        >
          შეასწორე შენი განცხადება
        </h1>
      </div>
      <form
        className="max-w-2xl w-full flex justify-center items-center flex-col gap-4 px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          color={errors.name ? "danger" : "default"}
          errorMessage={errors.name && "Name is required"}
          label="კომპანიის სახელი"
          placeholder="შეიყვანეთ კომპანიის სახელი"
          defaultValue={editedData?.name}
          {...register("name", {
            required: true,
          })}
        />

        <Input
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="კომპანიის იმეილი"
          color={errors.email ? "danger" : "default"}
          errorMessage={errors.email && "Please enter a valid email"}
          placeholder="საკონტაქტო იმეილი"
          defaultValue={editedData?.email}
          {...register("email", {
            required: true,
          })}
        />

        <Input
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="პირადი ნომერი"
          color={errors.identicalCode ? "danger" : "default"}
          errorMessage={errors.identicalCode && "Identical code is required"}
          placeholder="ჩაწერეთ პირადი ნომერი"
          defaultValue={editedData?.identicalCode}
          {...register("identicalCode")}
        />
        <Input
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="ტელეფონი"
          placeholder="+995"
          color={errors.phone ? "danger" : "default"}
          errorMessage={errors.phone && "Number is required"}
          defaultValue={editedData?.phone}
          {...register("phone")}
        />

        <Textarea
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="სათაური"
          color={errors.caption ? "danger" : "default"}
          errorMessage={errors.caption && "caption is required"}
          placeholder="სათაური"
          defaultValue={editedData?.caption}
          {...register("caption", {
            required: true,
          })}
        />
        <Textarea
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="აღწერა"
          placeholder="სამუშაოს აღწერილობა"
          color={errors.description ? "danger" : "default"}
          errorMessage={errors.description && "description is required"}
          defaultValue={editedData?.description}
          {...register("description", {
            required: true,
          })}
        />

        <Input
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="bordered"
          label="ხელფასი"
          type="number"
          color={errors.salary ? "danger" : "default"}
          errorMessage={errors.salary && "Something went wrong"}
          endContent={<HiOutlineCurrencyDollar className="text-primary-600" />}
          defaultValue={editedData?.salary}
          placeholder="ხელფასი"
          {...register("salary")}
        />

        <Select
          label="გადახდის მეთოდი"
          placeholder="აირჩიე გადახდის მეთოდი"
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="flat"
          defaultSelectedKeys={
            editedData?.paymentMethod ? [editedData.paymentMethod] : []
          }
          {...register("paymentMethod")}
        >
          {methods.map((method: string) => (
            <SelectItem value={method} key={method}>
              {method}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="კატეგორია"
          placeholder="აირჩიე კატეგორია"
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="flat"
          defaultSelectedKeys={
            editedData?.category ? [editedData.category] : []
          }
          {...register("category")}
        >
          {categories.map((category: string) => (
            <SelectItem value={category} key={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="ვაკანსიის ტიპი"
          placeholder="აირჩიე ვაკანსიის ტიპი"
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="flat"
          defaultSelectedKeys={
            editedData?.vacancytype ? [editedData.vacancytype] : []
          }
          {...register("vacancytype")}
        >
          {vacancyTypes.map((type: string) => (
            <SelectItem value={type} key={type}>
              {type}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="ლოკაცია"
          placeholder="აირჩიე ლოკაცია"
          className={`w-full shadow-md ${!isDark ? "text-stone-200" : ""}`}
          variant="flat"
          defaultSelectedKeys={
            editedData?.location ? [editedData.location] : []
          }
          {...register("location")}
        >
          {georgianRegions.map((category: string) => (
            <SelectItem value={category} key={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

        <div className="w-full space-y-2">
          <Button
            className="w-full"
            type="submit"
            variant="ghost"
            color="primary"
            disabled={isDataEditing}
            size="lg"
          >
            {isDataEditing ? <SmallSpinner /> : "შესწორება"}
          </Button>
        </div>
      </form>
    </div>
  );
}
