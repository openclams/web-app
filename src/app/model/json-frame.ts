export default interface JsonFrame {
    graphs: string[]; // Array of graph ids
    activeGrpah: string; // graph id, or null
    size: number; // The width of the frame
}
