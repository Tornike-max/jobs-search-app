import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

export default function ProfileSpringModal({
  isOpen,
  onOpenChange,
  imgUrl,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  imgUrl: string;
}) {
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <>
            <ModalBody>
              <img
                className="h-[450px] w-full rounded-lg"
                src={imgUrl}
                alt="image"
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
