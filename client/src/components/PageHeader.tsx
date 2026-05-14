interface Props {
  title: string;
  description: string;
}

const PageHeader = ({
  title,
  description,
}: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="text-slate-500 text-sm md:text-base">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;