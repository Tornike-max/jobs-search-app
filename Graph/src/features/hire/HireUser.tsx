import { useNavigate, useParams } from "react-router-dom";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import Loader from "../../ui/Loader";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Link,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlinePhone } from "react-icons/hi2";
import { useUserContext } from "../../context/useUserContext";

import { MdOutlineMail } from "react-icons/md";
import { GrInstagram, GrLinkedin } from "react-icons/gr";
import EmployeSuggestModal from "./EmployeSuggestModal";

export default function HireUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const { accountId } = useParams();
  const { userData, isUserPending } = useGetUserFromDB(accountId || "");
  const { user } = useUserContext();

  if (isUserPending) return <Loader color="primary" />;
  console.log(userData);
  console.log(user);

  const imagesArray = userData?.portfolio.map(
    (images: { imageUrl: never }) => images.imageUrl
  );
  console.log(imagesArray);
  return (
    <div className="max-w-[1920px] w-full px-20 py-14 flex justify-center items-center flex-col gap-4">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-500 w-full text-center">
        სამსახურში აყვანა
      </h1>
      <div className="border-[0.5px] border-stone-400 py-2 px-4 rounded-md w-full">
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            subtitle="დააჭირე ჩამოსაშლელად"
            title="საკონტაქტო ინფორმაცია"
          >
            <div className="flex flex-col items-start justify-center text-primary-500">
              <div className="flex items-center gap-1 ">
                <HiOutlinePhone />
                <p>
                  ტელეფონის ნომერი:{" "}
                  {user?.phone ? user.phone : "არ არის ხელმისაწვდომი"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineMail />
                <p>
                  იმეილი:{" "}
                  {userData?.email ? userData.email : "არ არის ხელმისაწვდომი"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <GrLinkedin />
                <p>
                  Linkedin:{" "}
                  {userData?.linkedinUrl ? (
                    <Link
                      isBlock
                      showAnchorIcon
                      href={userData?.linkedinUrl}
                      color="primary"
                    >
                      დააჭირე აქ
                    </Link>
                  ) : (
                    "არ არის ხელმისაწვდომი"
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <GrInstagram />
                <p>
                  Instagram:{" "}
                  {userData?.instagramUrl ? (
                    <Link
                      isBlock
                      showAnchorIcon
                      href={userData.instagramUrl}
                      color="primary"
                    >
                      დააჭირე აქ
                    </Link>
                  ) : (
                    "არ არის ხელმისაწვდომი"
                  )}
                </p>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            subtitle={<span>დააჭირე ჩამოსაშლელად</span>}
            title="სქილების ნახვა"
          >
            <div className="flex flex-wrap gap-2">
              {userData?.skills.map((skill: string) => (
                <Chip variant="solid" color="primary">
                  {skill}
                </Chip>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            subtitle="დააჭირე ჩამოსაშლელად"
            title="ჩემს შესახებ"
          >
            {userData?.bio}
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full gap-2 grid grid-cols-12 grid-rows-2">
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={imagesArray[0]}
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Plant a tree
            </p>
            <h4 className="text-white font-medium text-large">
              Contribute to the planet
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={imagesArray[1]}
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Supercharged
            </p>
            <h4 className="text-white font-medium text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={imagesArray[2]}
          />
        </Card>
        <Card
          isFooterBlurred
          className="w-full h-[300px] col-span-12 sm:col-span-5"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">New</p>
            <h4 className="text-black font-medium text-2xl">Acme camera</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src={userData?.imageUrl}
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">Available soon.</p>
              <p className="text-black text-tiny">Get notified.</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Notify Me
            </Button>
          </CardFooter>
        </Card>
        <Card
          isFooterBlurred
          className="w-full h-[300px] col-span-12 sm:col-span-7"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Your day your way
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Your checklist for better sleep
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={userData?.imageUrl}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src={userData?.imageUrl}
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Breathing App</p>
                <p className="text-tiny text-white/60">
                  Get a good night's sleep.
                </p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Get App
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <Button onClick={() => navigate(-1)} variant="ghost" color="default">
          უკან
        </Button>
        <Button onClick={() => onOpen()} variant="ghost" color="primary">
          გააგზავნე იმეილი
        </Button>
      </div>
      <EmployeSuggestModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
