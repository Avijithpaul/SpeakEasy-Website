import express from 'express'
import cors from 'cors'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT) || 4000
const __dirname = dirname(fileURLToPath(import.meta.url))

async function readJson(relativePath) {
  const filePath = join(__dirname, relativePath)
  const content = await readFile(filePath, 'utf8')
  return JSON.parse(content)
}

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/practice-modes', async (_req, res) => {
  const data = await readJson('./data/practiceModes.json')
  res.json(data)
})

app.get('/api/conversation-scenarios', async (_req, res) => {
  const data = await readJson('./data/conversationScenarios.json')
  res.json(data)
})

app.get('/api/interview-categories', async (_req, res) => {
  const data = await readJson('./data/interviewCategories.json')
  res.json(data)
})

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})
