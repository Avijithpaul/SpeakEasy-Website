import { useMemo, useState } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import './VocabularyPractice.css'

const vocabularyList = [
  {
    id: 'ubiquitous',
    word: 'Ubiquitous',
    phonetic: '/yoo-BIK-wi-tuhs/',
    level: 'Advanced',
    category: 'General',
    meaning: 'Present or found everywhere.',
    example: 'Smartphones are now ubiquitous in modern life.',
  },
  {
    id: 'eloquent',
    word: 'Eloquent',
    phonetic: '/EL-uh-kwuhnt/',
    level: 'Intermediate',
    category: 'Speaking',
    meaning: 'Fluent, clear, and persuasive in speech or writing.',
    example: 'She gave an eloquent presentation at the conference.',
  },
  {
    id: 'resilient',
    word: 'Resilient',
    phonetic: '/ri-ZIL-yuhnt/',
    level: 'Intermediate',
    category: 'Mindset',
    meaning: 'Able to recover quickly after difficulties.',
    example: 'Great learners are resilient when they make mistakes.',
  },
  {
    id: 'meticulous',
    word: 'Meticulous',
    phonetic: '/muh-TIK-yuh-luhs/',
    level: 'Advanced',
    category: 'Work',
    meaning: 'Very careful and precise about details.',
    example: 'He is meticulous when preparing client reports.',
  },
  {
    id: 'ambiguous',
    word: 'Ambiguous',
    phonetic: '/am-BIG-yoo-uhs/',
    level: 'Advanced',
    category: 'Communication',
    meaning: 'Open to more than one interpretation.',
    example: 'Her answer was ambiguous, so the team asked again.',
  },
  {
    id: 'pragmatic',
    word: 'Pragmatic',
    phonetic: '/prag-MAT-ik/',
    level: 'Intermediate',
    category: 'Decision Making',
    meaning: 'Focused on practical solutions.',
    example: 'We need a pragmatic plan to meet the deadline.',
  },
  {
    id: 'ephemeral',
    word: 'Ephemeral',
    phonetic: '/ih-FEM-er-uhl/',
    level: 'Advanced',
    category: 'Abstract',
    meaning: 'Lasting for a very short time.',
    example: 'Social media trends can be ephemeral.',
  },
  {
    id: 'benevolent',
    word: 'Benevolent',
    phonetic: '/buh-NEV-uh-luhnt/',
    level: 'Intermediate',
    category: 'Character',
    meaning: 'Kind, generous, and well-meaning.',
    example: 'The benevolent mentor always helps new students.',
  },
]

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function editDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0))

  for (let i = 0; i <= b.length; i += 1) matrix[i][0] = i
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[b.length][a.length]
}

function similarity(a, b) {
  const maxLength = Math.max(a.length, b.length)
  if (!maxLength) return 1
  return 1 - editDistance(a, b) / maxLength
}

function evaluateAttempt(spokenText, targetWord) {
  const cleanedTarget = normalizeText(targetWord)
  const cleanedSpoken = normalizeText(spokenText)
  const spokenWords = cleanedSpoken.split(' ').filter(Boolean)

  if (!cleanedSpoken) {
    return { correct: false, score: 0 }
  }

  if (cleanedSpoken === cleanedTarget) {
    return { correct: true, score: 100 }
  }

  if (spokenWords.includes(cleanedTarget)) {
    return { correct: true, score: 90 }
  }

  const bestSimilarity = spokenWords.reduce((best, spokenWord) => {
    return Math.max(best, similarity(spokenWord, cleanedTarget))
  }, 0)

  const score = Math.round(bestSimilarity * 100)
  return { correct: bestSimilarity >= 0.82, score }
}

