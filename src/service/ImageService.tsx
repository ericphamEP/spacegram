import { ApiQueryBuilder } from "./ApiQueryBuilder";
import { Images, FilterParams, AssetDetails } from "./ImageInterfaces";
import { notification } from "antd";

export class ImageService {
    queryService = new ApiQueryBuilder();

    async getImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        /*
        Search images using variety of params
        :input search: Search string
        :input filters: Filter params object
        :input page: Page number
        :input assetId: NASA ID string
        :return: Images object with list and count
        */
        let images: Images = {images: [], totalImagesCount: 0};
        try {
            images = await this.queryService.getImages(search, filters, page, assetId);
        } catch (err) {
            this._showError("Could not fetch images for search", err);
        }
        return images;
    }

    async getImagesFromIds(assetIds: string[]): Promise<Images> {
        /*
        Search images with list of IDs
        :input assetIds: List of NASA ID strings
        :return: Images object with list and count
        */
        let images: Images = {images: [], totalImagesCount: 0};
        try {
            images = await this.queryService.getImagesFromIds(assetIds);
        } catch (err) {
            this._showError("Could not fetch for group of images", err);
        }
        return images;
    }

    async getImageDetails(assetId: string): Promise<AssetDetails> {
        /*
        Get full image details
        :input assetId: NASA ID string
        :return: Image object with full details
        */
        let imageDetails: AssetDetails = {image: undefined};
        try {
            imageDetails = await this.queryService.getImageDetails(assetId);
        } catch (err) {
            this._showError("Could not fetch image details", err);
        }
        return imageDetails;
    }

    private _showError(msg: string, err: unknown): void {
        /*
        Display message notification to user and log error
        :input msg: Message string
        :input err: Error object
        */
        notification['error']({
            message: "Image Service Error",
            description: msg,
        });
        console.log(`[image-service-error] ${err}`)
    }
}