interface Props {
  message?: string;
}

const ErrorState = ({
  message = "Something went wrong",
}: Props) => {
  return (
    <div
      className="
        rounded-2xl
        bg-red-50
        border
        border-red-200
        p-6
        text-center
      "
    >
      <p className="text-red-600">
        {message}
      </p>
    </div>
  );
};

export default ErrorState;