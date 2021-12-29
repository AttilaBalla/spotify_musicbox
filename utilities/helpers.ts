import { IAuthUrlParams } from "./types";

export function constructAuthorizationUrl(): string {

    const responseType = 'response_type=token';
    const clientId = `client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
    const scope = 'scope=user-read-private playlist-read-private';
    const redirect_uri = 'redirect_uri=http://localhost:3000';
    const state = `state=${generateRandomString(16)}`; // put some properly generated random gibberish here

    return `${process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL}?${responseType}&${clientId}&${scope}&${redirect_uri}&${state}`
}

export function parseHashParamsFromUrl(url: string):IAuthUrlParams {
    const result = {} as IAuthUrlParams;
    const parts = url.split('&');

    for (const part of parts) {
        if(part.includes('access_token')) {
            result.accessToken = part.split('=')[1];
        }

        if(part.includes('token_type')) {
            result.tokenType = part.split('=')[1];
        }

        if(part.includes('expires_in')) {
            result.expires = parseInt(part.split('=')[1]);
        }

        if(part.includes('state')) {
            result.state = part.split('=')[1];
        }
    }

    return result;
}

function generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}