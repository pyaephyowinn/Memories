import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
import { parseAsInteger } from "nuqs";

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  return (
    <ShadcnPagination>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to previous page"
            aria-disabled={page === 1}
            role={page === 1 ? undefined : "link"}
            onClick={page === 1 ? undefined : () => setPage(page - 1)}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Page <span className="text-foreground">{page}</span> of{" "}
            <span className="text-foreground">{totalPages}</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to next page"
            aria-disabled={page === totalPages}
            role={page === totalPages ? undefined : "link"}
            onClick={page === totalPages ? undefined : () => setPage(page + 1)}
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
