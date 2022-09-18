import React, { ReactNode } from "react";
import { Node } from "react-flow-renderer";
import { NodeDataTypes } from "../Types";

interface Props {
    data: Node<any>
}

const NodeDescription: React.FC<Props> = (props) => {
    return (
        <div className='w-[200px]'>
            {props.data?.data.title}
        </div>
    )
};

export default NodeDescription;