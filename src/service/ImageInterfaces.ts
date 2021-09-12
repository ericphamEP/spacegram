export interface Images {
    images: Image[],
    totalImagesCount: number,
}

export interface Image {
    id: string,
    title: string,
    url: string,
}

export interface AssetDetails {
    // todo: fill in
}

export interface FilterParams {
    description?: string,
    description_508?: string,
    keywords?: string,
    location?: string,
    photographer?: string,
    secondary_creator?: string,
    title?: string,
    year_start?: string,
    year_end?: string,
}