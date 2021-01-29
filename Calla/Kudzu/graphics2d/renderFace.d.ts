import type { CanvasTypes } from "../html/canvas";
import type { progressCallback } from "../tasks/progressCallback";
import { CubeMapFace } from "./CubeMapFace";
import { InterpolationType } from "./InterpolationType";
export declare function renderCanvasFace(readData: ImageData, faceName: CubeMapFace, interpolation: InterpolationType, maxWidth?: number, onProgress?: progressCallback): Promise<CanvasTypes>;
export declare function renderImageBitmapFace(readData: ImageData, faceName: CubeMapFace, interpolation: InterpolationType, maxWidth: number, onProgress?: progressCallback): Promise<ImageBitmap>;
export declare type renderCanvasFacesCallback = (readData: ImageData, faceName: CubeMapFace, interpolation: InterpolationType, maxWidth: number, onProgress?: progressCallback) => Promise<CanvasTypes>;
export declare function renderCanvasFaces(renderFace: renderCanvasFacesCallback, imgData: ImageData, interpolation: InterpolationType, maxWidth: number, onProgress?: progressCallback): Promise<CanvasTypes[]>;
export declare type renderImageBitmapFacesCallback = (readData: ImageData, faceName: CubeMapFace, interpolation: InterpolationType, maxWidth: number, onProgress?: progressCallback) => Promise<ImageBitmap>;
export declare function renderImageBitmapFaces(renderFace: renderImageBitmapFacesCallback, imgData: ImageData, interpolation: InterpolationType, maxWidth: number, onProgress?: progressCallback): Promise<ImageBitmap[]>;
