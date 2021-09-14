export interface Images {
    images: Image[],
    totalImagesCount: number,
}

export interface Image {
    id: string,
    title: string,
    imgUrl: string
    date: string,
    description?: string,
}

export interface ImageDataFull extends Image {
    location: string,
    center: string,
    keywords: string[],
}


export interface AssetDetails {
    image: ImageDataFull | undefined,
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