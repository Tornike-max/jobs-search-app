import { Button, Chip, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InewUser } from "../../types/types";

import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/authHooks/useSignup";
import SmallSpinner from "../../ui/SmallSpinner";
import { useLogin } from "../../hooks/authHooks/useLogin";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/useUserContext";

export default function SignupForm() {
  const { signup, isRegistring } = useSignup();
  const { login, isLogingin } = useLogin();
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<InewUser>();

  const validateEmail = (value: string): boolean | string => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    return isValid ? true : "Invalid email address";
  };

  const onSubmit: SubmitHandler<InewUser> = async (data) => {
    try {
      console.log("here");

      const user = {
        email: data.email,
        password: data.password,
        name: data.name,
      };

      console.log(user);
      const newUser = await signup(user);

      if (!newUser) {
        console.log("არ არის იუზერი");
        toast.error("Can't sign up");
      }

      const session = await login({
        email: data.email,
        password: data.password,
      });

      if (!session) {
        console.log("სესია არ არის და ვერ შევიდა აკაუნტზე");
        toast.error("Can't sign in");
      }

      const isLoggedIn = await checkAuthUser();
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
            შექმენი აკაუნტი
          </Chip>
          <span className="text-slate-200 font-semibold text-sm">
            იმისთვის, რომ გამოიყენოთ აპლიკაცია, გთხოვთ შეიყვანეთ მონაცემები
          </span>
        </div>

        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4  px-4">
          <Input
            type="text"
            variant="bordered"
            label="მომხმარებლის სახელი"
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
            label="ელ-ფოსტა"
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
            უკვე გაქვთ ანგარიში?, დააჭირეთ{" "}
            <Link className="text-indigo-500 font-semibold" to="/login">
              აქ
            </Link>
          </p>
          <Button
            color="primary"
            variant="shadow"
            disabled={isRegistring}
            type="submit"
          >
            {isRegistring || isLogingin ? <SmallSpinner /> : "რეგისტრაცია"}
          </Button>
        </div>
      </form>
    </div>
  );
}
