import { ApiQueryBuilder } from "./ApiQueryBuilder";
import { Images, FilterParams } from "./ImageInterfaces";
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

    async getAsset() {

    }

    private _showError(msg: string, err: any) {
        notification['error']({
            message: "Image Service Error",
            description: msg,
        });
        console.log(`[image-service-error] ${err}`)
    }
}