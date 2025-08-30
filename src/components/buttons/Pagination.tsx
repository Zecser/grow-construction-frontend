import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  previous?: boolean;
  next?: boolean;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  previous,
  next,
  setPage,
}) => {
  return (
    <div className="flex justify-center text-sm flex-wrap items-center gap-4 mt-6">
      <Button
        className="text-white rounded px-3 h-[30px]"
        onClick={() => setPage(page - 1)}
        disabled={!previous || page <= 1}
      >
        Prev
      </Button>

      <span className="text-sm text-gray-600">
        Page {page || "_"} of {totalPages || 1}
      </span>

      <Button
        className="text-white rounded px-3 h-[30px]"
        onClick={() => setPage(page + 1)}
        disabled={!next || page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
