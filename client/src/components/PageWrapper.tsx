import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageWrapper = ({
  children,
}: Props) => {
  return (
    <div className="space-y-8 w-full">
      {children}
    </div>
  );
};

export default PageWrapper;