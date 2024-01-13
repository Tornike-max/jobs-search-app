import { Textarea } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";
import SmallSpinner from "./SmallSpinner";
import { useUserContext } from "../context/useUserContext";
import { useUpdateBio } from "../hooks/authHooks/useUpdateBio";
import { useDarkMode } from "../context/useDarkMode";

interface LinksType {
  bio: string;
}

export default function AddBioModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addBio, isBioAdding } = useUpdateBio();
  const { isDark } = useDarkMode();

  const { user } = useUserContext();

  const { register, handleSubmit } = useForm<LinksType>();
  const onSubmit: SubmitHandler<LinksType> = (data) => {
    console.log(data);
    if (!data) {
      toast.error("No Data");
    }
    const newData = {
      userId: user.id,
      bio: data?.bio,
    };

    addBio(newData);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-br ${
              !isDark
                ? "from-primary-600 to-primary-700 text-white"
                : "from-primary-600 to-primary-700 text-white"
            }  p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden`}
          >
            <GrAddCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <GrAddCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Add You Bio
              </h3>
              <div className="w-full">
                <form
                  className="w-full flex flex-col gap-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Textarea
                      color="secondary"
                      type="text"
                      variant="bordered"
                      placeholder="Add your bio"
                      {...register("bio")}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={isBioAdding}
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      უკან დაბრუნება
                    </button>
                    <button
                      disabled={isBioAdding}
                      type="submit"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-stone-300 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      {isBioAdding ? <SmallSpinner /> : "განაახლე"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
