import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { RoadmapNodeType } from '../Types'

type Props = {
    node: RoadmapNodeType;
    onClick: () => void;
}

const RoadmapNode = forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div ref={ref} className='relative h-auto w-24 mx-2 my-1' onClick={props.onClick}>
            <div className='relative flex left-1 inline-block rounded-full bg-red-200 h-6 w-6 z-10 justify-center items-center text-sm'>
                {props.node.id}
            </div>
            <div className='relative -top-3 flex flex-col h-44 rounded-sm bg-gray-200'>
                <div className='mx-1 mt-4 h-full bg-gray-300'>
                    {props.node.content}
                </div>
                <div className='flex justify-center h-6 m-1 cursor-pointer transition duration-300 hover:bg-gray-300 active:bg-gray-400'>
                    <span className="material-symbols-outlined">
                        expand_more
                    </span>
                </div>
            </div>
        </div>
    )
});

export default RoadmapNode;