import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdatePassword } from "../../hooks/authHooks/useUpdatePassword";
import { useDarkMode } from "../../context/useDarkMode";

interface IChangePassword {
  oldPassword: string;
  password: string;
  password2: string;
}

export default function ChangePassword() {
  const { isDark } = useDarkMode();
  const { isPasswordUpdating, updatePassword } = useUpdatePassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IChangePassword>();

  const onsubmit: SubmitHandler<IChangePassword> = (data) => {
    const newData = { password: data.password, oldPassword: data.oldPassword };
    updatePassword(newData);
    reset();
  };
  return (
    <div className="flex justify-center items-center max-w-5xl w-full flex-col my-4">
      <h1
        className={`w-full text-xl sm:text-xl ${
          !isDark ? "text-stone-200" : "text-indigo-500 "
        } font-medium flex items-center justify-center gap-1`}
      >
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="max-w-2xl w-full py-4 px-8 flex flex-col justify-center gap-4"
      >
        <div>
          <Input
            className={`${
              isPasswordUpdating || !isDark
                ? "text-stone-200"
                : "text-stone-700"
            }`}
            type="password"
            variant="bordered"
            label="Old Password"
            isInvalid={errors.oldPassword ? true : false}
            color={errors.oldPassword ? "danger" : "default"}
            errorMessage={errors.oldPassword && errors.oldPassword.message}
            {...register("oldPassword", {
              required: true,
            })}
          />
        </div>

        <div>
          <Input
            className={`${
              isPasswordUpdating || !isDark
                ? "text-stone-400"
                : "text-stone-700"
            }`}
            type="password"
            variant="bordered"
            label="New Password"
            isInvalid={errors.password ? true : false}
            color={errors.password ? "danger" : "default"}
            errorMessage={errors.password && errors.password.message}
            {...register("password", {
              required: true,
            })}
          />
        </div>

        <div>
          <Input
            className={`${
              isPasswordUpdating || !isDark
                ? "text-stone-400"
                : "text-stone-700"
            }`}
            type="password"
            variant="bordered"
            label="Confirm Password"
            isInvalid={errors.password2 ? true : false}
            color={errors.password2 ? "danger" : "default"}
            errorMessage={errors.password2 && errors.password2.message}
            {...register("password2", {
              required: true,
              validate: (value) =>
                value === getValues().password || "Passwords Should Match",
            })}
          />
        </div>
        <div className="w-full flex justify-end items-center gap-1">
          <Button
            type="reset"
            variant="flat"
            color={`${!isDark ? "primary" : "default"}`}
            className={`${!isDark ? "text-stone-200" : ""}`}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="ghost"
            color="primary"
            className={`${!isDark ? "text-stone-200" : ""}`}
          >
            შეცვალე პაროლი
          </Button>
        </div>
      </form>
    </div>
  );
}
