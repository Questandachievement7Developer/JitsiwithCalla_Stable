import type { CanvasTypes, Context2D } from "kudzu/html/canvas";
import { IImageFetcher } from "kudzu/io/IImageFetcher";
export declare class TileSet {
    private url;
    private fetcher;
    name: string;
    tileWidth: number;
    tileHeight: number;
    tilesPerRow: number;
    tileCount: number;
    image: CanvasTypes;
    collision: Map<number, boolean>;
    constructor(url: URL, fetcher: IImageFetcher);
    load(): Promise<void>;
    isClear(tile: number): boolean;
    draw(g: Context2D, tile: number, x: number, y: number): void;
}
