const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export function getPracticeModes() {
  return fetchJson('/practice-modes')
}

export function getConversationScenarios() {
  return fetchJson('/conversation-scenarios')
}

export function getInterviewCategories() {
  return fetchJson('/interview-categories')
}
