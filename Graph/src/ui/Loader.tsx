import { Spinner } from "@nextui-org/react";

type LoaderProps = {
  color:
    | "primary"
    | "current"
    | "white"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
};

export default function Loader({ color }: LoaderProps) {
  return (
    <div className="flex justify-center items-center mt-[20%]">
      <Spinner color={color} />
    </div>
  );
}
