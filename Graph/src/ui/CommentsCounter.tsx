// import { Models } from "appwrite";
// import { useState, MouseEvent } from "react";
// import { useComment } from "../hooks/home/useComment";
// import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

// interface CommentsCounterProps {
//   post: Models.Document;
//   userId: string;
//   setOpen: (open: boolean) => void;
//   documentId: string;
//   isOpen: boolean;
// }

// export default function CommentsCounter({
//   post,
//   userId,
//   setOpen,
//   documentId,
//   isOpen,
// }: CommentsCounterProps) {
//   const { addComment, isLoading } = useComment();

//   const initialComments = post.comments
//     ? post.comments.map((comment) => comment.$id)
//     : [];
//   const [comments, setComments] = useState<string[]>(initialComments);

//   function handleComment(e: MouseEvent<HTMLParagraphElement>) {
//     e.preventDefault();
//     const newComments = [...comments, userId];
//     setComments(newComments);
//     if (post?.$id) {
//       addComment(post.$id, newComments);
//     }
//   }

//   function handleOpenComment() {
//     setOpen(post.$id === documentId);
//   }

//   return (
//     <div className="flex items-center gap-1 text-lg flex-col">
//       <button
//         className="flex items-center gap-1 text-base"
//         onClick={handleOpenComment}
//       >
//         <HiOutlineChatBubbleLeftEllipsis />
//         <span className="cursor-pointer">Comment</span>
//       </button>
//     </div>
//   );
// }
