"use client"

export default function WinOrLoseCard({ gameWon, score, resetGame, gameOverReason }) {
  let message = "Oops! You clicked the same emoji twice."

  if (gameOverReason === "time") {
    message = "Time's up! You need to be faster."
  }

  return (
    <div className="w-full max-w-md">
      <div
        className={`bg-white rounded-xl shadow-lg p-6 text-center w-full ${gameWon ? "border-4 border-green-200" : "border-4 border-red-200"}`}
      >
        <h2 className={`text-2xl font-bold mb-3 ${gameWon ? "text-green-600" : "text-red-600"}`}>
          {gameWon ? "You Won! 🎉" : "Game Over! 😢"}
        </h2>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">{gameWon ? "Congratulations! You have perfect memory!" : message}</p>
          <p className="text-xl font-bold text-purple-600">Score: {score}</p>
        </div>

        <button
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 focus:outline-none"
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
