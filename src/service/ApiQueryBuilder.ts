/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Images, Image, FilterParams } from "./ImageInterfaces";

export class ApiQueryBuilder {
    root = "https://images-api.nasa.gov";

    async getImages(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        const params = {q: search, page, nasa_id: assetId, media_type: "image", ...filters};
        const response = await axios.get(`${this.root}/search`, { params });
        const totalImagesCount = response.data.collection.metadata.total_hits;
        const imageDataList = response.data.collection.items.map((imageItem: any) => this._mapResponseDataToFormattedData(imageItem))
        return {images: imageDataList, totalImagesCount };
    }

    async getImagesFromIds(assetIds: string[]): Promise<Images> {
        let imageDataList: Image[] = [];
        for (const assetId of assetIds) {
            const params = {nasa_id: assetId, media_type: "image"};
            const response = await axios.get(`${this.root}/search`, { params });
            imageDataList = imageDataList.concat(response.data.collection.items.map((imageItem: any) => this._mapResponseDataToFormattedData(imageItem)));
        }
        return {images: imageDataList, totalImagesCount: imageDataList.length };
    }

    private _mapResponseDataToFormattedData(resData: any): Image {
        return {
            id: resData.data[0].nasa_id,
            title: resData.data[0].title,
            imgUrl: resData.links[0].href,
            href: resData.href,
            date: resData.data[0].date_created,
            description: resData.data[0].description,
        }
    }
}