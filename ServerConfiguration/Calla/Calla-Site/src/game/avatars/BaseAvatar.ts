import type { CanvasTypes, Context2D } from "kudzu/html/canvas";
import { createUtilityCanvas } from "kudzu/html/canvas";
import type { AvatarMode } from "./AvatarMode";
import type { EmojiAvatarChangedEvent } from "./EmojiAvatar";
import type { PhotoAvatarChangedEvent } from "./PhotoAvatar";
import type { VideoAvatarChangedEvent } from "./VideoAvatar";

export abstract class BaseAvatarChangedEvent<ModeT extends AvatarMode, AvatarT> extends Event {
    constructor(public mode: ModeT, public avatar: AvatarT) {
        super(mode);
    }
}

export type AvatarChangedEvent = EmojiAvatarChangedEvent
    | PhotoAvatarChangedEvent
    | VideoAvatarChangedEvent;

/**
 * A base class for different types of avatars.
 **/
export class BaseAvatar {

    element: CanvasTypes;
    protected g: Context2D;

    /**
     * Encapsulates a resource to use as an avatar.
     */
    constructor(public mode: AvatarMode, public canSwim: boolean) {
        this.element = createUtilityCanvas(128, 128);
        this.g = this.element.getContext("2d");
    }

    /**
     * Render the avatar at a certain size.
     * @param g - the context to render to
     * @param width - the width the avatar should be rendered at
     * @param height - the height the avatar should be rendered at.
     * @param isMe - whether the avatar is the local user
     */
    draw(g: Context2D, width: number, height: number, _isMe: boolean) {
        const aspectRatio = this.element.width / this.element.height,
            w = aspectRatio > 1 ? width : aspectRatio * height,
            h = aspectRatio > 1 ? width / aspectRatio : height,
            dx = (width - w) / 2,
            dy = (height - h) / 2;
        g.drawImage(
            this.element,
            dx, dy,
            w, h);
    }
}