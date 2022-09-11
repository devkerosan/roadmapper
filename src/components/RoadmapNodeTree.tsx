import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { Node, Edge, addEdge, applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange } from "react-flow-renderer";
import { NodeDataTypes, popUpPosition } from "../Types";
import NodeDescription from "./NodeDescription";
import NodeEditPanel from "./NodeEditPanel";
import PopUpOverNode from "./PopUpOverNode";
import RoadmapNode from "./RoadmapNode";

const nodeTypes = {
    customNode: RoadmapNode
}

const RoadmapNodeTree: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [nodeDescription, setNodeDescription] = useState<Node>();
    const urlRef = useRef("");
    const edgeSourceTarget = useRef({ source: '', target: '' });
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge({ ...connection, type: 'smoothstep' }, eds)),
        [setEdges]
    );

    const addNode = (data: NodeDataTypes) => {
        setNodes((nds) => {
            const clickedNode = nds.filter((val) => val.data === data);
            console.log(urlRef.current)
            const newNode = {
                id: String(nds.length + 1),
                data: {
                    id: String(nds.length + 1),
                    text: 'bb',
                    url: urlRef.current,
                    onButtonClick: (data2: NodeDataTypes) => addNode(data2)
                },
                type: 'customNode',
                position: { x: clickedNode[0].position.x, y: clickedNode[0].position.y + 200 },
                dragHandle: '.draggable'
            };
            console.log(newNode)

            edgeSourceTarget.current = { source: clickedNode[0].id, target: newNode.id };
            return nds.concat(newNode);
        });
        setEdges((eds) => {
            const newEdge = {
                id: 'e' + edgeSourceTarget.current.source + '-' + edgeSourceTarget.current.target,
                source: edgeSourceTarget.current.source,
                target: edgeSourceTarget.current.target,
                type: 'smoothstep'
            }
            return eds.concat(newEdge);
        })
    }
    const handleClick = (url: string) => {
        urlRef.current = url;
    }


    useEffect(() => {
        const fetchNodes = async () => {
            const res = await axios('http://localhost:3000/');
            res.data.map((nodeData: any) => {
                const data = nodeData.data;
                data.onButtonClick = (data: NodeDataTypes) => addNode(data)
                console.log(data)
            })
            setNodes(res.data);
            console.log(res.data)
            setEdges([
                { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
            ])
        }
        fetchNodes();
    }, [])
    return (
        <div className='flex w-full h-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            />
            <NodeDescription data={nodes.filter((node) => node.selected === true)[0]} />
            <NodeEditPanel onClick={(data) => handleClick(data)} />

        </div>
    )
};

export default RoadmapNodeTree;