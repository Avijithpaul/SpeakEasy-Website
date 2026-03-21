import './PracticeMode.css'

const basicModes = [
  {
    id: 'speaking',
    icon: '🎤',
    title: 'Free Speaking',
    description: 'Speak freely and get your speech transcribed.',
  },
  {
    id: 'reading',
    icon: '📖',
    title: 'Read Aloud',
    description: 'Read passages and compare to your speech.',
  },
  {
    id: 'vocabulary',
    icon: '📝',
    title: 'Vocabulary',
    description: 'Learn and pronounce new words correctly.',
  },
]

const advancedModes = [
  {
    id: 'conversation',
    icon: '💬',
    title: 'Conversations',
    description: 'Practice real-world dialogue scenarios like ordering food, job interviews, and more.',
  },
  {
    id: 'presentation',
    icon: '🎯',
    title: 'Presentations',
    description: 'Practice presenting topics with a timer and speech tracking.',
  },
  {
    id: 'interview',
    icon: '💼',
    title: 'Interview Prep',
    description: 'Answer common interview questions with tips and feedback.',
  },
  {
    id: 'debate',
    icon: '⚔️',
    title: 'Debate Practice',
    description: 'Defend a position on various topics with timed arguments.',
  },
]

function PracticeMode({ onSelect }) {
  return (
    <div className="practice-mode">
      <div className="mode-header">
        <h1 className="section-title">English Speaking Practice</h1>
        <p className="section-desc">Choose how you want to practice your communication skills today.</p>
      </div>

      <div className="mode-section">
        <h3 className="mode-section-title">🚀 Communication Skills</h3>
        <div className="mode-grid advanced">
          {advancedModes.map((mode) => (
            <button
              key={mode.id}
              className="mode-card featured"
              onClick={() => onSelect(mode.id)}
            >
              <span className="mode-icon">{mode.icon}</span>
              <h2 className="mode-title">{mode.title}</h2>
              <p className="mode-desc">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mode-section">
        <h3 className="mode-section-title">📚 Basic Practice</h3>
        <div className="mode-grid basic">
          {basicModes.map((mode) => (
            <button
              key={mode.id}
              className="mode-card"
              onClick={() => onSelect(mode.id)}
            >
              <span className="mode-icon">{mode.icon}</span>
              <h2 className="mode-title">{mode.title}</h2>
              <p className="mode-desc">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="browser-note">
        <span className="note-icon">ℹ️</span>
        <span>Uses browser speech recognition. Works best in Chrome, Edge, or Safari.</span>
      </div>
    </div>
  )
}

export default PracticeMode
