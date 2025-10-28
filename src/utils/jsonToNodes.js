let idCounter = 1
function nextId(){ return (idCounter++).toString() }
function isPrimitive(val){ return val === null || ['string','number','boolean'].includes(typeof val) }

export function convertJsonToFlow(json, searchQuery=''){
  idCounter = 1
  const nodes = [], edges = [], levelX = {}

  function addNode(label, meta, level){
    const id = nextId()
    const x = (levelX[level] || 0) * 240
    levelX[level] = (levelX[level] || 0) + 1
    const match = searchQuery && meta.path && meta.path.includes(searchQuery)
    const color = match ? '#ef4444' :
      meta.type==='object' ? '#6366f1' :
      meta.type==='array' ? '#16a34a' :
      '#f59e0b'
    nodes.push({ id, data:{label,meta}, position:{x:x,y:level*120}, style:{background:color,color:'#fff',padding:8,borderRadius:8} })
    return id
  }

  function traverse(obj, path, level, parentId, keyLabel){
    const metaType = Array.isArray(obj)?'array':(isPrimitive(obj)?'primitive':'object')
    const label = keyLabel ? `${keyLabel}` : path
    const nodeId = addNode(label,{path,type:metaType,value:obj},level)
    if(parentId){ edges.push({id:`${parentId}-${nodeId}`,source:parentId,target:nodeId}) }
    if(Array.isArray(obj)){
      obj.forEach((v,i)=>traverse(v,`${path}[${i}]`,level+1,nodeId,`[${i}]`))
    }else if(obj && typeof obj==='object'){
      Object.keys(obj).forEach(k=>traverse(obj[k],`${path}.${k}`,level+1,nodeId,k))
    }
  }
  traverse(json,'$',0,null,null)
  return {nodes,edges}
}
