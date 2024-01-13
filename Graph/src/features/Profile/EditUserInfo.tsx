import { useDarkMode } from "../../context/useDarkMode";
import EditEmail from "./EditEmail";

import EditUserName from "./EditUserName";
import EditUserPhone from "./EditUserPhone";

export default function EditUserInfo() {
  const { isDark } = useDarkMode();
  return (
    <div className="flex justify-center items-center flex-col gap-4 py-4 max-w-5xl w-full">
      <h1
        className={`w-full text-xl sm:text-xl ${
          !isDark ? "text-slate-200" : "text-indigo-500"
        }  font-medium flex items-center justify-center gap-1`}
      >
        User Details
      </h1>
      <EditEmail />
      <EditUserName />
      <EditUserPhone phone={"57135891"} />
    </div>
  );
}
