import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateUser } from "../../hooks/authHooks/useUpdateUser";
import Loader from "../../ui/Loader";
import { useUserContext } from "../../context/useUserContext";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import { useDarkMode } from "../../context/useDarkMode";

interface IEditName {
  name: string;
}

export default function EditUserName() {
  const { isDark } = useDarkMode();
  const { user } = useUserContext();
  const userFromDB = useGetUserFromDB(user?.accountId);
  const userData = userFromDB?.userData;
  const isUserPending = userFromDB?.isUserPending;

  const { isPending, mutate } = useUpdateUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditName>();

  if (isUserPending) return <Loader color="primary" />;
  console.log(userData);

  const onsubmit: SubmitHandler<IEditName> = (data) => {
    const newData = {
      userId: userData?.$id,
      name: data.name,
    };
    mutate(newData);
  };

  return (
    <div className="flex justify-center items-center max-w-5xl w-full ">
      <form
        onBlur={handleSubmit(onsubmit)}
        className="max-w-2xl w-full px-8 flex flex-col justify-center gap-4"
      >
        <div>
          <Input
            className={`${
              isPending || !isDark ? "text-stone-200" : "text-stone-700"
            }`}
            type="text"
            variant="bordered"
            label="Your Name"
            isInvalid={errors.name ? true : false}
            color={errors.name ? "danger" : "default"}
            errorMessage={errors.name && errors.name.message}
            defaultValue={user.name}
            {...register("name", {
              required: true,
            })}
          />
        </div>
      </form>
    </div>
  );
}
