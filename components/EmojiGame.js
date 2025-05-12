"use client"

import { useState, useEffect, useRef } from "react"
import EmojiCard from "./EmojiCard"
import WinOrLoseCard from "./WinOrLoseCard"

export default function EmojiGame({ emojisList, score, setScore, topScore }) {
  const [clickedEmojiIds, setClickedEmojiIds] = useState([])
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [shuffledEmojisList, setShuffledEmojisList] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const [timer, setTimer] = useState(5)
  const [gameOverReason, setGameOverReason] = useState("")
  const timerRef = useRef(null)

  // Initialize game
  useEffect(() => {
    shuffleEmojis()
    startTimer()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Timer countdown effect
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    setTimer(5)
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current)
          setIsGameEnded(true)
          setGameOverReason("time")
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  // Shuffle emojis on initial render and when clicked emojis change
  useEffect(() => {
    shuffleEmojis()
  }, [clickedEmojiIds])

  // Clean up timer when game ends
  useEffect(() => {
    if (isGameEnded && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [isGameEnded])

  // Shuffle the emojis
  const shuffleEmojis = () => {
    const shuffledList = [...emojisList].sort(() => Math.random() - 0.5)
    setShuffledEmojisList(shuffledList)
  }

  // Handle emoji click
  const onClickEmoji = (emojiId) => {
    // If emoji already clicked, end game
    if (clickedEmojiIds.includes(emojiId)) {
      setIsGameEnded(true)
      setGameOverReason("repeat")
      return
    }

    // Add emoji to clicked list and increment score
    const newClickedEmojiIds = [...clickedEmojiIds, emojiId]
    setClickedEmojiIds(newClickedEmojiIds)
    setScore(newClickedEmojiIds.length)

    // Reset timer after successful click
    startTimer()

    // Check if all emojis have been clicked (win condition)
    if (newClickedEmojiIds.length === emojisList.length) {
      setIsGameEnded(true)
      setGameWon(true)
      clearInterval(timerRef.current)
    }
  }

  // Reset game but keep top score
  const resetGame = () => {
    setClickedEmojiIds([])
    setScore(0)
    setIsGameEnded(false)
    setGameWon(false)
    setGameOverReason("")
    shuffleEmojis()
    startTimer()
  }

  // Render game or win/lose card
  if (isGameEnded) {
    return <WinOrLoseCard gameWon={gameWon} score={score} resetGame={resetGame} gameOverReason={gameOverReason} />
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-center mb-4">
        <div
          className={`text-xl font-bold rounded-full px-4 py-1 ${
            timer <= 2 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          Time: {timer}s
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {shuffledEmojisList.map((emoji) => (
          <EmojiCard key={emoji.id} emoji={emoji} onClickEmoji={onClickEmoji} />
        ))}
      </div>
    </div>
  )
}
