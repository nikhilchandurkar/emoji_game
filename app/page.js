"use client"

import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import EmojiGame from "../components/EmojiGame"

// Face emoji data in a 4x3 grid (12 emojis total)
const emojisList = [
  { id: 1, emojiName: "Grinning Face", emojiUrl: "😀" },
  { id: 2, emojiName: "Laughing", emojiUrl: "😂" },
  { id: 3, emojiName: "Heart Eyes", emojiUrl: "😍" },
  { id: 4, emojiName: "Cool Face", emojiUrl: "😎" },
  { id: 5, emojiName: "Winking Face", emojiUrl: "😉" },
  { id: 6, emojiName: "Thinking Face", emojiUrl: "🤔" },
  { id: 7, emojiName: "Party Face", emojiUrl: "🥳" },
  { id: 8, emojiName: "Surprised Face", emojiUrl: "😮" },
  { id: 9, emojiName: "Sleeping Face", emojiUrl: "😴" },
  { id: 10, emojiName: "Angry Face", emojiUrl: "😡" },
  { id: 11, emojiName: "Crying Face", emojiUrl: "😢" },
  { id: 12, emojiName: "Star Struck", emojiUrl: "🤩" },
]

export default function Home() {
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)

  // Load top score from localStorage on initial render
  useEffect(() => {
    const savedTopScore = localStorage.getItem("emojiGameTopScore")
    if (savedTopScore) {
      setTopScore(Number.parseInt(savedTopScore, 10))
    }
  }, [])

  // Update top score in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("emojiGameTopScore", topScore.toString())
  }, [topScore])

  // Update top score when current score exceeds it
  useEffect(() => {
    if (score > topScore) {
      setTopScore(score)
    }
  }, [score, topScore])

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col overflow-hidden">
      <NavBar score={score} topScore={topScore} />
      <main className="flex-1 flex items-center justify-center px-4">
        <EmojiGame emojisList={emojisList} score={score} setScore={setScore} topScore={topScore} />
      </main>
    </div>
  )
}
