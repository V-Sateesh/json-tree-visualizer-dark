import { useState } from 'react'

export default function SearchBar({ onSearch }){
  const [query, setQuery] = useState('')

  const handleSearch = ()=> onSearch(query.trim())

  return (
    <div className="flex gap-2 items-center mb-3">
      <input
        type="text"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder='Search JSON path (e.g., $.user.address.city)'
        className="flex-1 border px-3 py-2 rounded text-gray-900"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-green-600 text-white rounded">Search</button>
    </div>
  )
}
