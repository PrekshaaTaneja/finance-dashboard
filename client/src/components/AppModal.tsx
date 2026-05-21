import { useEffect, type ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}



const AppModal = ({
  open,
  onClose,
  title,
  children,
}: Props) => {
  if (!open) return null;

  useEffect(() => {
    const handleEscape = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >
          <h2
            className="
              text-xl
              font-bold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AppModal;