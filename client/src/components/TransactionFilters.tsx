interface Props {
  type: string;
  setType: (value: string) => void;
}

const TransactionFilters = ({
  type,
  setType,
}: Props) => {
  return (
    <select
      value={type}
      onChange={(e) =>
        setType(e.target.value)
      }
      className="
        h-12
        rounded-xl
        border
        px-4
      "
    >
      <option value="">
        All Types
      </option>

      <option value="income">
        Income
      </option>

      <option value="expense">
        Expense
      </option>
    </select>
  );
};

export default TransactionFilters;