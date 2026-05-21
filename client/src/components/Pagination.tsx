interface Props {
  page: number;
  pages: number;
  onPageChange: (
    page: number
  ) => void;
}

const Pagination = ({
  page,
  pages,
  onPageChange,
}: Props) => {
  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-2
      "
    >
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="
          px-4
          py-2
          rounded-xl
          border
        "
      >
        Prev
      </button>

      <span className="text-sm">
        {page} / {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="
          px-4
          py-2
          rounded-xl
          border
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;