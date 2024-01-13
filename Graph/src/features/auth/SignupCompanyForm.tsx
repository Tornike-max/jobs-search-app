import { Button, Chip, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InewCompany } from "../../types/types";

import { Link, useNavigate } from "react-router-dom";
import SmallSpinner from "../../ui/SmallSpinner";
import { useLogin } from "../../hooks/authHooks/useLogin";
import toast from "react-hot-toast";
import { useCreateCompanyAcc } from "../../hooks/authHooks/useCreateCompanyAcc";
import { useUserContext } from "../../context/useUserContext";

export default function SignupCompanyForm() {
  const { createCompany, isCompanyCreating } = useCreateCompanyAcc();
  const { isLogingin } = useLogin();
  const navigate = useNavigate();
  const { checkAuthCompany } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<InewCompany>();

  const validateEmail = (value: string): boolean | string => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    return isValid ? true : "Invalid email address";
  };

  const onSubmit: SubmitHandler<InewCompany> = async (data) => {
    try {
      console.log(data);
      const newCompany = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const newCopanyAcc = await createCompany(newCompany);

      if (!newCopanyAcc) {
        toast.error("Can't sign up");
      }

      const isLoggedIn = await checkAuthCompany();
      if (isLoggedIn) {
        reset();
        navigate("/");
      } else {
        toast.error("Sign Up Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1920px] flex justify-center bg-primary-900 items-center">
      <div className="w-full h-screen shadow-2xl hidden md:flex justify-center items-center">
        <img src="vite.svg" className="w-96 h-96" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex mx-20 md:mx-6 justify-center items-center flex-col my-10"
      >
        <div className="flex justify-center items-center flex-col gap-2 mb-4">
          <Chip
            variant="shadow"
            color="primary"
            className="text-3xl font-semibold py-4"
            size="lg"
          >
            შექმენით კომპანიის აკაუნტი
          </Chip>
          <span className="text-slate-200 font-semibold text-sm">
            იმისთვის, რომ გამოიყენოთ აპლიკაცია, გთხოვთ შეიყვანეთ მონაცემები
          </span>
        </div>

        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4  px-4">
          <Input
            type="text"
            variant="bordered"
            label="კომპანიის სახელი"
            color={errors.name?.message ? "danger" : "primary"}
            className="bg-none text-stone-200"
            errorMessage={errors.name?.message && errors.name.message}
            {...register("name", {
              required: "This Field Is Required",
            })}
          />
        </div>
        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4  px-4">
          <Input
            type="email"
            variant="bordered"
            label="კომპანიის ელ-ფოსტა"
            color={errors.email?.message ? "danger" : "primary"}
            className="bg-none text-stone-200"
            errorMessage={errors.email?.message && errors.email.message}
            {...register("email", {
              required: "This Field Is Required",
              validate: (value: string) => validateEmail(value),
            })}
          />
        </div>
        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4  px-4">
          <Input
            type="password"
            variant="bordered"
            label="პაროლი"
            color={errors.password?.message ? "danger" : "primary"}
            className="bg-none text-stone-200"
            errorMessage={errors.password?.message && errors.password.message}
            {...register("password", {
              required: "This Field Is Required",
            })}
          />
        </div>
        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4 px-4">
          <Input
            type="password"
            variant="bordered"
            label="გაიმეორეთ პაროლი"
            color={errors.password2?.message ? "danger" : "primary"}
            className="bg-none text-stone-200"
            errorMessage={errors.password2?.message && errors.password2.message}
            {...register("password2", {
              required: "This Field Is Required",
              validate: (value) =>
                getValues().password === value || "Passwords Should Match",
            })}
          />
        </div>

        <div className="w-full px-4 gap-2 flex justify-center items-end flex-col">
          <p className="text-white text-sm">
            უკვე გაქვთ შექმნილი ანგარიში?, დააკლიკეთ{" "}
            <Link className="text-indigo-500 font-semibold" to="/login">
              აქ
            </Link>
          </p>
          <Button
            color="primary"
            variant="shadow"
            disabled={isCompanyCreating}
            type="submit"
          >
            {isCompanyCreating || isLogingin ? <SmallSpinner /> : "რეგისტრაცია"}
          </Button>
        </div>
      </form>
    </div>
  );
}
