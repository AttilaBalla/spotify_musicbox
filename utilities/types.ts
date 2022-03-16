interface ISpotifyImages {
    url: string,
    height: number,
    width: number,
}

export interface ISpotifyPlaylist {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: ISpotifyImages[],
    name: string,
    owner: {
        display_name: string,
        external_urls: {
            spotify: string,
        }
        href: string,
        type: string,
        id: string,
        uri: string
    },
    primary_color: string,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total: number,
    },
    type: string,
    uri: string
}

export interface ISpotifyUser {
    country: string,
    display_name: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean,
    },
    external_urls: {
        spotify: string,
    },
    followers: {
        href: string,
        total: number
    },
    href: string,
    id: string,
    images: ISpotifyImages[],
    product: string,
    type: string,
    uri: string
}

export interface ISpotifyPlaylistInfo<T> {
    href: string,
    items: T[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
}

export interface ISpotifyRecentTracks {
    href: string,
    items: ISpotifyTrackInfo[]
    limit: number,
    next: string,
    cursors: any, // used to find the next set of items, pagination I guess?
    total: number
}

export interface ISpotifyTrackInfo {
    context?: any,
    played_at?: Date,
    track: ISpotifyTrack
}

export interface ISpotifyTrack {
    album: ISpotifyAlbum;
    artists: ISpotifyArtist[],
    id: string,
    name: string,
    href: string,
    duration_ms: number
}

export interface ISpotifyArtist {
    href: string,
    id: string,
    name: string
}

export interface ISpotifyAlbum {
    type: string;
    images: ISpotifyAlbumImages[];
    id: string;
    name: string;
    total_tracks: number;
}

export interface ISpotifyAlbumImages {
    url: string;
    width: number;
    height: number;
}

export interface ISpotifyAudioFeatures {
    id: string,
    acousticness: number,
    danceability: number,
    energy: number,
    tempo: number,
    valence: number
}

export interface ISpotifyPlaybackState {
    is_playing: boolean;
    progress_ms: number;
    repeat_state: boolean;
    shuffle_state: boolean;
    item: ISpotifyTrack;
}

export interface IModalParams {
    track: ISpotifyTrack,
    audioFeatures: ISpotifyAudioFeatures
}

export interface IAuthUrlParams {
    accessToken: string,
    tokenType: string,
    expires: number,
    state: string
}
