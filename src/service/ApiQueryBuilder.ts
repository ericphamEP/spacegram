/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Images, Image, FilterParams, AssetDetails, ImageDataFull } from "./ImageInterfaces";

export class ApiQueryBuilder {
    root = "https://images-api.nasa.gov";

    async getImages(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        /*
        Send request for images using search endpoint
        :input search: Search string
        :input filters: Filter params object
        :input page: Page number
        :input assetId: NASA ID string
        :return: Images object with list and count
        */
        const params = {q: search, page, nasa_id: assetId, media_type: "image", ...filters};
        const response = await axios.get(`${this.root}/search`, { params });
        const totalImagesCount = response.data.collection.metadata.total_hits;
        const imageDataList = response.data.collection.items.map((imageItem: any) => this._mapResponseDataToFormattedData(imageItem))
        return {images: imageDataList, totalImagesCount };
    }

    async getImagesFromIds(assetIds: string[]): Promise<Images> {
        /*
        Send requests for images using search endpoint and assetId params
        :input assetIds: List of NASA ID strings
        :return: Images object with list and count
        */
        let imageDataList: Image[] = [];
        for (const assetId of assetIds) {
            const params = {nasa_id: assetId, media_type: "image"};
            const response = await axios.get(`${this.root}/search`, { params });
            imageDataList = imageDataList.concat(response.data.collection.items.map((imageItem: any) => this._mapResponseDataToFormattedData(imageItem)));
        }
        return {images: imageDataList, totalImagesCount: imageDataList.length };
    }

    async getImageDetails(assetId: string): Promise<AssetDetails> {
        /*
        Send request for image using search endpoint, get full details
        :input assetId: NASA ID string
        :return: Image object with full details
        */
        const response = await axios.get(`${this.root}/search`, {params: {nasa_id: assetId}});
        return this._mapResponseDataToFormattedDataFull(response.data.collection.items[0]);
    }

    private _mapResponseDataToFormattedData(resData: any): Image {
        return {
            id: resData.data[0].nasa_id,
            title: resData.data[0].title,
            imgUrl: resData.links[0].href,
            date: resData.data[0].date_created,
            description: resData.data[0].description,
        } as Image
    }

    private _mapResponseDataToFormattedDataFull(resData: any): AssetDetails {
        return {
            image: {
                ...this._mapResponseDataToFormattedData(resData),
                location: resData.data[0].location,
                center: resData.data[0].center,
                keywords: resData.data[0].keywords,
            } as ImageDataFull
        } 
    }
}