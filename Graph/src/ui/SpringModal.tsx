import { Avatar } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import LikesCounter from "./LikesCounter";
import { Models } from "appwrite";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { formatDate } from "./formatDate";

export const SpringModal = ({
  imgUrl,
  isOpen,
  setIsOpen,
  post,
  creatorImageUrl,
}: {
  imgUrl: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post?: Models.Document;
  creatorImageUrl?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-gray-800 bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="text-white bg-stone-800 w-full max-w-5xl overflow-hidden flex justify-center items-center mx-10 rounded-md"
          >
            <div className="w-full flex flex-col justify-center items-center lg:flex-row">
              <div className="w-full lg:w-1/2 flex justify-center items-center relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 left-4 z-10 flex justify-center items-center rounded-full bg-stone-100"
                >
                  <span className="text-primary-600">
                    <HiOutlineXMark />
                  </span>
                </button>
                <img
                  className="w-full h-[510px] rounded-tl-md rounded-bl-md "
                  src={imgUrl}
                  alt="profile image"
                />
              </div>

              {/* Comments section on the right */}
              <div className="w-full lg:w-1/2">
                <div className="max-h-[510px] lg:h-[510px] w-full overflow-y-auto bg-stone-100 text-stone-800 py-6 rounded-tr-md rounded-br-md ">
                  {/* User Information */}
                  <div className="flex items-start justify-center flex-col gap-4 text-xs">
                    <Link
                      to={`/account/${
                        (post && post.creator.accountId) ||
                        (post && post.accoundId)
                      }`}
                      className="flex justify-start items-center text-xs"
                    >
                      <Avatar
                        className="mx-6"
                        isBordered
                        src={creatorImageUrl}
                      />
                      <div className="flex flex-col">
                        <p>{post && post.creator.username}</p>
                        <span>{post && post.creator.email}</span>
                        <span>{post && formatDate(post.$createdAt)}</span>
                      </div>
                    </Link>

                    <div className="text-xs">
                      <p className="px-6">
                        We will mark the seventh anniversary of Graham Taylor’s
                        passing with the ‘Graham Taylor Matchday’ against
                        Chesterfield this Saturday. 💛 Supporters are invited to
                        come along and continue tradition by raising their
                        scarves before kick-off to pay tribute to the great man.
                        🧣
                      </p>
                    </div>

                    {/* LikesCounter */}
                    <div className="flex justify-center items-center w-full px-6">
                      <LikesCounter
                        documentId={(post && post.$id) || ""}
                        post={post && post}
                        userId={post && post.creator.$id}
                      />
                    </div>
                    {/* Comments */}
                    <div className="flex justify-center items-center w-full px-6">
                      <Comments
                        userId={post?.$id}
                        post={post}
                        postId={post && post.$id}
                        postCreatorImg={creatorImageUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
