import { Button, Input } from "@nextui-org/react";
import { Models } from "appwrite";
import { useState } from "react";
import { useComment } from "../hooks/home/useComment";
import SmallSpinner from "./SmallSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { formatDate } from "./formatDate";

export default function Comments({
  post,
  userId,
  postId,
  postCreatorImg,
}: {
  post?: Models.Document;
  postId?: string;
  userId?: string;
  postCreatorImg?: string;
}) {
  const navigate = useNavigate();
  const { user, company } = useUserContext();
  const { addComment, isCommentAdded } = useComment(postId || "");
  const [comment, setComment] = useState("");
  const getSession = localStorage.getItem("cookieFallback");

  function handleComment(e: React.MouseEvent) {
    e.preventDefault();
    if (!comment) return;
    const newComment = {
      userId: userId || "",
      postId: postId || "",
      comment,
    };
    addComment(newComment);
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <>
        {getSession?.includes("a_session_") ? (
          <>
            <div className="bt-[0.5px] border-stone-200 mt-2 flex items-center gap-1">
              <img
                className="rounded-full w-12 h-12 md:w-18 md:h-10"
                src={user.imageUrl || company.imageUrl}
                alt="user-image"
              />
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                variant="faded"
                size="sm"
              />
            </div>
            <div className="flex justify-start items-center px-14">
              <Button
                disabled={isCommentAdded}
                onClick={handleComment}
                variant="shadow"
                type="button"
                color="primary"
                size="sm"
              >
                {isCommentAdded ? <SmallSpinner /> : "Post"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-end gap-1 py-2">
            <p className="text-xs">
              კომენტარის დასატოვებლად საჭიროა, რომ დალოგინდეთ
            </p>
            <Button size="sm" onClick={() => navigate("/login")}>
              შესვლა
            </Button>
          </div>
        )}
      </>
      <ul className="w-full py-2 px-3 rounded-md flex flex-col gap-1">
        {post?.comment.length > 0
          ? post?.comment.map(
              (com: { comment: string; $createdAt: string }) => (
                <li
                  key={com.comment}
                  className="py-2 px-3 flex items-center gap-2"
                >
                  <img
                    className="w-12 h-12 md:hidden rounded-full"
                    src={postCreatorImg}
                  />
                  <div className="border-[0.5px] w-full py-2 px-3 rounded-b-md border-stone-200 flex flex-col">
                    <div className="flex flex-col justify-start pb-4">
                      <div className="flex justify-between items-center">
                        <Link
                          className="hover:underline md:text-sm text-stone-950 font-semibold"
                          to={`/user/${user.accountId}`}
                        >
                          {user.name}
                        </Link>
                        <span className="text-sm md:text-xs text-stone-600 font-thin">
                          {formatDate(com?.$createdAt)}
                        </span>
                      </div>
                      <span className="text-xs text-stone-600 font-thin">
                        {post?.creator?.status}
                      </span>
                    </div>
                    <span className="text-stone-950 text-xs md:text-xs font-semibold border-t-[0.2px] border-stone-200">
                      {com.comment}
                    </span>
                  </div>
                </li>
              )
            )
          : ""}
      </ul>
    </div>
  );
}
