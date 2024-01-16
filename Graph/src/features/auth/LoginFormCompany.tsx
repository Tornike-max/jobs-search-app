import { Button } from "@nextui-org/button";
import { Chip, Input } from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { IlogInUser } from "../../types/types";

// import SmallSpinner from "../../ui/SmallSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/authHooks/useLogin";
import SmallSpinner from "../../ui/SmallSpinner";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/useUserContext";
// import { useLogin } from "../../hooks/authHooks/useLogin";

export default function LoginFormCompany() {
  const { checkAuthCompany } = useUserContext();
  const navigate = useNavigate();
  const { login, isLogingin } = useLogin();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IlogInUser>();

  const validateEmail = (value: string): boolean | string => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    return isValid ? true : "Invalid email address";
  };

  const onSubmit: SubmitHandler<IlogInUser> = async (data) => {
    if (!data) return;
    const user = {
      email: data.email,
      password: data.password,
    };
    const session = await login(user);

    if (!session) {
      toast.error("Error while login");
    }
    const isLogedIn = await checkAuthCompany();
    if (isLogedIn) {
      reset();
      navigate("/");
    } else {
      toast.error("Error while login");
    }
  };
  return (
    <div className="max-w-[1920px] flex justify-center bg-primary-900 items-center h-screen">
      <div className="w-full h-screen shadow-2xl hidden md:flex justify-center items-center">
        <img src="vite.svg" className="w-96 h-96" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-20 md:mx-6 flex justify-center items-center  flex-col my-14"
      >
        <div className="flex justify-center items-center flex-col mb-2">
          <Chip
            variant="shadow"
            color="primary"
            className="text-xl sm:text-2xl font-semibold py-4"
            size="lg"
          >
            შექმენით კომპანიის აკაუნტი
          </Chip>
          <span className="text-slate-200 font-semibold py-2 text-xs text-center">
            იმისთვის, რომ გამოიყენოთ აპლიკაცია, გთხოვთ შეიყვანეთ მონაცემები
          </span>
        </div>

        <div className="flex w-full flex-wrap mb-6 md:mb-4 gap-4  px-4">
          <Input
            type="email"
            variant="bordered"
            label="კომპანიის იმეილი"
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
            className="bg-none text-stone-200"
            color={errors.password?.message ? "danger" : "primary"}
            errorMessage={errors.password?.message && errors.password.message}
            {...register("password", {
              required: "This Field Is Required",
            })}
          />
        </div>

        <div className="w-full px-4 gap-2 flex justify-center items-end flex-col">
          <p className="text-white text-xs">
            თუ თქვენ არ გაქვთ აკაუნტი, გთხოვთ დააჭირეთ{" "}
            <Link className="text-indigo-500 font-semibold" to="/signup">
              აქ
            </Link>
          </p>
          <Button
            color="primary"
            variant="shadow"
            disabled={isLogingin}
            type="submit"
          >
            {isLogingin ? <SmallSpinner /> : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}
