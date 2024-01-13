import { TfiInstagram, TfiLinkedin } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function PortfolioLinks({
  instagramUrl,
  linkedinUrl,
}: {
  linkedinUrl: string;
  instagramUrl: string;
}) {
  const linksArr = [
    {
      id: 1,
      name: "linkedin",
      url: linkedinUrl,
      icon: <TfiLinkedin />,
    },
    {
      id: 2,
      name: "instagram",
      url: instagramUrl,
      icon: <TfiInstagram />,
    },
  ];
  return (
    <div className="flex flex-wrap gap-1">
      <div className="w-full flex justify-start text-2xl font-semibold text-indigo-600 pb-2">
        <h1>ლინკები</h1>
      </div>
      <div className="w-full border-[0.5px] border-stone-600 mb-2"></div>
      {linksArr.map((link) => (
        <Link
          key={link.id}
          to={link.url}
          className="text-xl text-indigo-600 rounded-full hover:bg-stone-200 border-[0.5px] border-stone-600 flex justify-center items-center w-10 h-10"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
