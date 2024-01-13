import { Button, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useUpdateStatus } from "../../hooks/authHooks/useUpdateStatus";
import SmallSpinner from "../../ui/SmallSpinner";

import { Models } from "appwrite";

interface SelectType {
  status: string;
}

export default function AddYourStatus({ userData }: Models.Document) {
  const { isStatusUpdatings, updateStatus } = useUpdateStatus();
  const { control, handleSubmit } = useForm<SelectType>();
  const options: string[] = ["Client", "Photographer", "Videographer"];

  const onSubmit = (data: SelectType) => {
    const newData = {
      userId: userData?.$id || "",
      status: data.status,
    };
    updateStatus(newData);
  };

  return (
    <div className="w-full py-2">
      <form
        className="flex justify-center items-center flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="status"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              variant="faded"
              label="Select your status"
              className="max-w-xs"
              placeholder={userData ? userData.status : ""}
            >
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Button
          disabled={isStatusUpdatings}
          type="submit"
          variant="shadow"
          color="primary"
        >
          {isStatusUpdatings ? <SmallSpinner /> : "შეცვალე სტატუსი"}
        </Button>
      </form>
    </div>
  );
}
