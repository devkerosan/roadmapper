import { useState } from 'react'
import { ReactFlowProvider } from 'react-flow-renderer'
import { RecoilRoot } from 'recoil'
import RoadmapNodeTree from './components/RoadmapNodeTree'


const App = () => {
  const [count, setCount] = useState(0)


  return (
    <RecoilRoot>
      <div className='flex flex-col w-screen h-screen'>
        <header className='flex bg-black text-white text-2xl font-mono h-12 items-center'>
          <span>rekitei. Lexité</span>
        </header>
        <div className='flex flex-row w-full h-full'>
          <div className='w-16 h-full bg-red-200'>a</div>
          <div className="flex flex-col w-full h-full p-2">
            <h1 className='text-4xl font-bold'>React</h1>
            <ReactFlowProvider>
              <RoadmapNodeTree />
            </ReactFlowProvider>

          </div>
        </div>

      </div>
    </RecoilRoot>


  )
}

export default App
