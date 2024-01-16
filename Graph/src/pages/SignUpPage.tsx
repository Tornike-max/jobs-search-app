import SignupCompanyForm from "../features/auth/SignupCompanyForm";
import SignupForm from "../features/auth/SignupForm";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useSearchParams } from "react-router-dom";

export default function SignUpPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFormType = searchParams.get("signUp") || "user";

  function handleToggle(value: string) {
    searchParams.set("signUp", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="bg-primary-900 h-full pt-4">
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
      {getFormType === "user" && <SignupForm />}
      {getFormType === "company" && <SignupCompanyForm />}
    </div>
  );
}
