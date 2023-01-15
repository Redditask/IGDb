export interface ServerResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: GameInfo[]
}

export interface GameInfo {
    id: number,
    name: string,
    released: string,
    background_image: string,
    metacritic: number,
    tags: Tag[]
}

export interface Tag {
    name: string,
    id: number
}


