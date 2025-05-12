"use client"

export default function EmojiCard({ emoji, onClickEmoji }) {
  const { id, emojiName, emojiUrl } = emoji

  return (
    <button
      className="bg-white rounded-xl shadow-md p-2 md:p-4 flex items-center justify-center aspect-square transition-all hover:shadow-lg hover:scale-105 hover:bg-purple-50 cursor-pointer focus:outline-none border border-purple-100"
      onClick={() => onClickEmoji(id)}
      aria-label={emojiName}
    >
      <span className="text-4xl md:text-5xl" role="img" aria-label={emojiName}>
        {emojiUrl}
      </span>
    </button>
  )
}
