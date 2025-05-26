export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      className="bg-red-50 border-l-4 border-red-600 text-red-900 p-4 rounded-lg shadow-sm"
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}