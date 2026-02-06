
export default function NoResults () {
  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-bl from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-80 bg-gray-50 px-6 border border-rounded-[25]">

        <svg
          className="w-24 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/>
        </svg>


        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          No results found
        </h1>

        <p className="text-gray-500 mb-6 text-center max-w-md">
          We couldn't find any items matching your genre. Try adjusting your
          filters or searching for something else.
        </p>

      </div>
    </div>
  );
}