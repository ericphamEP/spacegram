import { ImageService } from "../service/ImageService";
import { Image, FilterParams } from "../service/ImageInterfaces";

export class ImageStore {
    imageService = new ImageService();
    imagesList: Image[] = [];
    totalImagesCount: number = 0;
    assetDetails = {};
    likedImages = {};

    async fetchImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<void> {
        const imagesObj = await this.imageService.getImagesSearch(search, filters, page, assetId);
        this.imagesList = imagesObj.images;
        this.totalImagesCount = imagesObj.totalImagesCount;
    }
}