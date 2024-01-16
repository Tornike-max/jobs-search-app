import { Models } from "appwrite";
import { useState, useCallback } from "react";
import LikesCounter from "../../ui/LikesCounter";
import Comments from "../../ui/Comments";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { SpringModal } from "../../ui/SpringModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate } from "../../ui/formatDate";
import { useDarkMode } from "../../context/useDarkMode";

export default function Home({
  posts,
}: {
  posts: Models.Document | undefined[];
}) {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  const [modalImgUrl, setModalImgUrl] = useState("");
  const [openComments, setOpenComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { isDark } = useDarkMode();

  const toggleComment = useCallback((postId: string) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId] || false,
    }));
  }, []);

  const toggleModal = useCallback((postId: string, imageUrl: string) => {
    setOpenModals((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId] || false,
    }));
    setModalImgUrl(imageUrl);
  }, []);

  const placeholderImage = "placeholder.jpg";
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center">
      <div className="m-auto grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
        {posts?.map((postItem: Models.Document[]) =>
          postItem.map((post: Models.Document) => (
            <div
              className="max-w-lg w-full py-6 px-2 rounded-md"
              style={{
                display: "flex",
                fontSize: "2rem",
              }}
              key={post.$id}
            >
              <Card
                className={`py-2 px-4 ${
                  !isDark ? "bg-primary-900 text-stone-100" : "bg-stone-100"
                } transition-all duration-150`}
              >
                <CardHeader className="pb-0 pt-2 px-8 flex-col items-start">
                  <Link
                    to={`/account/${post?.creator?.accountId}`}
                    className="flex items-center gap-2 mb-4"
                  >
                    <img
                      className="w-14 h-14 md:w-10 md:h-10 rounded-full"
                      src={post.creator.imageUrl}
                    />
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm ${
                          !isDark ? "text-stone-200" : "text-stone-800"
                        } font-semibold transition-all duration-150`}
                      >
                        {post.creator.name}
                      </span>
                      <span
                        className={`text-xs ${
                          !isDark ? "text-stone-200" : "text-stone-600"
                        } transition-all duration-150`}
                      >
                        {post.creator.status}
                      </span>
                      <span
                        className={`text-xs ${
                          !isDark ? "text-stone-200" : "text-stone-500"
                        } transition-all duration-150`}
                      >
                        {formatDate(post.$createdAt)}
                      </span>
                    </div>
                  </Link>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex items-center">
                  <LazyLoadImage
                    placeholderSrc={placeholderImage}
                    loading="lazy"
                    onClick={() => toggleModal(post.$id, post.imageUrl)}
                    alt="Card background"
                    className="object-cover rounded-xl cursor-pointer h-80"
                    src={post.imageUrl}
                    width={300}
                  />
                </CardBody>
                <div className="w-full py-4 px-4 rounded-b-md">
                  <div className="flex justify-between items-center">
                    <LikesCounter
                      documentId={post.$id}
                      post={post}
                      userId={post.creator.$id}
                      setOpen={() => toggleComment(post?.$id)}
                    />
                  </div>
                  {openComments[post?.$id] && (
                    <Comments
                      userId={post.$id}
                      post={post}
                      postId={post.$id}
                      postCreatorImg={post.creator.imageUrl}
                    />
                  )}
                </div>
              </Card>
              <SpringModal
                post={post}
                imgUrl={modalImgUrl}
                isOpen={!!openModals[post.$id]}
                setIsOpen={() => toggleModal(post.$id, "")}
                creatorImageUrl={post.creator.imageUrl}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
