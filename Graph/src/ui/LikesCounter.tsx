import { Models } from "appwrite";
import React, { useCallback, useState } from "react";
import {
  HiHeart,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineHeart,
} from "react-icons/hi2";
import { useLike } from "../hooks/home/useLike";
import { useNavigate } from "react-router-dom";

interface LikesCounterProps {
  post?: Models.Document | undefined;
  userId: string;
  documentId: string;
  setOpen?: (open: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function LikesCounter({
  post,
  userId,
  setOpen,
  documentId,
}: LikesCounterProps) {
  const { mutate: likePost } = useLike();
  const likeList = post?.likes.map((like: { $id: string }) => like.$id);
  const [likes, setLikes] = useState(likeList);
  const getSession = localStorage.getItem("cookieFallback");
  const navigate = useNavigate();

  const handleLikePost = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      let newLikes = [...likes];
      const isAlreadyLike = newLikes.includes(userId);

      if (isAlreadyLike) {
        newLikes = newLikes.filter((id) => id !== userId);
      } else {
        newLikes.push(userId);
      }

      setLikes(newLikes);
      likePost({
        postId: post?.$id || "",
        likesArray: newLikes,
      });
    },
    [likes, userId, post, likePost]
  );

  const handleOpenComment = useCallback(() => {
    setOpen ? setOpen(post?.$id === documentId) : "";
  }, [setOpen, post?.$id, documentId]);

  const checkIsLiked = likes.includes(userId);

  return (
    <div className="w-full flex justify-between items-center">
      <p className="flex items-center gap-1 text-lg">
        <span>{likes.length}</span>
        {getSession?.includes("a_session_") ? (
          <span className="cursor-pointer" onClick={handleLikePost}>
            {checkIsLiked ? (
              <HiHeart className="text-red-500" />
            ) : (
              <HiOutlineHeart className="text-red-500" />
            )}
          </span>
        ) : (
          <span className="cursor-pointer" onClick={() => navigate("/login")}>
            <HiOutlineHeart className="text-red-500" />
          </span>
        )}
      </p>
      <div className="flex items-center gap-1 text-lg flex-col">
        <button
          className="flex items-center gap-1 text-base"
          onClick={handleOpenComment}
        >
          <HiOutlineChatBubbleLeftEllipsis />
          <span className="cursor-pointer">Comment</span>
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(LikesCounter);
