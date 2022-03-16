import {IAuthUrlParams, ISpotifyAudioFeatures, ISpotifyTrackInfo} from "./types";
import {blankAudioFeatures} from "./defaults";

export function constructAuthorizationUrl(): string {

    const responseType = 'response_type=token';
    const clientId = `client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
    const scope = 'scope=user-read-private playlist-read-private user-read-recently-played user-read-playback-state user-modify-playback-state';
    const redirect_uri = 'redirect_uri=http://localhost:3000';
    const state = `state=${generateRandomString(16)}`; // put some properly generated random gibberish here

    return `${process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL}?${responseType}&${clientId}&${scope}&${redirect_uri}&${state}`
}

export function createTrackListIdString(recentTracks: ISpotifyTrackInfo[]): string {

    let result = '';

    for (const recentTrack of recentTracks) {
        result += `${recentTrack.track.id},`
    }

    return result;
}

export function parseHashParamsFromUrl(url: string): IAuthUrlParams {
    const result = {} as IAuthUrlParams;
    const parts = url.split('&');

    for (const part of parts) {
        if (part.includes('access_token')) {
            result.accessToken = part.split('=')[1];
        }

        if (part.includes('token_type')) {
            result.tokenType = part.split('=')[1];
        }

        if (part.includes('expires_in')) {
            result.expires = parseInt(part.split('=')[1]);
        }

        if (part.includes('state')) {
            result.state = part.split('=')[1];
        }
    }

    return result;
}

export function convertMsToMinutesSeconds(duration: number): { minutes: number, seconds: string } {

    const seconds = Math.floor((duration / 1000) % 60);

    return {
        minutes: (duration / (1000 * 60)) % 60,
        seconds: seconds > 9 ? seconds.toString().padEnd(2, '0') : seconds.toString().padStart(2, '0')
    }
}

export function findAudioFeaturesOfTrack(audioFeatures: ISpotifyAudioFeatures[], trackId: string): ISpotifyAudioFeatures {
    const result = audioFeatures.find((item: ISpotifyAudioFeatures) => {
        return item.id === trackId
    });

    if (result) {
        return result;
    } else {
        return blankAudioFeatures
    }
}


function generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}