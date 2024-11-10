export default function Spinner() {
  return (
    <>
      <h1 className="text-center text-2xl">Products are being loaded.</h1>
      <div
        className="absolute left-1/2 top-1/2 size-32 animate-spin rounded-full border-4 border-dashed border-blue-900"
        style={{ translate: '-50% -50%' }}
        data-testid="loading-spinner"
      ></div>
    </>
  );
}
