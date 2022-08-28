import { useState } from 'react'
import RoadmapNodeTree from './components/RoadmapNodeTree'


const App = () => {
  const [count, setCount] = useState(0)


  return (
    <div className="">
      <RoadmapNodeTree tree={[{ depths: 0, nodes: [{ id: 1, content: "test" }] }, { depths: 1, nodes: [{ id: 2, content: "test" }, { id: 3, content: "test" }, { id: 4, content: "test" }] }]} />
    </div>
  )
}

export default App
