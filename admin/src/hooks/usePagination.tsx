import { PAGE_DATA_COUNT } from "@/utils/constant";
import { useState } from "react";

function usePagination(totalCount: any) {
  const take = PAGE_DATA_COUNT;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(totalCount / take);

  const [skip, setSkip] = useState(0);

  function next() {
    setSkip((old) => old + take);
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setSkip((old) => old - take);
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function reset() {
    setSkip(0);
    setCurrentPage(1);
  }

  return {
    prev,
    next,
    take,
    skip,
    currentPage,
    maxPage,
    reset,
    limit: PAGE_DATA_COUNT,
  };
}

export default usePagination;
