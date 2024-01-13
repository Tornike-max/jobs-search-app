import { ButtonGroup, Button } from "@nextui-org/button";
import LoginForm from "../features/auth/LoginForm";

import { useSearchParams } from "react-router-dom";
import LoginFormCompany from "../features/auth/LoginFormCompany";

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFormType = searchParams.get("login") || "user";

  function handleToggle(value: string) {
    searchParams.set("login", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="bg-primary-900 pt-4">
      <ButtonGroup className="flex items-center gap-2 justify-center w-full md:justify-end px-[15%]">
        <Button
          onClick={() => handleToggle("user")}
          variant="ghost"
          color="primary"
          size="sm"
          className={`${
            getFormType === "user" && "bg-primary-500 text-stone-100"
          }`}
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
          }`}
        >
          როგორც, კომპანია
        </Button>
      </ButtonGroup>
      {getFormType === "user" && <LoginForm />}
      {getFormType === "company" && <LoginFormCompany />}
    </div>
  );
}
