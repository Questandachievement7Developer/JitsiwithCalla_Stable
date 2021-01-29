/**
 *
 * @param sdp
 */
export default function SDP(sdp: any): void;
export default class SDP {
    /**
     *
     * @param sdp
     */
    constructor(sdp: any);
    media: any;
    raw: any;
    session: any;
    /**
     * A flag will make {@link transportToJingle} and {@link jingle2media} replace
     * ICE candidates IPs with invalid value of '1.1.1.1' which will cause ICE
     * failure. The flag is used in the automated testing.
     * @type {boolean}
     */
    failICE: boolean;
    /**
     * Whether or not to remove TCP ice candidates when translating from/to jingle.
     * @type {boolean}
     */
    removeTcpCandidates: boolean;
    /**
     * Whether or not to remove UDP ice candidates when translating from/to jingle.
     * @type {boolean}
     */
    removeUdpCandidates: boolean;
    getMediaSsrcMap(): {};
    containsSSRC(ssrc: any): boolean;
    toJingle(elem: any, thecreator: any): any;
    transportToJingle(mediaindex: any, elem: any): void;
    rtcpFbToJingle(mediaindex: any, elem: any, payloadtype: any): void;
    rtcpFbFromJingle(elem: any, payloadtype: any): string;
    fromJingle(jingle: any): void;
    jingle2media(content: any): string;
}
