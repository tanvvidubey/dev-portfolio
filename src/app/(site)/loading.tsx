export default function Loading() {
  return (
    <div className="page-enter px-[var(--page-pad)] py-16">
      <div className="mx-auto w-full max-w-[var(--page-max)]">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton mt-4 h-10 w-2/3" />
        <div className="skeleton mt-6 h-4 w-full" />
        <div className="skeleton mt-2 h-4 w-5/6" />
        <div className="mt-10 space-y-3">
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
        </div>
      </div>
    </div>
  );
}
