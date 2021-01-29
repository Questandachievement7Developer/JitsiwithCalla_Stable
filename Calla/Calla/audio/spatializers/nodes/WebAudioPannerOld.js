import { BaseWebAudioPanner } from "./BaseWebAudioPanner";
/**
 * A positioner that uses the WebAudio API's old setPosition method.
 **/
export class WebAudioPannerOld extends BaseWebAudioPanner {
    /**
     * Creates a new positioner that uses the WebAudio API's old setPosition method.
     */
    constructor(id, source, audioContext, destination) {
        super(id, source, audioContext, destination);
        Object.seal(this);
    }
    /**
     * Performs the spatialization operation for the audio source's latest location.
     */
    update(loc, _t) {
        const { p, f } = loc;
        this.node.setPosition(p[0], p[1], p[2]);
        this.node.setOrientation(f[0], f[1], f[2]);
    }
}
//# sourceMappingURL=WebAudioPannerOld.js.map