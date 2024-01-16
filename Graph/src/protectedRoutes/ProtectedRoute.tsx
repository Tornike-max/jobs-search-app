import Loader from "../ui/Loader";
import { useUserContext } from "../context/useUserContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <Loader color="primary" />;
  }

  return <>{children}</>;
}
