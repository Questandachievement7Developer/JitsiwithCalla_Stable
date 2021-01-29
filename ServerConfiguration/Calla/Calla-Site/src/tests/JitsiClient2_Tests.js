import { TestBase } from "./TestBase";

export class JitsiClient2_Tests extends TestBase {

    constructor() {
        super();
    }

    async test_000_joinChannel() {
        await this.joinChannel();
    }

    async test_130_participantJoined() {
        await this.waitForJoin();
    }

    async test_140_initUser() {
        await this.initUsers();
    }

    async test_145_recvPhotoAvatar() {
        await this.recvPhotoAvatar();
    }

    async test_146_sendPhotoAvatar() {
        await this.sendPhotoAvatar();
    }

    async test_150_recvEmoji() {
        await this.recvEmoji();
    }

    async test_160_sendEmoji() {
        await this.sendEmoji();
    }

    async test_165_recvPosition() {
        await this.recvPosition();
    }

    async test_166_sendPosition() {
        await this.sendPosition();
    }

    async test_170_recvAudioMuted() {
        await this.recvAudioMuted();
    }

    async test_180_sendAudioMuted() {
        await this.sendAudioMuted();
    }

    //*
    async test_190_recvAudioUnmuted() {
        await this.recvAudioUnmuted();
    }

    async test_200_sendAudioUnmuted() {
        await this.sendAudioUnmuted();
    }

    async test_210_recvVideoUnmuted() {
        await this.recvVideoUnmuted();
    }

    async test_220_sendVideoUnmuted() {
        await this.sendVideoUnmuted();
    }

    async test_230_recvVideoMuted() {
        await this.recvVideoMuted();
    }

    async test_240_sendVideoMuted() {
        await this.sendVideoMuted();
    }

    async test_980_participantLeft() {
        await this.client.leaveAsync();
        this.success();
    }
    //*/
}