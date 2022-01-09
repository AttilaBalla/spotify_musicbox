import {
    ISpotifyAudioFeatures,
    ISpotifyPlaylist,
    ISpotifyPlaylistInfo,
    ISpotifyRecentTracks, ISpotifyTrackInfo,
    ISpotifyUser
} from "./types";

function request<T>(url: string, method: string): Promise<T> {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    return fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}${url}`, options)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                console.log(res);
                return Promise.reject({
                    status: res.status,
                    type: res.type
                });
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function getUserProfile(): Promise<ISpotifyUser> {
    return request<ISpotifyUser>('/me', 'GET');
}

export function getUsersPlaylists(): Promise<ISpotifyPlaylistInfo<ISpotifyPlaylist>[]> {
    return request<ISpotifyPlaylistInfo<ISpotifyPlaylist>[]>(`/me/playlists`, 'GET');
}

export function getPlaylistItems(playlistId: string, limit: number, offset: number): Promise<ISpotifyPlaylistInfo<ISpotifyTrackInfo>> {
    return request<ISpotifyPlaylistInfo<ISpotifyTrackInfo>>(`/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`, 'GET');
}

export function getRecentlyPlayedTracks(): Promise<ISpotifyRecentTracks> {
    return request<ISpotifyRecentTracks>(`/me/player/recently-played`, 'GET')
}

export function getAudioFeaturesOfMultipleTracks(trackIds: string): Promise<{ audio_features: ISpotifyAudioFeatures[] }> {
    return request<{ audio_features: ISpotifyAudioFeatures[] }>(`/audio-features?ids=${trackIds}`, 'GET')
}