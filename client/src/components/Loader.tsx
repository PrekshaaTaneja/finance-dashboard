const Loader = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-50
        to-indigo-100
      "
    >
      <div
        className="
          relative
          h-16
          w-16
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-indigo-200
          "
        />

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-indigo-600
            border-t-transparent
            animate-spin
          "
        />
      </div>

      <p
        className="
          mt-6
          text-slate-600
          font-medium
        "
      >
        Loading FinSphere...
      </p>
    </div>
  );
};

export default Loader;