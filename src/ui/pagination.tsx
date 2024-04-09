import React from "react";

export default function Pagination({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handlePagination = (pagination: string | number) => {
    if (pagination == "prev") {
      setPage(page > 0 ? page - 1 : page);
    } else if (pagination == "next") {
      setPage(page === totalPages - 1 ? page : page + 1);
    } else {
      setPage(Number(pagination));
    }
  };
  return (
    <nav>
      <ul className="inline-flex w-full mt-2 -space-x-px text-sm overflow-hidden flex-wrap">
        <li>
          <button
            onClick={() => handlePagination("prev")}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li>
            <button
              onClick={() => handlePagination(i)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePagination("next")}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
