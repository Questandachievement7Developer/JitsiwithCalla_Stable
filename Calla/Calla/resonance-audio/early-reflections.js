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
import { vec3 } from "gl-matrix";
import { isArray, isGoodNumber } from "kudzu/typeChecks";
import { Direction } from "./Direction";
import { DEFAULT_POSITION, DEFAULT_REFLECTION_COEFFICIENTS, DEFAULT_REFLECTION_CUTOFF_FREQUENCY, DEFAULT_REFLECTION_MAX_DURATION, DEFAULT_REFLECTION_MIN_DISTANCE, DEFAULT_REFLECTION_MULTIPLIER, DEFAULT_ROOM_DIMENSIONS, DEFAULT_SPEED_OF_SOUND, DirectionSign, DirectionToAxis, DirectionToDimension } from "./utils";
/**
* Ray-tracing-based early reflections model.
*/
export class EarlyReflections {
    /**
     * Ray-tracing-based early reflections model.
     */
    constructor(context, options) {
        this.listenerPosition = vec3.copy(vec3.create(), DEFAULT_POSITION);
        this.speedOfSound = DEFAULT_SPEED_OF_SOUND;
        this.coefficients = {
            left: DEFAULT_REFLECTION_COEFFICIENTS.left,
            right: DEFAULT_REFLECTION_COEFFICIENTS.right,
            front: DEFAULT_REFLECTION_COEFFICIENTS.front,
            back: DEFAULT_REFLECTION_COEFFICIENTS.back,
            up: DEFAULT_REFLECTION_COEFFICIENTS.up,
            down: DEFAULT_REFLECTION_COEFFICIENTS.down,
        };
        this.halfDimensions = {
            width: 0.5 * DEFAULT_ROOM_DIMENSIONS.width,
            height: 0.5 * DEFAULT_ROOM_DIMENSIONS.height,
            depth: 0.5 * DEFAULT_ROOM_DIMENSIONS.depth,
        };
        if (options) {
            if (isGoodNumber(options?.speedOfSound)) {
                this.speedOfSound = options.speedOfSound;
            }
            if (isArray(options?.listenerPosition)
                && options.listenerPosition.length === 3
                && isGoodNumber(options.listenerPosition[0])
                && isGoodNumber(options.listenerPosition[1])
                && isGoodNumber(options.listenerPosition[2])) {
                this.listenerPosition[0] = options.listenerPosition[0];
                this.listenerPosition[1] = options.listenerPosition[1];
                this.listenerPosition[2] = options.listenerPosition[2];
            }
        }
        // Create nodes.
        this.input = context.createGain();
        this.output = context.createGain();
        this.lowpass = context.createBiquadFilter();
        this.merger = context.createChannelMerger(4); // First-order encoding only.
        this.delays = {
            left: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION),
            right: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION),
            front: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION),
            back: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION),
            up: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION),
            down: context.createDelay(DEFAULT_REFLECTION_MAX_DURATION)
        };
        this.gains = {
            left: context.createGain(),
            right: context.createGain(),
            front: context.createGain(),
            back: context.createGain(),
            up: context.createGain(),
            down: context.createGain()
        };
        this.inverters = {
            right: context.createGain(),
            back: context.createGain(),
            down: context.createGain()
        };
        // Connect audio graph for each wall reflection and initialize encoder directions, set delay times and gains to 0.
        for (const direction of Object.values(Direction)) {
            const delay = this.delays[direction];
            const gain = this.gains[direction];
            delay.delayTime.value = 0;
            gain.gain.value = 0;
            this.delays[direction] = delay;
            this.gains[direction] = gain;
            this.lowpass.connect(delay);
            delay.connect(gain);
            gain.connect(this.merger, 0, 0);
            // Initialize inverters for opposite walls ('right', 'down', 'back' only).
            if (direction === Direction.Right
                || direction == Direction.Back
                || direction === Direction.Down) {
                this.inverters[direction].gain.value = -1;
            }
        }
        this.input.connect(this.lowpass);
        // Initialize lowpass filter.
        this.lowpass.type = 'lowpass';
        this.lowpass.frequency.value = DEFAULT_REFLECTION_CUTOFF_FREQUENCY;
        this.lowpass.Q.value = 0;
        // Connect nodes.
        // Connect gains to ambisonic channel output.
        // Left: [1 1 0 0]
        // Right: [1 -1 0 0]
        // Up: [1 0 1 0]
        // Down: [1 0 -1 0]
        // Front: [1 0 0 1]
        // Back: [1 0 0 -1]
        this.gains.left.connect(this.merger, 0, 1);
        this.gains.right.connect(this.inverters.right);
        this.inverters.right.connect(this.merger, 0, 1);
        this.gains.up.connect(this.merger, 0, 2);
        this.gains.down.connect(this.inverters.down);
        this.inverters.down.connect(this.merger, 0, 2);
        this.gains.front.connect(this.merger, 0, 3);
        this.gains.back.connect(this.inverters.back);
        this.inverters.back.connect(this.merger, 0, 3);
        this.merger.connect(this.output);
        // Initialize.
        this.setRoomProperties(options?.dimensions, options?.coefficients);
    }
    /**
     * Set the room's properties which determines the characteristics of
     * reflections.
     * @param dimensions
     * Room dimensions (in meters). Defaults to
     * {@linkcode DEFAULT_ROOM_DIMENSIONS DEFAULT_ROOM_DIMENSIONS}.
     * @param coefficients
     * Frequency-independent reflection coeffs per wall. Defaults to
     * {@linkcode DEFAULT_REFLECTION_COEFFICIENTS
     * DEFAULT_REFLECTION_COEFFICIENTS}.
     */
    setRoomProperties(dimensions, coefficients) {
        if (dimensions == undefined) {
            dimensions = {
                width: DEFAULT_ROOM_DIMENSIONS.width,
                height: DEFAULT_ROOM_DIMENSIONS.height,
                depth: DEFAULT_ROOM_DIMENSIONS.depth,
            };
        }
        if (isGoodNumber(dimensions.width)
            && isGoodNumber(dimensions.height)
            && isGoodNumber(dimensions.depth)) {
            this.halfDimensions.width = 0.5 * dimensions.width;
            this.halfDimensions.height = 0.5 * dimensions.height;
            this.halfDimensions.depth = 0.5 * dimensions.depth;
        }
        if (coefficients == undefined) {
            coefficients = {
                left: DEFAULT_REFLECTION_COEFFICIENTS.left,
                right: DEFAULT_REFLECTION_COEFFICIENTS.right,
                front: DEFAULT_REFLECTION_COEFFICIENTS.front,
                back: DEFAULT_REFLECTION_COEFFICIENTS.back,
                up: DEFAULT_REFLECTION_COEFFICIENTS.up,
                down: DEFAULT_REFLECTION_COEFFICIENTS.down,
            };
        }
        if (isGoodNumber(coefficients.left)
            && isGoodNumber(coefficients.right)
            && isGoodNumber(coefficients.front)
            && isGoodNumber(coefficients.back)
            && isGoodNumber(coefficients.up)
            && isGoodNumber(coefficients.down)) {
            this.coefficients.left = coefficients.left;
            this.coefficients.right = coefficients.right;
            this.coefficients.front = coefficients.front;
            this.coefficients.back = coefficients.back;
            this.coefficients.up = coefficients.up;
            this.coefficients.down = coefficients.down;
        }
        // Update listener position with new room properties.
        this.setListenerPosition(this.listenerPosition);
    }
    dispose() {
        // Connect nodes.
        this.input.disconnect(this.lowpass);
        for (const property of Object.values(Direction)) {
            const delay = this.delays[property];
            const gain = this.gains[property];
            this.lowpass.disconnect(delay);
            delay.disconnect(gain);
            gain.disconnect(this.merger, 0, 0);
        }
        // Connect gains to ambisonic channel output.
        // Left: [1 1 0 0]
        // Right: [1 -1 0 0]
        // Up: [1 0 1 0]
        // Down: [1 0 -1 0]
        // Front: [1 0 0 1]
        // Back: [1 0 0 -1]
        this.gains.left.disconnect(this.merger, 0, 1);
        this.gains.right.disconnect(this.inverters.right);
        this.inverters.right.disconnect(this.merger, 0, 1);
        this.gains.up.disconnect(this.merger, 0, 2);
        this.gains.down.disconnect(this.inverters.down);
        this.inverters.down.disconnect(this.merger, 0, 2);
        this.gains.front.disconnect(this.merger, 0, 3);
        this.gains.back.disconnect(this.inverters.back);
        this.inverters.back.disconnect(this.merger, 0, 3);
        this.merger.disconnect(this.output);
    }
    /**
     * Set the listener's position (in meters),
     * where [0,0,0] is the center of the room.
     */
    setListenerPosition(v) {
        // Assign listener position.
        vec3.copy(this.listenerPosition, v);
        // Assign delay & attenuation values using distances.
        for (const direction of Object.values(Direction)) {
            const dim = this.halfDimensions[DirectionToDimension[direction]];
            const axis = this.listenerPosition[DirectionToAxis[direction]];
            const sign = DirectionSign[direction];
            const distance = DEFAULT_REFLECTION_MULTIPLIER * Math.max(0, dim + sign * axis) + DEFAULT_REFLECTION_MIN_DISTANCE;
            // Compute and assign delay (in seconds).
            const delayInSecs = distance / this.speedOfSound;
            this.delays[direction].delayTime.value = delayInSecs;
            // Compute and assign gain, uses logarithmic rolloff: "g = R / (d + 1)"
            const attenuation = this.coefficients[direction] / distance;
            this.gains[direction].gain.value = attenuation;
        }
    }
}
//# sourceMappingURL=early-reflections.js.map