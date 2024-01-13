import { useParams } from "react-router-dom";
import EditCompanyJob from "../features/vacancies/EditCompanyJob";
import { useGetSingleJob } from "../hooks/jobHooks/useGetSingleJob";
import Loader from "../ui/Loader";

export default function EditCompanyJobPage() {
  const { editId } = useParams();
  const { data: editedData, isPending } = useGetSingleJob(editId || "");
  if (isPending) return <Loader color="primary" />;
  console.log(editedData);
  return (
    <>
      <EditCompanyJob editedData={editedData} />
    </>
  );
}
