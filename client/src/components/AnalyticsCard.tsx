interface Props {
  title: string;

  value: string | number;

  subtitle: string;
}

const AnalyticsCard = ({
  title,
  value,
  subtitle,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
        p-6
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <p
        className="
          text-sm
          text-slate-500
          font-medium
        "
      >
        {title}
      </p>

      <h2
        className="
          text-3xl
          font-bold
          text-slate-800
          mt-3
        "
      >
        {value}
      </h2>

      <p
        className="
          text-sm
          text-slate-400
          mt-4
        "
      >
        {subtitle}
      </p>
    </div>
  );
};

export default AnalyticsCard;