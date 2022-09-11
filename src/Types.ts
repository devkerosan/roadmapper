export type RoadmapNodeType = {
    id: number;
    content: string;
}

export type RoadmapNodeTreeType = Array<{
    depths: number;
    nodes: RoadmapNodeType[];
}>

export interface NodeDataTypes {
    id: number,
    text: string,
    url: string,
    onButtonClick: (data: NodeDataTypes) => void
}

export interface popUpPosition {
    x: number,
    y: number
}