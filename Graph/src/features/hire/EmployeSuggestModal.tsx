import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Slider,
  Textarea,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrLocation } from "react-icons/gr";
import emailjs from "@emailjs/browser";

import {
  MdDateRange,
  MdOutlineDescription,
  MdOutlineEmail,
} from "react-icons/md";
import toast from "react-hot-toast";

interface MessageType {
  email: string;
  location: string;
  date: string;
  description: string;
  amount: string;
}

export default function EmployeSuggestModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const form = useRef<HTMLFormElement | null>(null);

  const [amount, setAmount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageType>();

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    const sendData = {
      email: data.email,
      location: data.location,
      date: data.date,
      description: data.description,
      amount: amount,
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="py-4"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary-600">
              წერილი აპლიკანტს
            </ModalHeader>
            <ModalBody>
              <form
                ref={form}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  autoFocus
                  endContent={
                    <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  color={errors.email ? "danger" : "default"}
                  errorMessage={
                    errors.email && "გთხოვთ შეიყვანეთ სწორი ელ-ფოსტა"
                  }
                  label="თქვენი ელ-ფოსტა"
                  placeholder="შეიყვანე ელ-ფოსტა"
                  variant="bordered"
                  {...register("email", {
                    required: "ელ-ფოსტა აუცილებელია",
                  })}
                />

                <Input
                  autoFocus
                  endContent={
                    <GrLocation className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  color={errors.location ? "danger" : "default"}
                  errorMessage={errors.location && "Please enter a valid email"}
                  label="ლოკაცია"
                  placeholder="შეიყვანეთ ლოკაცია"
                  variant="bordered"
                  {...register("location", {
                    required: "ლოკაცია აუცილებელია",
                  })}
                />

                <Textarea
                  autoFocus
                  endContent={
                    <MdOutlineDescription className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  color={errors.description ? "danger" : "default"}
                  errorMessage={
                    errors.description && "Please enter a valid email"
                  }
                  label="სამუშაოს აღწერა"
                  placeholder="შეიყვანე სამუშაო აღწერილობა"
                  variant="bordered"
                  {...register("description", {
                    required: "აღწერილობის მითითება აუცილებელია",
                  })}
                />

                <Input
                  type="date"
                  autoFocus
                  endContent={
                    <MdDateRange className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  color={errors.date ? "danger" : "default"}
                  errorMessage={errors.date && "Please enter a valid email"}
                  label="თარიღი"
                  placeholder="შეიყვანე თარიღი"
                  variant="bordered"
                  {...register("date", {
                    required: "თარიღის მითითება აუცილებელია",
                  })}
                />

                <input type="hidden" {...register("amount")} value={amount} />

                <Slider
                  label="თანხის შეთავაზება"
                  step={50}
                  minValue={0}
                  maxValue={5000}
                  defaultValue={100}
                  formatOptions={{ style: "currency", currency: "GEL" }}
                  className="max-w-md"
                  onChange={(value) => setAmount(parseFloat(value.toString()))}
                />

                <div className="w-full flex justify-end items-center gap-2 py-2">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    დახურვა
                  </Button>
                  <Button type="submit" color="primary">
                    გაგზავნა
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
