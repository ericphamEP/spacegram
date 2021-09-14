import { ApiQueryBuilder } from "./ApiQueryBuilder";
import { Images, FilterParams, AssetDetails } from "./ImageInterfaces";
import { notification } from "antd";

export class ImageService {
    queryService = new ApiQueryBuilder();

    async getImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        let images: Images = {images: [], totalImagesCount: 0};
        try {
            images = await this.queryService.getImages(search, filters, page, assetId);
        } catch (err) {
            this._showError("Could not fetch images for search", err);
        }
        return images;
    }

    async getImagesFromIds(assetIds: string[]): Promise<Images> {
        let images: Images = {images: [], totalImagesCount: 0};
        try {
            images = await this.queryService.getImagesFromIds(assetIds);
        } catch (err) {
            this._showError("Could not fetch for group of images", err);
        }
        return images;
    }

    async getImageDetails(assetId: string): Promise<AssetDetails> {
        let imageDetails: AssetDetails = {image: undefined};
        try {
            imageDetails = await this.queryService.getImageDetails(assetId);
        } catch (err) {
            this._showError("Could not fetch image details", err);
        }
        return imageDetails;
    }

    private _showError(msg: string, err: unknown) {
        notification['error']({
            message: "Image Service Error",
            description: msg,
        });
        console.log(`[image-service-error] ${err}`)
    }
}