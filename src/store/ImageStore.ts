import { makeAutoObservable } from "mobx";
import { ImageService } from "../service/ImageService";
import { Image, FilterParams } from "../service/ImageInterfaces";

export class ImageStore {
    imageService = new ImageService();
    imagesList: Image[] = [];
    totalImagesCount = 0;
    assetDetails = {};
    likedImages: {[key: string]: boolean} = {};
    likedImagesList: Image[] = [];

    constructor() {
        makeAutoObservable(this);
        try {
            const initialLikedImages = localStorage.getItem( 'likedImages' );
            this.likedImages = initialLikedImages ? JSON.parse(initialLikedImages) : {}
        } catch {
            this.likedImages = {};
        }
        
    }

    async fetchImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<void> {
        const imagesObj = await this.imageService.getImagesSearch(search, filters, page, assetId);
        this.setImagesList(imagesObj.images);
        this.setTotalImagesCount(imagesObj.totalImagesCount);
    }

    async fetchLikedImages(): Promise<void> {
        const imagesObj = await this.imageService.getImagesFromIds(Object.keys(this.likedImages));
        this.setLikedImagesList(imagesObj.images);
    }

    onLike = async (assetId: string): Promise<void> => {
        if (assetId in this.likedImages) {
            delete this.likedImages[assetId];
        } else {
            this.likedImages[assetId] = true;
        }
        localStorage.setItem( 'likedImages', JSON.stringify(this.likedImages) );
        await this.fetchLikedImages();
    }

    setImagesList = (imagesList: Image[]): void => {
        this.imagesList = imagesList;
    }
    setTotalImagesCount = (count: number): void => {
        this.totalImagesCount = count;
    }
    setLikedImagesList = (imagesList: Image[]): void => {
        this.likedImagesList = imagesList;
    }
}