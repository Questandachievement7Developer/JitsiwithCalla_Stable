/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @file Omnitone FOARenderer. This is user-facing API for the first-order
 * ambisonic decoder and the optimized binaural renderer.
 */


import { mat3, mat4 } from "gl-matrix";
import { assertNever } from "kudzu/typeChecks";
import type { IDisposable } from "kudzu/using";
import { BufferDataType, BufferList } from './buffer-list';
import { FOAConvolver } from './foa-convolver';
import { FOARotator } from './foa-rotator';
import { ChannelMap, FOARouter } from './foa-router';
import { RenderingMode } from "./rendering-mode";
import FOAHrirBase64 from './resources/omnitone-foa-hrir-base64';
import { log } from "./utils";

/**
 * Configuration for the FAORenderer class
 **/
export interface FOARendererOptions {
    channelMap?: ChannelMap|number[];
    hrirPathList?: string[];
    renderingMode?: RenderingMode;
}

/**
 * Omnitone FOA renderer class. Uses the optimized convolution technique.
 */
export class FOARenderer implements IDisposable {
    private context: BaseAudioContext;
    private config: FOARendererOptions;
    private bypass: GainNode;
    private router: FOARouter;
    private convolver: FOAConvolver;

    rotator: FOARotator;
    input: GainNode;
    output: GainNode;

    /**
     * Omnitone FOA renderer class. Uses the optimized convolution technique.
     */
    constructor(context: BaseAudioContext, options: FOARendererOptions) {
        this.context = context;

        this.config = Object.assign({
            channelMap: ChannelMap.Default,
            renderingMode: RenderingMode.Ambisonic,
        }, options);

        if (this.config.channelMap instanceof Array
            && this.config.channelMap.length !== 4) {
            throw new Error(
                'FOARenderer: Invalid channel map. (got ' + this.config.channelMap
                + ')');
        }

        if (this.config.hrirPathList && this.config.hrirPathList.length !== 2) {
            throw new Error(
                'FOARenderer: Invalid HRIR URLs. It must be an array with ' +
                '2 URLs to HRIR files. (got ' + this.config.hrirPathList + ')');
        }

        this.buildAudioGraph();
    }


    /**
     * Builds the internal audio graph.
     */
    private buildAudioGraph(): void {
        this.input = this.context.createGain();
        this.output = this.context.createGain();
        this.bypass = this.context.createGain();
        this.router = new FOARouter(this.context, this.config.channelMap);
        this.rotator = new FOARotator(this.context);
        this.convolver = new FOAConvolver(this.context);
        this.input.connect(this.router.input);
        this.input.connect(this.bypass);
        this.router.output.connect(this.rotator.input);
        this.rotator.output.connect(this.convolver.input);
        this.convolver.output.connect(this.output);

        this.input.channelCount = 4;
        this.input.channelCountMode = 'explicit';
        this.input.channelInterpretation = 'discrete';
    }

    dispose(): void {
        if (this.getRenderingMode() === RenderingMode.Bypass) {
            this.bypass.connect(this.output);
        }

        this.input.disconnect(this.router.input);
        this.input.disconnect(this.bypass);
        this.router.output.disconnect(this.rotator.input);
        this.rotator.output.disconnect(this.convolver.input);
        this.convolver.output.disconnect(this.output);
        this.convolver.dispose();
        this.rotator.dispose();
        this.router.dispose();
    }

    /**
     * Initializes and loads the resource for the renderer.
     */
    async initialize(): Promise<void> {
        const bufferList = this.config.hrirPathList
            ? new BufferList(this.context, this.config.hrirPathList, { dataType: BufferDataType.URL })
            : new BufferList(this.context, FOAHrirBase64, { dataType: BufferDataType.BASE64 });
        try {
            const hrirBufferList = await bufferList.load();
            this.convolver.setHRIRBufferList(hrirBufferList);
            this.setRenderingMode(this.config.renderingMode);
        }
        catch (exp) {
            const errorMessage = `FOARenderer: HRIR loading/decoding (mode: ${this.config.renderingMode}) failed. Reason: ${exp.message}`;
            throw new Error(errorMessage);
        }
    }


    /**
     * Set the channel map.
     * @param channelMap - Custom channel routing for FOA stream.
     */
    setChannelMap(channelMap: ChannelMap|number[]): void {
        if (channelMap.toString() !== this.config.channelMap.toString()) {
            log(
                'Remapping channels ([' + this.config.channelMap.toString() +
                '] -> [' + channelMap.toString() + ']).');
            if (channelMap instanceof Array) {
                this.config.channelMap = channelMap.slice();
            }
            else {
                this.config.channelMap = channelMap;
            }
            this.router.setChannelMap(this.config.channelMap);
        }
    }


    /**
     * Updates the rotation matrix with 3x3 matrix.
     * @param rotationMatrix3 - A 3x3 rotation matrix. (column-major)
     */
    setRotationMatrix3(rotationMatrix3: mat3): void {
        this.rotator.setRotationMatrix3(rotationMatrix3);
    }


    /**
     * Updates the rotation matrix with 4x4 matrix.
     * @param rotationMatrix4 - A 4x4 rotation matrix. (column-major)
     */
    setRotationMatrix4(rotationMatrix4: mat4): void {
        this.rotator.setRotationMatrix4(rotationMatrix4);
    }

    getRenderingMode(): RenderingMode {
        return this.config.renderingMode;
    }

    /**
     * Set the rendering mode.
     * @param mode - Rendering mode.
     *  - 'ambisonic': activates the ambisonic decoding/binaurl rendering.
     *  - 'bypass': bypasses the input stream directly to the output. No ambisonic
     *    decoding or encoding.
     *  - 'off': all the processing off saving the CPU power.
     */
    setRenderingMode(mode: RenderingMode): void {
        if (mode === this.config.renderingMode) {
            return;
        }

        switch (mode) {
            case RenderingMode.Ambisonic:
                this.convolver.enable();
                this.bypass.disconnect();
                break;
            case RenderingMode.Bypass:
                this.convolver.disable();
                this.bypass.connect(this.output);
                break;
            case RenderingMode.None:
                this.convolver.disable();
                this.bypass.disconnect();
                break;
            default: assertNever(mode);
        }

        this.config.renderingMode = mode;
    }
}