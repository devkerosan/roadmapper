import axios from "axios";
import { useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeDataTypes } from "../Types";
import PopUpOverNode from "./PopUpOverNode";

interface Props {
    data: NodeDataTypes
}

const RoadmapNode = ({ data }: Props) => {
    const [ogp, setOgp] = useState({ title: "", image: "" });
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios('http://localhost:3000/ogp', { params: { url: data.url } });
            console.log(res.data)
            setOgp(res.data);
        };
        fetchData();
    }, [])
    return (
        <>
            <div>
                <div className='relative flex left-1 z-10 justify-center w-6 h-6 rounded-full bg-red-200 cursor-default'>{data.id}</div>
                <Handle className='absolute w-4 h-4 top-1 z-10' type="target" position={Position.Top} />
                <div className='relative flex flex-col -top-3 w-64 h-auto rounded-md bg-white draggable overflow-hidden shadow-lg'>
                    <img className="" src={ogp.image} />
                    <div className="h-auto p-2">
                        <h1 className="font-bold">{ogp.title}</h1>
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