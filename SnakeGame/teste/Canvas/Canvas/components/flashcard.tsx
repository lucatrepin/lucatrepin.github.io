import {ArrowRight} from "lucide-react"
import {CircleFlag} from 'react-circle-flags'

export class Flashcard {
  dark: boolean
  language: string
  number: string
  word: string
  word_translation: string
  sentence: string
  sentence_notes: string
  sentence_translation: string

  constructor(config: Partial<Flashcard> = {}) {
    this.dark                 = (config.dark || false)
    this.language             = (config.language || "\u200BJapanese")
    this.number               = (config.number || "1/100")
    this.word                 = (config.word || "元気")
    this.word_translation     = (config.word_translation || "Energetic")
    this.sentence             = (config.sentence || "田中さんはいつも元気で活発です。")
    this.sentence_notes       = (config.sentence_notes || "Tanaka-san wa itsumo genki de kappatsu desu.")
    this.sentence_translation = (config.sentence_translation || "Mr. Tanaka is always energetic and lively.")
  }
}

// If zero width space is present, return true
function should_hide(string: string): boolean {
  return string.includes("\u200B")
}


export function FlashcardComponent(card: Flashcard | null) {
  if (!card)
    return FlashcardComponent(new Flashcard())
  return (
    <div className="flashcard-root">
      <div className={`flashcard-body ${card.dark?"dark":""}`}>
        <div className="flashcard-header">
          <div className="language">
            <CircleFlag countryCode="jp" width="24"/>
            <span>{card.language}</span>
          </div>
          <span className="card-number">{card.number}</span>
        </div>

        <div className="flashcard-content">
          <div className="word-section">
            <p className="word-label">Word:</p>
            <p className="word">
              {card.word}
            </p>
            <p className="word">
              ({card.word_translation})
            </p>
          </div>

          <div className="space-y-4" style={{visibility: "visible"}}>
            <p className="sentence">{card.sentence}</p>
            <p className="romaji">
              <span className="romaji-dot"></span>
              {card.sentence_notes}
            </p>
          </div>

          <p className="translation">
            <ArrowRight className="translation-arrow" />
            {card.sentence_translation}
          </p>

          <div className="flashcard-footer">
            <p className="copyright">© Copyright</p>
            <div className="progress-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

