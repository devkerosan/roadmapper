import axios from "axios";
import { useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { nodeState, edgeState } from "../atom";
import { NodeDataTypes } from "../Types";
import PopUpOverNode from "./PopUpOverNode";

interface Props {
    data: NodeDataTypes
}

const RoadmapNode = ({ data }: Props) => {
    const [nodes, setNodes] = useRecoilState(nodeState);
    const [edges, setEdges] = useRecoilState(edgeState);
    //↓サーバ側のデータを更新→ノードがupdateされるべき
    const handleDeleteClick = () => {
        const filteredNodes = nodes.filter((val) => val.data.id !== data.id);
        setNodes(filteredNodes);
        const filteredEdges = edges.filter((val) => val.source !== data.id.toString() && val.target !== data.id.toString())
        console.log(filteredEdges)
        const connectedEdges = edges.filter((val) => val.source === data.id.toString() || val.target === data.id.toString())
        setEdges(filteredEdges);
        const deleteData = async () => {
            const url = `http://localhost:3001/node/${data.id}`;
            const res = await axios.delete(url);
            connectedEdges.forEach(async (edge) => {
                const edgeUrl = `http://localhost:3001/edge/${edge.id}`
                const edgeRes = await axios.delete(edgeUrl);
            })
        }
        deleteData();
    }
    return (
        <>
            <div>
                <div className='relative flex left-1 z-10 justify-center w-6 h-6 rounded-full bg-red-200 cursor-default' onClick={handleDeleteClick}>{data.id}</div>
                <Handle className='absolute w-4 h-4 top-1 z-10' type="target" position={Position.Top} />
                <div className='relative flex flex-col -top-3 w-64 h-auto rounded-md bg-white draggable overflow-hidden shadow-lg'>
                    <img className="" src={data.image} />
                    <div className="h-auto p-2">
                        <h1 className="font-bold">{data.title}</h1>
                    </div>
                </div>
                <Handle className='absolute w-4 h-4 bottom-7' type="source" position={Position.Bottom} />
            </div>
            <div className='flex justify-center cursor-default' onClick={() => data.onButtonClick(data)}>
                <i className='material-symbols-rounded cursor-pointer'>add_circle</i>
            </div>


        </>
    )
};

export default RoadmapNode