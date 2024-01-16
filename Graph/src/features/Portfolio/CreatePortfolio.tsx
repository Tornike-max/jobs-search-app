// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowLeft, HiOutlinePhoto } from "react-icons/hi2";
import { useCreatePortfolio } from "../../hooks/portfolioHooks/useCreatePortfolio";
import SmallSpinner from "../../ui/SmallSpinner";
import { Models } from "appwrite";

interface PortfolioTypes {
  caption: string;
  location: string;
  tags: string[];
  imageUrl: string;
  file: File;
}

interface CreatePortfolioProps {
  userData?: Models.Document; // Adjust Document with your actual type
}
export default function CreatePortfolio({ userData }: CreatePortfolioProps) {
  const { create, isCreating } = useCreatePortfolio();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PortfolioTypes>();
  const files = watch("file");

  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    // Update form values with dropped file
    setValue("file", acceptedFiles[0]); // Assuming you want to handle only one file
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg, image/svg",
  });

  const onSubmit: SubmitHandler<PortfolioTypes> = (data) => {
    const image = data?.file;
    const newData = {
      location: data.location,
      tags: data.tags,
      caption: data.caption,
      image,
      userId: userData?.$id || "",
    };

    create(newData);
  };

  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col gap-8 ">
      <h1 className="font-semibold text-xl sm:text-3xl text-indigo-500">
        Create Portfolio
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-[500px] w-full"
      >
        <div className="flex justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            color="default"
            type="button"
            variant="ghost"
          >
            <span>
              <HiOutlineArrowLeft />
            </span>
            Go Back
          </Button>
          <h1 className="text-2xl font-bold text-indigo-500 font-serif">
            {"Create Post"}
          </h1>
        </div>

        <div className="flex flex-col">
          <label className="text-slate-600 font-medium mb-1">Caption</label>
          <textarea
            className="bg-slate-200 hover:bg-slate-300 duration-150 transition-all rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("caption", {
              required: "This field is required",
            })}
          />
          {errors?.caption?.message && (
            <p className="text-red-500">{errors?.caption?.message}</p>
          )}
        </div>

        <div
          {...getRootProps()}
          className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
        >
          <input {...getInputProps()} className="cursor-pointer" />
          {isDragActive ? (
            <div>
              {files &&
                files?.map((file: { imageUrl: string | undefined }) => (
                  <img src={file.imageUrl} />
                ))}
            </div>
          ) : (
            <div className="max-w-[500px] w-full rounded-md py-16 px-10 flex flex-col justify-center items-center space-y-2">
              <span className="flex justify-center items-center">
                <HiOutlinePhoto className="text-indigo-400 sm:w-28 sm:h-28 w-20 h-20" />
              </span>
              <h3 className="text-indigo-600 font-medium text-base sm:text-lg">
                Drag Photo Here
              </h3>
              <p className="text-indigo-400 font-normal text-sm sm:text-base">
                SVG, PNG, JPEG
              </p>

              <Button color="primary" variant="ghost">
                Select from computer
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-slate-600 font-medium mb-1">
            Add Tags (Separated by comma " , ")
          </label>
          <input
            className="bg-slate-200 hover:bg-slate-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="TS,NextJs,React"
            {...register("tags", {
              required: "This field is required",
            })}
          />
          {errors?.tags?.message && (
            <p className="text-red-500">{errors?.tags?.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-slate-600 font-medium mb-1">Location</label>
          <input
            className="bg-slate-200 hover:bg-slate-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            {...register("location", {
              required: "This field is required",
            })}
          />
          {errors?.location?.message && (
            <p className="text-red-500">{errors?.location?.message}</p>
          )}
        </div>

        <Button
          disabled={isCreating}
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-slate-100"
        >
          {isCreating ? <SmallSpinner /> : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
