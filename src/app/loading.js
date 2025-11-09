export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-20"></div>
          </div>
          <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          TravelHub
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Preparing your adventure...
        </p>

        {/* Loading Bar */}
        <div className="mt-6 w-48 h-1 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
