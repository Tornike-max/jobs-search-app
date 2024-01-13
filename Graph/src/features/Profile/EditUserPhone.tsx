import { Input, useDisclosure } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useDarkMode } from "../../context/useDarkMode";

interface IEditPhone {
  phone: string;
}

export default function EditUserName({ phone }: IEditPhone) {
  const { isDark } = useDarkMode();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditPhone>();

  const onsubmit: SubmitHandler<IEditPhone> = (data) => {
    console.log(data);
    setPhoneNumber(data.phone);
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
            type="text"
            variant="bordered"
            label="Your Phone Number"
            placeholder="+995 - "
            isInvalid={errors.phone ? true : false}
            color={errors.phone ? "danger" : "default"}
            errorMessage={errors.phone && errors.phone.message}
            defaultValue={phone || "+995"}
            {...register("phone", {
              required: true,
            })}
          />
        </div>
      </form>
      <ConfirmModal
        phone={phoneNumber}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Are you sure you want to change Phone Number?"
      />
    </div>
  );
}
