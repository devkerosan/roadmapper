import LeaderLine from "leader-line-new";
import { createRef, useEffect, useLayoutEffect, useRef } from "react";
import { RoadmapNodeType, RoadmapNodeTreeType } from "../Types";
import RoadmapNode from "./RoadmapNode";

type Props = {
    tree: RoadmapNodeTreeType;
}

const RoadmapNodeTree: React.FC<Props> = (props) => {
    const depthsList = props.tree.map(() => "");
    const nodesList = props.tree.reduce((prev: string[][], current) => {
        const node = current.nodes.map(() => {
            return '';
        });
        return [...prev, node];
    }, [])
    console.log(depthsList, nodesList)
    const connectRefs = useRef(
        depthsList.map(() => createRef<HTMLDivElement>())
    );
    const positionRefs = useRef(
        nodesList.map((val) => {
            return val.map(() => createRef<HTMLDivElement>())
        })
    );
    const handleClick = () => {
        console.log("click")
    }
    useEffect(() => {
        console.log(positionRefs.current[1][1].current)
        if (positionRefs.current[0][0].current && positionRefs.current[1][1].current && positionRefs.current[1][0].current) {
            new LeaderLine(
                positionRefs.current[0][0].current,
                positionRefs.current[1][1].current,
                {
                    color: '#000000',
                    outline: false,
                    path: 'straight',
                    startPlug: 'disc',
                    endPlug: 'disc'
                }
            );
            new LeaderLine(
                positionRefs.current[0][0].current,
                positionRefs.current[1][0].current,
                {
                    color: '#000000',
                    outline: false,
                    path: 'straight',
                    startPlug: 'disc',
                    endPlug: 'disc'
                }
            );
        }
    }, [positionRefs.current[0][0], positionRefs.current[1][1]])
    return (
        <div className='flex flex-col items-center'>
            {props.tree.map((nodes, i) => {
                return (
                    <div key={nodes.depths} className='flex flex-col m-3'>
                        <div className='flex'>
                            {nodes.nodes.map((node, j) => {
                                return (
                                    <RoadmapNode ref={positionRefs.current[i][j]} key={node.id} node={node} onClick={() => handleClick()} />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

export default RoadmapNodeTree;