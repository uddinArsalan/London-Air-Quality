export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-95 min-h-screen"
      aria-label="Loading"
      role="alert"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-green-700 shadow-sm"></div>
      <p className="mt-3 text-base font-medium text-gray-900">Loading Stations Data...</p>
    </div>
  );
}