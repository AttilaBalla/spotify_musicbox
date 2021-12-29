interface ISpotifyImages {
    url: string,
    height: number,
    width: number,
}

export interface ISpotifyPlaylist {
    collaborative: boolean,
    descirption: string,
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

export interface IAuthUrlParams {
    accessToken: string,
    tokenType: string,
    expires: number,
    state: string
}

export interface IApiError {
    status: number,
    message: string
}