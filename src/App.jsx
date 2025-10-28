import { useState, useEffect } from 'react'
import JsonInput from './components/JsonInput'
import TreeVisualizer from './components/TreeVisualizer'
import SearchBar from './components/SearchBar'

export default function App(){
  const [jsonData, setJsonData] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(()=>{
    const saved = localStorage.getItem('theme')
    if(saved){ setDarkMode(saved === 'dark') }
  }, [])

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-6xl mx-auto rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">JSON Tree Visualizer</h1>
          <button
            onClick={()=>setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <JsonInput onValidJson={setJsonData} />
        {jsonData ? (
          <>
            <SearchBar onSearch={setSearchQuery} />
            <TreeVisualizer data={jsonData} searchQuery={searchQuery} darkMode={darkMode} />
          </>
        ) : (
          <p className="text-sm mt-4 opacity-80">Paste JSON above and click Visualize.</p>
        )}
      </div>
    </div>
  )
}
