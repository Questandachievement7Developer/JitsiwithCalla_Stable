import { progressCallback } from "../tasks/progressCallback";
import { WorkerServer } from "../workers/WorkerServer";
import { Fetcher } from "./Fetcher";
import { getPartsReturnType } from "./getPartsReturnType";

export class FetcherWorkerServer extends WorkerServer {

    constructor(self: DedicatedWorkerGlobalScope) {
        super(self);

        const fetcher = new Fetcher();

        this.add(
            "getBuffer",
            (path: string, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.getBuffer(path, headerMap, onProgress),
            (parts: getPartsReturnType) => [parts.buffer]);

        this.add(
            "postObjectForBuffer",
            (path: string, obj: any, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.postObjectForBuffer(path, obj, headerMap, onProgress),
            (parts: getPartsReturnType) => [parts.buffer]);

        this.add(
            "getObject",
            (path: string, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.getObject(path, headerMap, onProgress));

        this.add(
            "postObjectForObject",
            (path: string, obj: any, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.postObjectForObject(path, obj, headerMap, onProgress));

        this.add(
            "getFile",
            (path: string, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.getFile(path, headerMap, onProgress));

        this.add(
            "postObjectForFile",
            (path: string, obj: any, headerMap: Map<string, string>, onProgress: progressCallback) =>
                fetcher.postObjectForFile(path, obj, headerMap, onProgress));
    }
}