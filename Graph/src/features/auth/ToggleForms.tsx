import { Button, ButtonGroup } from "@nextui-org/button";

export default function ToggleForms() {
  return (
    <ButtonGroup className="flex items-center gap-2">
      <Button variant="ghost" color="primary" size="sm">
        როგორც მომხმარებელი
      </Button>
      <Button variant="ghost" color="primary" size="sm">
        როგორც, კომპანია
      </Button>
    </ButtonGroup>
  );
}
