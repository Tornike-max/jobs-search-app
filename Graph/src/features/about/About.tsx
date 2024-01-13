import { useDarkMode } from "../../context/useDarkMode";
import { useGetAboutInfo } from "../../hooks/aboutHooks/useGetAboutInfo";
import Loader from "../../ui/Loader";

export default function About() {
  const { isDark } = useDarkMode();
  const { aboutData, isAboutPending } = useGetAboutInfo();

  if (isAboutPending) return <Loader color="primary" />;

  console.log(aboutData);
  return (
    <div className="max-w-[1920px] w-full flex justify-center flex-col gap-10 items-center px-20 py-10">
      <h1
        className={`w-full text-3xl font-semibold ${
          !isDark ? "text-stone-200" : "text-primary-600"
        } `}
      >
        ჩვენს შესახებ
      </h1>
      <div>
        <p
          className={`${
            !isDark ? "text-stone-100" : "text-stone-700"
          } font-serif`}
        >
          {aboutData?.about}
        </p>
      </div>

      <div
        className={`w-full ${
          !isDark && "text-stone-200"
        } flex justify-center items-start flex-col`}
      >
        <p>იდეის ავტორი: {aboutData?.founder}</p>
        {aboutData?.website_builders.map((developer: string) => (
          <p key={developer}>დეველოპერები: {developer}</p>
        ))}
      </div>
    </div>
  );
}
