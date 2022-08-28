export type RoadmapNodeType = {
    id: number;
    content: string;
}

export type RoadmapNodeTreeType = Array<{
    depths: number;
    nodes: RoadmapNodeType[];
}>