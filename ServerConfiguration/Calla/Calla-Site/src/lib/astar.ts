// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html

// Edits to work with ECMAScript modules by STM/capnmidnight 2020-07-20
// Converted to TypeScript by STM/capnmidnight 2021-01-01

import { arrayClear } from "kudzu/arrays/arrayClear";

function pathTo(node: GridNode): GridNode[] {
    let curr = node;
    const path = new Array<GridNode>();
    while (curr.parent) {
        path.unshift(curr);
        curr = curr.parent;
    }
    return path;
}

export type scoreCallback = (node: GridNode) => number;

function getHeap(): BinaryHeap {
    return new BinaryHeap(function (node: GridNode) {
        return node.f;
    });
}

export type heuristicCallback = (pos0: GridNode, pos1: GridNode) => number;

export interface SearchOptions {
    /**
     * Specifies whether to return the path to the closest node if the target is unreachable.
     **/
    closest?: boolean;

    /**
     * Heuristic function (see astar.heuristics)
     **/
    heuristic?: heuristicCallback;
}

/**
* Perform an A* Search on a graph given a start and end node.
*/
export function search(graph: Graph, start: GridNode, end: GridNode, options?: SearchOptions): GridNode[] {
    graph.cleanDirty();
    options = options || {};
    const heuristic = options.heuristic || heuristics.manhattan;
    const closest = options.closest || false;

    const openHeap = getHeap();
    let closestNode = start; // set the start node to be the closest if required

    start.h = heuristic(start, end);
    graph.markDirty(start);

    openHeap.push(start);

    while (openHeap.size() > 0) {

        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        const currentNode = openHeap.pop();

        // End case -- result has been found, return the traced path.
        if (currentNode === end) {
            return pathTo(currentNode);
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node.
        const neighbors = graph.neighbors(currentNode);

        for (const neighbor of neighbors) {

            if (neighbor.closed || neighbor.isWall()) {
                // Not a valid node to process, skip to next neighbor.
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            const gScore = currentNode.g + neighbor.getCost(currentNode);
            const beenVisited = neighbor.visited;

            if (!beenVisited || gScore < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor, end);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                graph.markDirty(neighbor);
                if (closest) {
                    // If the neighbour is closer than the current closestNode or if it's equally close but has
                    // a cheaper path than the current closest node then it becomes the closest node
                    if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                        closestNode = neighbor;
                    }
                }

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }

    if (closest) {
        return pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
}

// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
export const heuristics = {
    manhattan(pos0: GridNode, pos1: GridNode): number {
        const d1 = Math.abs(pos1.x - pos0.x);
        const d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    },

    diagonal(pos0: GridNode, pos1: GridNode): number {
        const D = 1;
        const D2 = Math.sqrt(2);
        const d1 = Math.abs(pos1.x - pos0.x);
        const d2 = Math.abs(pos1.y - pos0.y);
        return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
    }
};

export function cleanNode(node: GridNode): void {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
}

export interface GraphOptions {
    /**
     * Specifies whether diagonal moves are allowed
     **/
    diagonal?: boolean;
}

/**
 * A graph memory structure
 * @param gridIn 2D array of input weights
 */
export class Graph {
    nodes: GridNode[];
    dirtyNodes = new Array<GridNode>();
    grid: GridNode[][] = null;
    diagonal: boolean = true;

    constructor(gridIn: number[][], options?: GraphOptions) {
        if (options) {
            this.diagonal = options.diagonal !== false;
        }

        this.nodes = new Array<GridNode>();
        this.grid = new Array<GridNode[]>();

        for (let x = 0; x < gridIn.length; x++) {
            const row = gridIn[x];
            this.grid[x] = new Array<GridNode>(row.length);

            for (let y = 0; y < row.length; y++) {
                const node = new GridNode(x, y, row[y]);
                this.grid[x][y] = node;
                this.nodes.push(node);
            }
        }
        this.init();
    }

    init(): void {
        arrayClear(this.dirtyNodes);
        for (let i = 0; i < this.nodes.length; i++) {
            cleanNode(this.nodes[i]);
        }
    }

    cleanDirty(): void {
        for (let i = 0; i < this.dirtyNodes.length; i++) {
            cleanNode(this.dirtyNodes[i]);
        }
        arrayClear(this.dirtyNodes);
    }

    markDirty(node: GridNode): void {
        this.dirtyNodes.push(node);
    }

    neighbors(node: GridNode): GridNode[] {
        const ret = [];
        const x = node.x;
        const y = node.y;
        const grid = this.grid;

        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }

        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }

        // South
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }

        // North
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }

        if (this.diagonal) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1]);
            }

            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1]);
            }

            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1]);
            }

            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1]);
            }
        }

        return ret;
    }

    toString(): string {
        const graphString = [];
        const nodes = this.grid;
        for (let x = 0; x < nodes.length; x++) {
            const rowDebug = [];
            const row = nodes[x];
            for (let y = 0; y < row.length; y++) {
                rowDebug.push(row[y].weight);
            }
            graphString.push(rowDebug.join(" "));
        }
        return graphString.join("\n");
    }
}

export class GridNode {
    f = 0;
    g = 0;
    h = 0;
    visited = false;
    closed = false;
    parent: GridNode = null;

    constructor(public x: number, public y: number, public weight: number) {
    }

    toString(): string {
        return `[${this.x} ${this.y}]`;
    }

    getCost(fromNeighbor: GridNode): number {
        // Take diagonal weight into consideration.
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * 1.41421;
        }
        return this.weight;
    }

    isWall(): boolean {
        return this.weight === 0;
    }
}

class BinaryHeap {
    private content = new Array<GridNode>();

    constructor(private scoreFunction: scoreCallback) {
    }

    push(element: GridNode): void {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    }

    pop(): GridNode {
        // Store the first element so we can return it later.
        const result = this.content[0];
        // Get the element at the end of the array.
        const end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    }

    remove(node: GridNode): void {
        const i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        const end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            } else {
                this.bubbleUp(i);
            }
        }
    }

    size(): number {
        return this.content.length;
    }

    rescoreElement(node: GridNode): void {
        this.sinkDown(this.content.indexOf(node));
    }

    sinkDown(n: number): void {
        // Fetch the element that has to be sunk.
        const element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            const parentN = ((n + 1) >> 1) - 1;
            const parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    }

    bubbleUp(n: number): void {
        // Look up the target element and its score.
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            const child2N = (n + 1) << 1;
            const child1N = child2N - 1;
            // This is used to store the new position of the element, if any.
            let swap: number = null;
            let child1Score: number;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                const child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
}