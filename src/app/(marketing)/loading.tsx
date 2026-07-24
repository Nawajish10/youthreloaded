export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div>
        <p className="text-sm font-medium text-neutral-400">Loading experience...</p>
      </div>
    </div>
  );
}
