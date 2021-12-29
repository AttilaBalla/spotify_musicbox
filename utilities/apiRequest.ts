import {IApiError, ISpotifyPlaylist, ISpotifyPlaylistInfo, ISpotifyUser} from "./types";

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
            if(res.status === 200) {
                return res.json();
            }
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

export function getUserProfile(): Promise<ISpotifyUser> {
    return request<ISpotifyUser>('/me', 'GET');
}

export function getUsersPlaylists(): Promise<ISpotifyPlaylistInfo<ISpotifyPlaylist>[]> {
    return request<ISpotifyPlaylistInfo<ISpotifyPlaylist>[]>('/me/playlists', 'GET');
}

export function getPlaylistItems(playlistId: string):Promise<ISpotifyPlaylistInfo<any>> {
    return request<ISpotifyPlaylistInfo<any>>(`/playlists/${playlistId}/tracks`, 'GET');
}