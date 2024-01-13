import { Input, useDisclosure } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { useUserContext } from "../../context/useUserContext";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import Loader from "../../ui/Loader";
import { useDarkMode } from "../../context/useDarkMode";

interface IEditEmail {
  email: string;
}

export default function EditEmail() {
  const { isDark } = useDarkMode();

  const { user } = useUserContext();
  const userFromDB = useGetUserFromDB(user?.accountId);
  const userData = userFromDB?.userData;
  const isUserPending = userFromDB?.isUserPending;

  const [Email, setEmail] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditEmail>();

  if (isUserPending) return <Loader color="primary" />;

  console.log(userData);
  const onsubmit: SubmitHandler<IEditEmail> = (data) => {
    setEmail(data.email);
    onOpen();
  };
  return (
    <div className="flex justify-center items-center flex-col max-w-5xl w-full ">
      <form
        onBlur={handleSubmit(onsubmit)}
        className="max-w-2xl w-full px-8 flex flex-col justify-center gap-4"
      >
        <div>
          <Input
            className={`${!isDark ? "text-stone-200" : "text-stone-700"}`}
            type="email"
            variant="bordered"
            label="Your Email"
            isInvalid={errors.email ? true : false}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email && errors.email.message}
            defaultValue={user?.email}
            {...register("email", {
              required: true,
            })}
          />
        </div>
      </form>
      <ConfirmModal
        userId={userData?.$id}
        email={Email}
        title={"Are you sure you want to change Email"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
