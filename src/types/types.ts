export interface ServerResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: Game[]
}

export interface Game {
    id: number,
    name: string,
    released: string,
    background_image: string,
    metacritic: number,
    tags: Tag[],
    platforms: Platform[]
}

export interface Tag {
    name: string,
    id: number
}

export interface Platform {
    platform: {
        name: string;
    }
}

export interface ScrollEvent {
    targer : {

    }
}
