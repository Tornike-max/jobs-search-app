import { Input, Textarea } from "@nextui-org/react";
import { DrawOutlineButton } from "../../ui/DrawOutlineButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactType } from "../../types/types";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDarkMode } from "../../context/useDarkMode";

export default function Contact() {
  const { isDark } = useDarkMode();
  const { register, handleSubmit, reset } = useForm<ContactType>();
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit: SubmitHandler<ContactType> = (data) => {
    const sendData = {
      email: data.email,
      name: data.name,
      description: data.description,
    };

    emailjs
      .sendForm(
        "service_9alk9nk",
        "template_qragque",
        form.current as HTMLFormElement,
        "a_KAVZ376pxPQeNDY"
      )
      .then(
        (result) => {
          toast.success("Email sent Successfully ✅");
          console.log(result);
        },
        (error) => {
          toast.error("Error while sent email ❌");
          console.log(error.text);
        }
      );
    reset();
    console.log(sendData);
  };
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col px-20">
      <h1
        className={`text-3xl ${
          !isDark ? "text-stone-200" : "text-primary-600 "
        } font-semibold text-center w-full my-10`}
      >
        დაგვიკავშირდით
      </h1>
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl w-full flex justify-center items-center flex-col gap-6"
      >
        <Input
          variant="faded"
          color="primary"
          placeholder="სრული სახელი"
          {...register("name", {
            required: "მოცემული ველი სავალდებულოა",
          })}
        />
        <Input
          variant="faded"
          color="primary"
          placeholder="ელ-ფოსტა"
          {...register("email", {
            required: "მოცემული ველი სავალდებულოა",
          })}
        />
        <Textarea
          variant="faded"
          color="primary"
          placeholder="შეტყობინება"
          size="lg"
          {...register("description", {
            required: "მოცემული ველი სავალდებულოა",
          })}
        />
        <div className="w-full flex justify-end items-center">
          <div
            typeof="button"
            className="grid rounded-lg hover:rounded-none duration-400 place-content-center bg-slate-300 "
          >
            <DrawOutlineButton>გაგზავნა</DrawOutlineButton>
          </div>
        </div>
      </form>
    </div>
  );
}
