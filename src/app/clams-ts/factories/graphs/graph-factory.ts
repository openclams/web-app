import JsonGraph from '../../schema/graphs/json-graph';
import Graph from '../../model/graphs/graph';
import UserProfile from '../../model/graphs/user-profile/user-profile';
import SequenceDiagram from '../../model/graphs/sequence-diagram/sequence-diagram';
import Model from '../../model/model';
import NodeFactory from './node-factory';
import EdgeFactory from './edge-factory';
import State from '../../model/graphs/user-profile/state';


export default class GraphFactory {
    public static fromJSON(jsonGraph: JsonGraph): Graph {
        let graph: Graph = null;
        if (jsonGraph.type === 'UserProfile') {
            graph = Object.assign(new UserProfile(null), jsonGraph) as UserProfile;
        } else {
            graph = Object.assign(new SequenceDiagram(null), jsonGraph) as SequenceDiagram;
        }
        if (this instanceof Model) {
            graph.model = this;
        }
        graph.nodes = jsonGraph.nodes.map(jsonNode => NodeFactory.fromJSON.call(graph, jsonNode));
        graph.edges = jsonGraph.edges.map(jsonEdge => EdgeFactory.fromJSON.call(graph, jsonEdge));
        return graph;
    }

    /**
     * Call this method after all graphs are inilized.
     * We connect all states to their sequence diagrams.
     * ISSUE 9: This function is polynomial, and not efficient.
     *          We can introduce a cache (map) to gain speed up.
     */
    public static connectStates(jsonGraph: JsonGraph) {
        if (jsonGraph.type === 'UserProfile') {
            if (this instanceof Model) {
                const model = this as Model;
                const graph = model.graphs.find(g => g.id === jsonGraph.id);
                graph.nodes.forEach(node => {
                    const jsonState = jsonGraph.nodes.find(n => n.id === node.id);
                    if (node instanceof State) {
                        node.sequenceDiagram = model.graphs.find(g => g.id === jsonState.graph) as SequenceDiagram;
                    }
                });
            }
        }
    }

    public static toJSON(graph: Graph): JsonGraph {
        return {
            id: graph.id,
            lastId: graph.lastId,
            name: graph.name,
            type: graph.getType(),
            nodes: graph.nodes.map(node => NodeFactory.toJSON(node)),
            edges: graph.edges.map(edge => EdgeFactory.toJSON(edge))
        };
    }
}
