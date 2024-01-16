import {
  Card,
  CardHeader,
  CardBody,
  Image,
  useDisclosure,
} from "@nextui-org/react";

import ProfileSpringModal from "../../ui/ProfileSpringModal";
import { Models } from "appwrite";
import { formatDate } from "../../ui/formatDate";
import { useDarkMode } from "../../context/useDarkMode";
import { HiOutlineXCircle } from "react-icons/hi2";
import ConfrimDeleting from "../../ui/ConfrimDeleting";
import { useParams } from "react-router-dom";

export default function UserPortfolioImages({
  imageUrl,
  caption,
  location,
  $createdAt,
  postId,
  id,
}: {
  imageUrl: string;
  caption: string;
  location: string;
  $createdAt: string;
  postId: string;
  portfolios?: Models.Document[];
  id: string;
}) {
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  const { isDark } = useDarkMode();
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const getSession = localStorage.getItem("cookieFallback");
  const { accountId } = useParams();
  return (
    <>
      <Card
        className={`py-4 ${
          !isDark ? "bg-primary-800 text-stone-100" : "bg-stone-100"
        } `}
      >
        {getSession?.includes("a_session_") && accountId === id && (
          <div onClick={() => onOpen2()}>
            <button
              color="error"
              className="absolute top-2 right-2 hover:text-red-600 "
            >
              <HiOutlineXCircle className="text-2xl" />
            </button>
          </div>
        )}

        <CardHeader className="pb-0 pt-2 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{location}</p>
          <small
            className={`${!isDark ? "text-stone-300" : "text-default-500"} `}
          >
            {formatDate($createdAt)}
          </small>
          <h4 className="font-bold text-large">
            {caption[0].toUpperCase()}
            {caption.slice(1)}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex items-center">
          <Image
            className="w-full h-80"
            alt="NextUI hero Image with delay"
            src={imageUrl}
            onClick={() => onOpen()}
          />
        </CardBody>
        <ProfileSpringModal
          imgUrl={imageUrl}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </Card>
      <ConfrimDeleting
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        postId={postId}
      />
    </>
  );
}
