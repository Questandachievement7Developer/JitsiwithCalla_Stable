import type { Pose } from "../../positions/Pose";
import { BaseWebAudioPanner } from "./BaseWebAudioPanner";
/**
 * A positioner that uses WebAudio's playback dependent time progression.
 **/
export declare class WebAudioPannerNew extends BaseWebAudioPanner {
    /**
     * Creates a new positioner that uses WebAudio's playback dependent time progression.
     */
    constructor(id: string, source: AudioNode, audioContext: AudioContext, destination: AudioNode);
    /**
     * Performs the spatialization operation for the audio source's latest location.
     */
    update(loc: Pose, t: number): void;
}
