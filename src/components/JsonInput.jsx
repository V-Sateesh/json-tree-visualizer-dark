import { useState } from 'react'

const sample = `{
  "user": {
    "name": "John Doe",
    "age": 30,
    "address": {"city": "Mumbai","zip": "400001"},
    "hobbies": ["reading","coding"]
  },
  "items": [
    {"id":1,"name":"Pen"},
    {"id":2,"name":"Notebook"}
  ]
}`

export default function JsonInput({ onValidJson }){
  const [input, setInput] = useState(sample)
  const [error, setError] = useState('')

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(input)
      onValidJson(parsed)
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + e.message)
    }
  }

  const handleClear = () => {
    setInput('')
    onValidJson(null)
    setError('')
  }

  return (
    <div className="mb-4">
      <textarea
        className="w-full h-44 p-3 border rounded-md focus:outline-none bg-gray-100 text-gray-900"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />
      {error && <div className="text-red-400 mt-2">{error}</div>}
      <div className="flex gap-2 mt-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleVisualize}>Visualize</button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={handleClear}>Clear</button>
      </div>
    </div>
  )
}
