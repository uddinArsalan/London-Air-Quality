export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-green-700 shadow-sm"></div>
      <p className="mt-3 text-sm font-medium text-gray-900">Loading...</p>
    </div>
  );
}
