export default function NavBar({ score, topScore }) {
  return (
    <nav className="bg-white shadow-md py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-purple-600">Emoji Memory Game</h1>
          <p className="text-gray-600 text-xs">Click on an emoji to earn points, but don't click any more than once!</p>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-gray-600 text-xs">Score</p>
            <p className="text-xl font-bold text-purple-600">{score}</p>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-xs">Top Score</p>
            <p className="text-xl font-bold text-teal-600">{topScore}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
