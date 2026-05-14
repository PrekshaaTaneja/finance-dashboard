import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const SectionCard = ({
  children,
  className = "",
}: Props) => {
  return (
    <div
      className={`
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default SectionCard;