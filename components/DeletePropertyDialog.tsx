import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { deleteProperty } from "@/services/property";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeletePropertyDialog({ id }: { id: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProperty(id);
      toast({
        title: "Property deleted",
        description: "Your property has been deleted",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting property",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="md:flex-1" variant="destructive">
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this property? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
