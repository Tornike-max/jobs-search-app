// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Publication from "../features/publication/Publication";
import { useGetPublicationPrices } from "../hooks/publicationHooks/getPublicationPrices";
import Loader from "../ui/Loader";

export default function PublicationPage() {
  const { data, isPending } = useGetPublicationPrices();

  if (isPending) return <Loader color="primary" />;

  console.log(data);
  return (
    <>
      <Publication data={data && data} />
    </>
  );
}
