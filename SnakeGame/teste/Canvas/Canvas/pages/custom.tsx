import {useRouter} from "next/router"
import {FlashcardComponent, type Flashcard} from "../components/flashcard"

export default function Custom() {
  const router = useRouter()
  const flashcard = router.query.flashcard ? (JSON.parse(router.query.flashcard as string) as Flashcard) : null

  if (!flashcard)
    return <div>No flashcard data</div>

  return (
    <div className={`container mx-auto p-4`}>
      <FlashcardComponent {...flashcard}/>
    </div>
  )
}

