import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  missingFieldCount: number;
  requiredFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  missingFieldCount,
  requiredFieldsCount,
}:AlertBannerProps) => {
  return (
    <Alert
      className="my-4"
      variant={`${isCompleted ? "complete" : "destructive"}`}
    >
      {isCompleted ? (
        <Rocket className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <AlertTitle className="text-xs font-medium ">
        {missingFieldCount} missing field(s) / {requiredFieldsCount} required
        fields
      </AlertTitle>
      <AlertDescription className="text-xs">
        {isCompleted
          ? "Great job! Ready to publish"
          : "You can only publish when all the required field completed"}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
