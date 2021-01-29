export default rtcUtils;
declare const rtcUtils: RTCUtils;
/**
 *
 */
declare class RTCUtils extends Listenable {
    /**
     * Depending on the browser, sets difference instance methods for
     * interacting with user media and adds methods to native WebRTC-related
     * objects. Also creates an instance variable for peer connection
     * constraints.
     *
     * @param {Object} options
     * @returns {void}
     */
    init(options?: any): void;
    enumerateDevices: Function;
    RTCPeerConnectionType: any;
    attachMediaStream: Function;
    getStreamID: ({ id }: {
        id: any;
    }) => any;
    getTrackID: ({ id }: {
        id: any;
    }) => any;
    /**
     * Creates instance objects for peer connection constraints both for p2p
     * and outside of p2p.
     */
    pcConstraints: {
        optional?: undefined;
    } | {
        optional: ({
            googHighStartBitrate: number;
            googPayloadPadding?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuUnderuseThreshold?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googPayloadPadding: boolean;
            googHighStartBitrate?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuUnderuseThreshold?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googScreencastMinBitrate: number;
            googHighStartBitrate?: undefined;
            googPayloadPadding?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuUnderuseThreshold?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googCpuOveruseDetection: boolean;
            googHighStartBitrate?: undefined;
            googPayloadPadding?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuUnderuseThreshold?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googCpuOveruseEncodeUsage: boolean;
            googHighStartBitrate?: undefined;
            googPayloadPadding?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuUnderuseThreshold?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googCpuUnderuseThreshold: number;
            googHighStartBitrate?: undefined;
            googPayloadPadding?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuOveruseThreshold?: undefined;
        } | {
            googCpuOveruseThreshold: number;
            googHighStartBitrate?: undefined;
            googPayloadPadding?: undefined;
            googScreencastMinBitrate?: undefined;
            googCpuOveruseDetection?: undefined;
            googCpuOveruseEncodeUsage?: undefined;
            googCpuUnderuseThreshold?: undefined;
        })[];
    };
    p2pPcConstraints: any;
    /**
    * @param {string[]} um required user media types
    * @param {Object} [options] optional parameters
    * @param {string} options.resolution
    * @param {number} options.bandwidth
    * @param {number} options.fps
    * @param {string} options.desktopStream
    * @param {string} options.cameraDeviceId
    * @param {string} options.micDeviceId
    * @param {Object} options.frameRate - used only for dekstop sharing.
    * @param {Object} options.frameRate.min - Minimum fps
    * @param {Object} options.frameRate.max - Maximum fps
    * @param {bool}   options.screenShareAudio - Used by electron clients to
    * enable system audio screen sharing.
    * @returns {Promise} Returns a media stream on success or a JitsiTrackError
    * on failure.
    **/
    getUserMediaWithConstraints(um: string[], options?: {
        resolution: string;
        bandwidth: number;
        fps: number;
        desktopStream: string;
        cameraDeviceId: string;
        micDeviceId: string;
        frameRate: {
            min: any;
            max: any;
        };
        screenShareAudio: any;
    }): Promise<any>;
    /**
     * Creates the local MediaStreams.
     * @param {Object} [options] optional parameters
     * @param {Array} options.devices the devices that will be requested
     * @param {string} options.resolution resolution constraints
     * @param {string} options.cameraDeviceId
     * @param {string} options.micDeviceId
     * @param {Object} options.desktopSharingFrameRate
     * @param {Object} options.desktopSharingFrameRate.min - Minimum fps
     * @param {Object} options.desktopSharingFrameRate.max - Maximum fps
     * @returns {*} Promise object that will receive the new JitsiTracks
     */
    obtainAudioAndVideoPermissions(options?: {
        devices: Array<string>;
        resolution: string;
        cameraDeviceId: string;
        micDeviceId: string;
        desktopSharingFrameRate: {
            min: any;
            max: any;
        };
    }): any;
    /**
     * Gets streams from specified device types. This function intentionally
     * ignores errors for upstream to catch and handle instead.
     *
     * @param {Object} options - A hash describing what devices to get and
     * relevant constraints.
     * @param {string[]} options.devices - The types of media to capture. Valid
     * values are "desktop", "audio", and "video".
     * @param {Object} options.desktopSharingFrameRate
     * @param {Object} options.desktopSharingFrameRate.min - Minimum fps
     * @param {Object} options.desktopSharingFrameRate.max - Maximum fps
     * @param {String} options.desktopSharingSourceDevice - The device id or
     * label for a video input source that should be used for screensharing.
     * @returns {Promise} The promise, when successful, will return an array of
     * meta data for the requested device type, which includes the stream and
     * track. If an error occurs, it will be deferred to the caller for
     * handling.
     */
    newObtainAudioAndVideoPermissions(options: {
        devices: string[];
        desktopSharingFrameRate: {
            min: any;
            max: any;
        };
        desktopSharingSourceDevice: string;
    }): Promise<any>;
    /**
     * Checks whether it is possible to enumerate available cameras/microphones.
     *
     * @returns {boolean} {@code true} if the device listing is available;
     * {@code false}, otherwise.
     */
    isDeviceListAvailable(): boolean;
    /**
     * Returns true if changing the input (camera / microphone) or output
     * (audio) device is supported and false if not.
     * @params {string} [deviceType] - type of device to change. Default is
     *      undefined or 'input', 'output' - for audio output device change.
     * @returns {boolean} true if available, false otherwise.
     */
    isDeviceChangeAvailable(deviceType: any): boolean;
    /**
     * A method to handle stopping of the stream.
     * One point to handle the differences in various implementations.
     * @param mediaStream MediaStream object to stop.
     */
    stopMediaStream(mediaStream: any): void;
    /**
     * Returns whether the desktop sharing is enabled or not.
     * @returns {boolean}
     */
    isDesktopSharingEnabled(): boolean;
    /**
     * Sets current audio output device.
     * @param {string} deviceId - id of 'audiooutput' device from
     *      navigator.mediaDevices.enumerateDevices(), 'default' for default
     *      device
     * @returns {Promise} - resolves when audio output is changed, is rejected
     *      otherwise
     */
    setAudioOutputDevice(deviceId: string): Promise<any>;
    /**
     * Returns currently used audio output device id, '' stands for default
     * device
     * @returns {string}
     */
    getAudioOutputDevice(): string;
    /**
     * Returns list of available media devices if its obtained, otherwise an
     * empty array is returned/
     * @returns {Array} list of available media devices.
     */
    getCurrentlyAvailableMediaDevices(): any[];
    /**
     * Returns event data for device to be reported to stats.
     * @returns {MediaDeviceInfo} device.
     */
    getEventDataForActiveDevice(device: any): any;
    /**
     * Configures the given PeerConnection constraints to either enable or
     * disable (according to the value of the 'enable' parameter) the
     * 'googSuspendBelowMinBitrate' option.
     * @param constraints the constraints on which to operate.
     * @param enable {boolean} whether to enable or disable the suspend video
     * option.
     */
    setSuspendVideo(constraints: any, enable: boolean): void;
}
import Listenable from "../util/Listenable";
