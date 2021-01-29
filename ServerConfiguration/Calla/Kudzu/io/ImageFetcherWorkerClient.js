import { renderImageBitmapFaces } from "../graphics2d/renderFace";
import { hasImageBitmap, hasOffscreenCanvasRenderingContext2D } from "../html/canvas";
import { splitProgress } from "../tasks/splitProgress";
import { isNullOrUndefined, isNumber, isString } from "../typeChecks";
import { WorkerClient } from "../workers/WorkerClient";
import { ImageFetcher } from "./ImageFetcher";
export class ImageFetcherWorkerClient extends ImageFetcher {
    constructor(scriptPath, minScriptPath, workerPoolSize = 1) {
        super();
        if (isNumber(minScriptPath)) {
            workerPoolSize = minScriptPath;
            minScriptPath = undefined;
        }
        if (isNullOrUndefined(workerPoolSize)) {
            workerPoolSize = 1;
        }
        if (isString(minScriptPath)) {
            this.worker = new WorkerClient(scriptPath, minScriptPath, workerPoolSize);
        }
        else {
            this.worker = new WorkerClient(scriptPath, workerPoolSize);
        }
    }
    async _getBuffer(path, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("getBuffer", [path, headerMap], onProgress);
        }
        else {
            return await super._getBuffer(path, headerMap, onProgress);
        }
    }
    async _postObjectForBuffer(path, obj, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("postObjectForBuffer", [path, obj, headerMap], onProgress);
        }
        else {
            return await super._postObjectForBuffer(path, obj, headerMap, onProgress);
        }
    }
    async _getObject(path, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("getObject", [path, headerMap], onProgress);
        }
        else {
            return await super._getObject(path, headerMap, onProgress);
        }
    }
    async _postObjectForObject(path, obj, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("postObjectForObject", [path, headerMap, obj], onProgress);
        }
        else {
            return await super._postObjectForObject(path, obj, headerMap, onProgress);
        }
    }
    async _getFile(path, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("getFile", [path, headerMap], onProgress);
        }
        else {
            return await super._getFile(path, headerMap, onProgress);
        }
    }
    async _postObjectForFile(path, obj, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("postObjectForFile", [path, headerMap, obj], onProgress);
        }
        else {
            return await super._postObjectForFile(path, obj, headerMap, onProgress);
        }
    }
    async _getImageBitmap(path, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled) {
            return await this.worker.execute("getImageBitmap", [path, headerMap], onProgress);
        }
        else {
            return await super._getImageBitmap(path, headerMap, onProgress);
        }
    }
    async _postObjectForImageBitmap(path, obj, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled && hasImageBitmap) {
            return await this.worker.execute("postObjectForImageBitmap", [path, headerMap, obj], onProgress);
        }
        else {
            return await super._postObjectForImageBitmap(path, obj, headerMap, onProgress);
        }
    }
    async _getCubes(path, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled
            && hasImageBitmap
            && hasOffscreenCanvasRenderingContext2D) {
            return await this.worker.execute("getCubes", [path, headerMap], onProgress);
        }
        else {
            return await super._getCubes(path, headerMap, onProgress);
        }
    }
    async _getEquiMaps(path, interpolation, maxWidth, headerMap, onProgress) {
        onProgress = this.normalizeOnProgress(headerMap, onProgress);
        headerMap = this.normalizeHeaderMap(headerMap);
        if (this.worker.enabled
            && hasImageBitmap
            && hasOffscreenCanvasRenderingContext2D) {
            const splits = splitProgress(onProgress, [1, 6]);
            const imgData = await this._getImageData(path, headerMap, splits.shift());
            return await renderImageBitmapFaces((readData, faceName, interpolation, maxWidth, onProgress) => this.worker.execute("renderFace", [readData, faceName, interpolation, maxWidth], onProgress), imgData, interpolation, maxWidth, splits.shift());
        }
        else {
            return await super.getEquiMaps(path, interpolation, maxWidth, onProgress);
        }
    }
}
//# sourceMappingURL=ImageFetcherWorkerClient.js.map