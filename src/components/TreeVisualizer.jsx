import React, { useMemo, useRef, useCallback } from 'react'
import ReactFlow, { MiniMap, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { convertJsonToFlow } from '../utils/jsonToNodes'
import { toPng } from 'html-to-image'

export default function TreeVisualizer({ data, searchQuery, darkMode }){
  const wrapper = useRef(null)
  const { nodes, edges } = useMemo(()=> convertJsonToFlow(data, searchQuery), [data, searchQuery])

  const onNodeClick = useCallback((_, node)=>{
    const path = node.data?.meta?.path || node.id
    navigator.clipboard.writeText(path).then(()=> alert('Copied path: ' + path))
  },[])

  const handleDownload = async ()=>{
    try{
      const dataUrl = await toPng(wrapper.current)
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'json-tree.png'
      a.click()
    }catch(e){ alert('Failed to export image') }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={handleDownload} className="px-3 py-1 bg-gray-600 text-white rounded">Download PNG</button>
      </div>
      <div ref={wrapper} className={`h-[65vh] border rounded ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
