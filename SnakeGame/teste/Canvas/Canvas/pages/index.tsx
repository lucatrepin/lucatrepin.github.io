import {useState} from "react"
import FinishedFlashcard from "../components/finishcard"
import {Flashcard, FlashcardComponent} from "../components/flashcard"



export default function Home() {
  const [dark_mode, set_dark_mode] = useState(false)

  return (
    <div>
      <div className={`container mx-auto p-4`}>
        <button
          onClick={() => set_dark_mode(!dark_mode)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Dark Mode
        </button>

        {FlashcardComponent(new Flashcard({
          word: "Hello",
          dark: dark_mode
        }))}

        <div className="mt-8"></div>

        <FinishedFlashcard/>
      </div>

    </div>
  )
}

