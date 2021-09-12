import { makeAutoObservable } from "mobx";
import { ImageService } from "../service/ImageService";
import { Image, FilterParams } from "../service/ImageInterfaces";

export class ImageStore {
    imageService = new ImageService();
    imagesList: Image[] = [];
    totalImagesCount: number = 0;
    assetDetails = {};
    likedImages: {[key: string]: boolean} = {};

    constructor() {
        makeAutoObservable(this);
    }

    async fetchImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<void> {
        const imagesObj = await this.imageService.getImagesSearch(search, filters, page, assetId);
        this.imagesList = imagesObj.images;
        this.totalImagesCount = imagesObj.totalImagesCount;
    }

    onLike(assetId: string): void {
        if (assetId in this.likedImages) {
            delete this.likedImages[assetId];
        } else {
            this.likedImages[assetId] = true;
        }
    }
}