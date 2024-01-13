import { useUserContext } from "../context/useUserContext";
import CreatePortfolio from "../features/Portfolio/CreatePortfolio";
import { useGetUserFromDB } from "../hooks/authHooks/useGetUserFromDB";
import Loader from "../ui/Loader";

export default function Portfolio() {
  const { user } = useUserContext();

  const userFromDB = useGetUserFromDB(user?.accountId);
  const userData = userFromDB?.userData;
  const isUserPending = userFromDB?.isUserPending;

  if (isUserPending) return <Loader color="primary" />;
  return (
    <>
      <CreatePortfolio userData={userData} />
    </>
  );
}
