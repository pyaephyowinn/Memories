import { Button } from "./button";
import { LoaderCircle } from "lucide-react";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading: boolean;
  loadingText?: string;
};

export function LoadingButton({
  loading,
  loadingText,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <LoaderCircle className="animate-spin" />}

      {loading ? loadingText || children : children}
    </Button>
  );
}