function VocabularyPractice({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [attempts, setAttempts] = useState([])
  const [showMeaning, setShowMeaning] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    attempted: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
  })
  const [masteredWordIds, setMasteredWordIds] = useState([])

  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition()

  const currentWord = vocabularyList[currentIndex]
  const progressPercent = ((currentIndex + 1) / vocabularyList.length) * 100
  const accuracyPercent = useMemo(() => {
    if (!sessionStats.attempted) return 0
    return Math.round((sessionStats.correct / sessionStats.attempted) * 100)
  }, [sessionStats.attempted, sessionStats.correct])

  const goToWord = (targetIndex) => {
    setCurrentIndex(targetIndex)
    setAttempts([])
    setShowMeaning(false)
    resetTranscript()
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % vocabularyList.length
    goToWord(nextIndex)
  }

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + vocabularyList.length) % vocabularyList.length
    goToWord(previousIndex)
  }

  const handleRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabularyList.length)
    goToWord(randomIndex === currentIndex ? (randomIndex + 1) % vocabularyList.length : randomIndex)
  }

  const handleClearCurrentInput = () => {
    resetTranscript()
  }

  const speakText = (text, rate = 0.86) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
      speechSynthesis.speak(utterance)
    }
  }

  const handleCheckAttempt = () => {
    if (isListening || !transcript.trim()) return

    const evaluation = evaluateAttempt(transcript, currentWord.word)

    setAttempts((prev) => [
      {
        id: Date.now(),
        spoken: transcript.trim(),
        correct: evaluation.correct,
        score: evaluation.score,
      },
      ...prev,
    ].slice(0, 5))

    setSessionStats((prev) => {
      const attempted = prev.attempted + 1
      const correct = prev.correct + (evaluation.correct ? 1 : 0)
      const streak = evaluation.correct ? prev.streak + 1 : 0
      const bestStreak = Math.max(prev.bestStreak, streak)
      return { attempted, correct, streak, bestStreak }
    })

    if (evaluation.correct) {
      setMasteredWordIds((prev) => (prev.includes(currentWord.id) ? prev : [...prev, currentWord.id]))
    }

    setShowMeaning(true)
  }

  const lastAttempt = attempts[0]

  if (!isSupported) {
    return (
      <div className="vocabulary-practice">
        <button className="back-btn" onClick={onBack}>Back to modes</button>
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="vocabulary-practice">
      <button className="back-btn" onClick={onBack}>Back to modes</button>

      <h1 className="section-title">Vocabulary Practice</h1>
      <p className="section-desc">Practice pronunciation, check feedback, and build consistency word by word.</p>

      <div className="vocab-stats-grid">
        <div className="stat-card">
          <span>Attempted</span>
          <strong>{sessionStats.attempted}</strong>
        </div>
        <div className="stat-card">
          <span>Accuracy</span>
          <strong>{accuracyPercent}%</strong>
        </div>
        <div className="stat-card">
          <span>Current Streak</span>
          <strong>{sessionStats.streak}</strong>
        </div>
        <div className="stat-card">
          <span>Mastered Words</span>
          <strong>{masteredWordIds.length}</strong>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
        <span className="progress-text">{currentIndex + 1} / {vocabularyList.length}</span>
      </div>

      <div className="word-card">
        <div className="word-badges">
          <span className="word-badge">{currentWord.level}</span>
          <span className="word-badge muted">{currentWord.category}</span>
        </div>

        <div className="word-main">
          <h2 className="word">{currentWord.word}</h2>
          <p className="phonetic">{currentWord.phonetic}</p>
          <div className="word-actions">
            <button className="listen-btn" onClick={() => speakText(currentWord.word)} title="Listen to pronunciation">
              Listen word
            </button>
            <button className="listen-btn" onClick={() => speakText(currentWord.example, 0.94)} title="Listen to example sentence">
              Listen example
            </button>
          </div>
        </div>

        <div className="meaning-toggle-wrap">
          <button
            className="meaning-toggle"
            onClick={() => setShowMeaning((prev) => !prev)}
          >
            {showMeaning ? 'Hide details' : 'Show meaning and example'}
          </button>
        </div>

        {showMeaning && (
          <div className="meaning-section">
            <p className="meaning">{currentWord.meaning}</p>
            <p className="example">Example: "{currentWord.example}"</p>
          </div>
        )}
      </div>

      <div className="practice-section">
        <h3>Say the target word clearly, then check your result.</h3>

        <div className="mic-controls">
          <button
            className={`mic-btn-vocab ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? 'Stop recording' : 'Start recording'}
          </button>

          <button
            className="btn btn-primary"
            onClick={handleCheckAttempt}
            disabled={isListening || !transcript.trim()}
          >
            Check pronunciation
          </button>

          <button className="btn btn-secondary" onClick={handleClearCurrentInput} disabled={!transcript && !interimTranscript}>
            Clear input
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="live-transcript">
          {transcript || interimTranscript ? (
            <p>
              <span className="final-text">{transcript}</span>
              <span className="interim-text">{interimTranscript}</span>
            </p>
          ) : (
            <p className="placeholder-text">Your speech transcript will appear here.</p>
          )}
        </div>

        {lastAttempt && (
          <div className={`feedback ${lastAttempt.correct ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">{lastAttempt.correct ? 'OK' : 'X'}</span>
            <div className="feedback-text">
              <p className="feedback-status">
                {lastAttempt.correct ? 'Great pronunciation' : 'Needs another try'}
              </p>
              <p className="feedback-spoken">You said: "{lastAttempt.spoken}"</p>
              <p className="feedback-score">Score: {lastAttempt.score}%</p>
            </div>
          </div>
        )}

        {attempts.length > 1 && (
          <div className="attempt-history">
            <h4>Recent attempts</h4>
            <ul>
              {attempts.map((attempt) => (
                <li key={attempt.id} className={attempt.correct ? 'correct' : 'incorrect'}>
                  <span>{attempt.spoken}</span>
                  <strong>{attempt.score}%</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="navigation">
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleRandomWord}>
          Random
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default VocabularyPractice
