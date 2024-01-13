import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Button,
} from "@nextui-org/react";
import { useDeletePortfolio } from "../hooks/portfolioHooks/useDeletePortfolio";

export default function ConfrimDeleting({
  isOpen,
  onOpenChange,
  postId,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  postId: string;
}) {
  const { deletePost, isPostDeleting } = useDeletePortfolio();
  function handleDelete(onClose: { (): void; (): void }) {
    console.log("click");
    deletePost(postId);
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                წაშალეთ პოსტი
              </ModalHeader>
              <ModalBody>
                <p>დარწმუნებული ხართ, რომ ნამდვილად გსურთ პოსტის წაშლა?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isPostDeleting}
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  არა
                </Button>
                <Button
                  disabled={isPostDeleting}
                  color="primary"
                  onClick={() => handleDelete(onClose)}
                >
                  დიახ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
