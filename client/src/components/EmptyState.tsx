interface Props {
  title: string;
  description?: string;
}

const EmptyState = ({
  title,
  description,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        p-14
        text-center
        bg-white/70
        backdrop-blur-xl
      "
    >
      <div
        className="
          w-16
          h-16
          rounded-full
          bg-indigo-100
          mx-auto
          mb-5
          flex
          items-center
          justify-center
          text-2xl
        "
      >
        📊
      </div>

      <h3
        className="
          text-xl
          font-bold
          text-slate-800
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
            text-slate-500
            mt-3
            max-w-md
            mx-auto
          "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;