import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useUserContext } from "../context/useUserContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, company } = useUserContext();

  if (isLoading) {
    return <Loader color="primary" />;
  }

  if (
    !user ||
    !company ||
    localStorage.getItem("cookieFallback") === "[]" ||
    !localStorage.getItem("cookieFallback")
  ) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
