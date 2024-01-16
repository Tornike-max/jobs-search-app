import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { HiPublicationType, ICompany, IUser } from "../../types/types";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useCreateJob } from "../../hooks/jobHooks/useCreateJob";
import SmallSpinner from "../../ui/SmallSpinner";
import {
  categories,
  georgianRegions,
  methods,
  vacancyTypes,
} from "../../constants";

export default function PubSteps({
  user,
  company,
  increase,
  decline,
  step,
}: {
  user: IUser;
  company: ICompany;
  increase: () => void;
  decline: () => void;
  step: number;
}) {
  const navigate = useNavigate();
  const { isJobsPending, createJobs } = useCreateJob();
  const [method, setMethod] = useState("");
  const [category, setCategory] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [location, setLocation] = useState("");

  const { publicationType } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HiPublicationType>();

  const onSubmit: SubmitHandler<HiPublicationType> = (data) => {
    if (!data) return;
    const newJob = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      caption: data.caption,
      description: data.description,
      salary: Number(data.salary),
      paymentMethod: method,
      category: category,
      identicalCode: data.identicalCode,
      location: location,
      vacancytype: vacancy,
      users: user.id,
      companies: company.id,
      price: Number(publicationType === "Standart" ? 22 : 32),
    };
    createJobs(newJob, {
      onSuccess: () => {
        navigate("/vacancies");
      },
    });
  };

  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center">
      <form
        className="max-w-2xl w-full flex justify-center items-center flex-col gap-4 px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 0 && (
          <>
            <Input
              className="w-full shadow-md"
              variant="bordered"
              color={errors.name ? "danger" : "default"}
              errorMessage={errors.name && "Name is required"}
              label="კომპანიის სახელი"
              placeholder="შეიყვანეთ კომპანიის სახელი"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              className="w-full shadow-md"
              variant="bordered"
              label="კომპანიის იმეილი"
              color={errors.email ? "danger" : "default"}
              errorMessage={errors.email && "Please enter a valid email"}
              placeholder="საკონტაქტო იმეილი"
              {...register("email", {
                required: true,
              })}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Input
              className="w-full shadow-md"
              variant="bordered"
              label="პირადი ნომერი"
              color={errors.identicalCode ? "danger" : "default"}
              errorMessage={
                errors.identicalCode && "Identical code is required"
              }
              placeholder="ჩაწერეთ პირადი ნომერი"
              {...register("identicalCode", {
                required: true,
              })}
            />
            <Input
              className="w-full shadow-md"
              variant="bordered"
              label="ტელეფონი"
              placeholder="+995"
              color={errors.phone ? "danger" : "default"}
              errorMessage={errors.phone && "Number is required"}
              {...register("phone", {
                required: true,
              })}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Textarea
              className="w-full shadow-md"
              variant="bordered"
              label="სათაური"
              color={errors.caption ? "danger" : "default"}
              errorMessage={errors.caption && "caption is required"}
              placeholder="სათაური"
              {...register("caption", {
                required: true,
              })}
            />
            <Textarea
              className="w-full shadow-md"
              variant="bordered"
              label="აღწერა"
              placeholder="სამუშაოს აღწერილობა"
              color={errors.description ? "danger" : "default"}
              errorMessage={errors.description && "description is required"}
              {...register("description", {
                required: true,
              })}
            />

            <Input
              className="w-full shadow-md"
              variant="bordered"
              label="ხელფასი"
              type="number"
              color={errors.salary ? "danger" : "default"}
              errorMessage={errors.salary && "Something went wrong"}
              endContent={
                <HiOutlineCurrencyDollar className="text-primary-600" />
              }
              placeholder="ხელფასი"
              {...register("salary")}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Select
              label="გადახდის მეთოდი"
              placeholder="აირჩიე გადახდის მეთოდი"
              className="w-full shadow-md"
              variant="flat"
              onChange={(e) => setMethod(e.target.value)}
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
              className="w-full shadow-md"
              variant="flat"
              onChange={(e) => setCategory(e.target.value)}
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
              className="w-full shadow-md"
              variant="flat"
              onChange={(e) => setVacancy(e.target.value)}
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
              className="w-full shadow-md"
              variant="flat"
              onChange={(e) => setLocation(e.target.value)}
            >
              {georgianRegions.map((category: string) => (
                <SelectItem value={category} key={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
          </>
        )}
        {step === 4 && (
          <div className="w-full space-y-2">
            <div className="w-full flex justify-start items-end flex-col">
              <span>
                გადასახდელი თანხა: {publicationType === "Standart" ? 20 : 30}₾
              </span>
              <span>მომსახურების საკომისიო: {2}₾</span>
              <span>
                სულ: {publicationType === "Standart" ? 20 + 2 : 30 + 2}
              </span>
            </div>
            <Button
              className="w-full"
              type="submit"
              variant="ghost"
              color="primary"
              disabled={isJobsPending}
              size="lg"
            >
              {isJobsPending ? <SmallSpinner /> : "გამოქვეყნება"}
            </Button>
          </div>
        )}
        <div className="w-full flex justify-end items-center gap-2">
          <Button variant="ghost" color="primary" onClick={decline}>
            <span>
              <HiOutlineArrowLeft />
            </span>
            უკან
          </Button>
          {step !== 4 && (
            <Button variant="ghost" color="primary" onClick={increase}>
              წინ
              <span>
                <HiOutlineArrowRight />
              </span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
