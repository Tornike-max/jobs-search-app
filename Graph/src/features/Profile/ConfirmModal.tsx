import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import {
  HiOutlineDevicePhoneMobile,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";

import { Link } from "react-router-dom";
import { useUpdateUser } from "../../hooks/authHooks/useUpdateUser";

interface OpenTypes {
  isOpen: boolean;
  onOpen?: () => void;
  onOpenChange: () => void;
  title: string;
  email?: string;
  phone?: string;
  userId?: string;
}

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  title,
  email,
  userId,
  phone,
}: OpenTypes) {
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useUpdateUser();

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) {
      const newData = {
        email,
        password,
        userId,
      };
      mutate(newData);
    } else {
      const newData = {
        phone,
        password,
      };
      mutate(newData);
    }
  }
  return (
    <>
      <Modal
        backdrop="opaque"
        className="mx-6"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <form onSubmit={handleChange}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      email ? (
                        <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      ) : (
                        <HiOutlineDevicePhoneMobile className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      )
                    }
                    label={email ? "Email" : "Phone Number"}
                    placeholder="Enter your email"
                    disabled={email || phone ? true : false}
                    value={email ? email : phone}
                    variant="bordered"
                  />
                  <Input
                    endContent={
                      <HiOutlineLockClosed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex py-2 px-1 justify-end">
                    <Link className="text-indigo-500" color="primary" to="/">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    color="primary"
                    onPress={onClose}
                  >
                    Change
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
