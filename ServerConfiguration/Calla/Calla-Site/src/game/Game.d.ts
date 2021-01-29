import type { InterpolatedPose } from "calla/audio/positions/InterpolatedPose";
import type { Emoji } from "kudzu/emoji/Emoji";
import { TypedEvent, TypedEventBase } from "kudzu/events/EventBase";
import { IImageFetcher } from "kudzu/io/IImageFetcher";
import { Emote, EmoteEvent } from "./Emote";
import { ScreenPointerControls } from "./ScreenPointerControls";
import type { IInputBinding } from "./Settings";
import { TileMap } from "./TileMap";
import { User, UserJoinedEvent, UserMovedEvent } from "./User";
declare type withUserCallback = (user: User) => any;
interface GameEvents {
    gameStarted: TypedEvent<"gameStarted">;
    gameEnded: TypedEvent<"gameEnded">;
    zoomChanged: TypedEvent<"zoomChanged">;
    emojiNeeded: TypedEvent<"emojiNeeded">;
    toggleAudio: TypedEvent<"toggleAudio">;
    toggleVideo: TypedEvent<"toggleVideo">;
    userJoined: UserJoinedEvent;
    userMoved: UserMovedEvent;
    emote: EmoteEvent;
}
export declare class Game extends TypedEventBase<GameEvents> {
    private fetcher;
    zoomMin: number;
    zoomMax: number;
    waypoints: {
        x: number;
        y: number;
    }[];
    users: Map<string, User>;
    emotes: Emote[];
    keys: Map<string, KeyboardEvent>;
    lastMove: number;
    lastWalk: number;
    gridOffsetX: number;
    gridOffsetY: number;
    fontSize: number;
    cameraX: number;
    offsetCameraX: number;
    targetOffsetCameraX: number;
    cameraY: number;
    offsetCameraY: number;
    targetOffsetCameraY: number;
    cameraZ: number;
    targetCameraZ: number;
    drawHearing: boolean;
    audioDistanceMin: number;
    audioDistanceMax: number;
    rolloff: number;
    lastGamepadIndex: number;
    gamepadIndex: number;
    transitionSpeed: number;
    keyboardEnabled: boolean;
    me: User;
    map: TileMap;
    currentRoomName: string;
    currentEmoji: Emoji;
    element: HTMLCanvasElement;
    gFront: CanvasRenderingContext2D;
    inputBinding: IInputBinding;
    screenControls: ScreenPointerControls;
    constructor(fetcher: IImageFetcher, zoomMin: number, zoomMax: number);
    get style(): CSSStyleDeclaration;
    updateAudioActivity(id: string, isActive: boolean): void;
    emote(id: string, emoji: Emoji): void;
    getTileAt(cursor: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    moveMeTo(x: number, y: number): void;
    moveMeBy(dx: number, dy: number): void;
    moveMeByPath(dx: number, dy: number): void;
    warpMeTo(x: number, y: number): void;
    visit(id: string): void;
    get zoom(): number;
    set zoom(v: number);
    addUser(id: string, displayName: string, pose: InterpolatedPose): void;
    toggleMyAudio(): void;
    toggleMyVideo(): void;
    muteUserAudio(id: string, muted: boolean): void;
    muteUserVideo(id: string, muted: boolean): void;
    /**
    * Used to perform on operation when a valid user object is found.
    * @callback withUserCallback
    * @param {User} user
    * @returns {void}
    */
    /**
     * Find a user by id, then perform an operation on it.
     */
    withUser(msg: string, id: string, callback: withUserCallback, timeout?: number): void;
    changeUserName(id: string, displayName: string): void;
    removeUser(id: string): void;
    setAvatarVideo(id: string, stream: MediaStream): void;
    setAvatarURL(id: string, url: string): void;
    setAvatarEmoji(id: string, emoji: Emoji): void;
    startAsync(id: string, displayName: string, pose: InterpolatedPose, avatarURL: string, roomName: string): Promise<void>;
    startLoop(): void;
    resize(): void;
    end(): void;
    update(dt: number): void;
    render(): void;
    drawCursor(): void;
}
export {};
