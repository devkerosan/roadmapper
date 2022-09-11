import { useState } from 'react'
import { ReactFlowProvider } from 'react-flow-renderer'
import RoadmapNodeTree from './components/RoadmapNodeTree'


const App = () => {
  const [count, setCount] = useState(0)


  return (
    <div>
      <button>test</button>
      <div className="w-[1000px] h-[1000px]">
        <ReactFlowProvider>
          <RoadmapNodeTree />
        </ReactFlowProvider>

      </div>
    </div>

  )
}

export default App
