import { Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";
import { useAddUrl } from "../hooks/authHooks/useAddUrl";
import SmallSpinner from "./SmallSpinner";
import { useUserContext } from "../context/useUserContext";
import { useDarkMode } from "../context/useDarkMode";

interface LinksType {
  instagramUrl: string;
  linkedinUrl: string;
}

export default function AddLinksModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUserContext();
  const { isDark } = useDarkMode();
  const { addLink, isLinkAdding } = useAddUrl();
  const { register, handleSubmit } = useForm<LinksType>();
  const onSubmit: SubmitHandler<LinksType> = (data) => {
    if (!data) {
      toast.error("No Data");
    }
    const newLinkData = {
      instagramUrl: data.instagramUrl,
      linkedinUrl: data.linkedinUrl,
      userId: user.id,
    };
    addLink(newLinkData);
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
                Add New Link
              </h3>
              <div className="w-full">
                <form
                  className="w-full flex flex-col gap-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Input
                      color="secondary"
                      type="url"
                      variant="bordered"
                      placeholder="Instagram Url"
                      {...register("instagramUrl")}
                    />
                  </div>
                  <div>
                    <Input
                      color="secondary"
                      type="url"
                      variant="bordered"
                      placeholder="Linkedin Url"
                      {...register("linkedinUrl")}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={isLinkAdding}
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Nah, go back
                    </button>
                    <button
                      disabled={isLinkAdding}
                      type="submit"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-stone-300 transition-colors text-stone-200 font-semibold w-full py-2 rounded"
                    >
                      {isLinkAdding ? <SmallSpinner /> : "დაამატე ლინკი"}
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
