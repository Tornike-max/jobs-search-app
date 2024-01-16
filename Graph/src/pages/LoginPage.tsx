import { ButtonGroup, Button } from "@nextui-org/button";
import LoginForm from "../features/auth/LoginForm";

import { useSearchParams } from "react-router-dom";
import LoginFormCompany from "../features/auth/LoginFormCompany";
import { useDarkMode } from "../context/useDarkMode";

export default function LoginPage() {
  const { isDark } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const getFormType = searchParams.get("login") || "user";

  function handleToggle(value: string) {
    searchParams.set("login", value);
    setSearchParams(searchParams);
  }
  return (
    <div className={`${!isDark ? "bg-primary-800" : " "} pt-4`}>
      <ButtonGroup className="flex items-center gap-2 justify-center w-full">
        <Button
          onClick={() => handleToggle("user")}
          variant="ghost"
          color="primary"
          size="sm"
          className={`${
            getFormType === "user" && "bg-primary-500 text-stone-100"
          } ${!isDark && "text-stone-200"}`}
        >
          როგორც მომხმარებელი
        </Button>
        <Button
          onClick={() => handleToggle("company")}
          variant="ghost"
          color="primary"
          size="sm"
          className={`${
            getFormType === "company" && "bg-primary-500 text-stone-100"
          } ${!isDark && "text-stone-200"}`}
        >
          როგორც, კომპანია
        </Button>
      </ButtonGroup>
      {getFormType === "user" && <LoginForm />}
      {getFormType === "company" && <LoginFormCompany />}
    </div>
  );
}
