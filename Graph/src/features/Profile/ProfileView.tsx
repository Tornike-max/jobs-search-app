import { Button, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateBio } from "../../hooks/authHooks/useUpdateBio";
import SmallSpinner from "../../ui/SmallSpinner";
import { ChangeEvent, useRef, useState } from "react";
import { useChangeProfileImage } from "../../hooks/authHooks/useChangeProfileImage";
import { SpringModal } from "../../ui/SpringModal";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";

interface IBio {
  bio: string;
}

export default function ProfileView({ userData }: Models.Document) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: changeProfile, isPending: changing } =
    useChangeProfileImage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isBioAdding, addBio } = useUpdateBio();
  const { register, handleSubmit, reset } = useForm<IBio>();

  console.log(userData);
  const onSubmit: SubmitHandler<IBio> = (data) => {
    const newData = {
      userId: userData?.$id || "",
      bio: data.bio,
    };
    addBio(newData);
    reset();
  };

  const handleButtonClick = () => {
    fileInputRef?.current?.click?.();
  };

  // Function to handle file selection
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file);
      const newData = {
        userId: userData?.$id,
        file,
      };
      changeProfile(newData);
    }
  };

  function handleNavigate() {
    navigate("/createPortfolio");
  }

  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col rounded-md shadow-2xl pb-8">
      <div className="w-full flex justify-center items-center gap-1 flex-col relative">
        <div className="relative">
          <img
            className="w-full rounded-t-2xl relative"
            src="https://images.unsplash.com/photo-1592755775826-df05e39e48ed?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={userData?.name}
          />

          <div
            className={`absolute bottom-[-20%] lg:bottom-[-10%] left-1/2 transform translate-x-[-50%]`}
          >
            <img
              onClick={() => setIsOpen(true)}
              className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer hover:scale-105 duration-100 transition-all rounded-full"
              src={userData?.imageUrl}
            />
          </div>
        </div>
      </div>

      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imgUrl={userData?.imageUrl}
      />
      <div className="w-full items-center flex-col justify-start px-4 py-4">
        <h1 className="text-xl font-bold">{userData?.name}</h1>
        <span className="text-sm text-stone-600">{userData?.email}</span>
        <div className="w-full flex justify-start items-center py-2 gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event) => handleFileSelected(event)}
          />

          {/* Change Profile Image Button */}
          <Button
            disabled={changing}
            variant="shadow"
            color="primary"
            onClick={handleButtonClick}
          >
            {changing ? <SmallSpinner /> : "Change Profile Image"}
          </Button>

          <Button
            onClick={handleNavigate}
            disabled={changing}
            variant="shadow"
            color="primary"
          >
            {changing ? <SmallSpinner /> : "Create Portfolio"}
          </Button>
        </div>
      </div>
      <div className="w-full shadow-xl px-4 pb-4 flex flex-col gap-2">
        {userData?.bio && (
          <span className="text-sm text-stone-700 font-serif py-3 px-4 border-[1px] rounded-lg border-stone-200 hover:border-stone-300">
            {userData?.bio}
          </span>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder={userData?.bio ? "Change Your Bio" : "Add your bio"}
            variant="bordered"
            {...register("bio", {
              required: true,
            })}
          />
          <div className="w-full flex justify-end items-center py-2 gap-2">
            <Button type="reset" variant="faded" color="default">
              Clear
            </Button>
            <Button
              disabled={isBioAdding}
              type="submit"
              variant="shadow"
              color="primary"
            >
              {isBioAdding ? <SmallSpinner /> : "Add Bio"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
