import { useNavigate } from 'react-router-dom'

export default function BackButton({ label = '← Back to modes', className = 'back-btn' }) {
  const navigate = useNavigate()
  return (
    <button type="button" className={className} onClick={() => navigate('/practice')}>
      {label}
    </button>
  )
}
