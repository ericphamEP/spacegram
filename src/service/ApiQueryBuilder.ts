import axios from "axios";
import { Images, FilterParams } from "./ImageInterfaces";

export class ApiQueryBuilder {
    root: string = "https://images-api.nasa.gov";

    async getImages(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        const params = {q: search, page, nasa_id: assetId, media_type: "image", ...filters};
        const response = await axios.get(`${this.root}/search`, { params });
        const totalImagesCount = response.data.collection.metadata.total_hits;
        const imageDataList = response.data.collection.items.map((imageItem: any) => {
            return {
                id: imageItem.data[0].nasa_id,
                title: imageItem.data[0].title,
                imgUrl: imageItem.links[0].href,
                href: imageItem.href,
                date: imageItem.data[0].date_created,
                description: imageItem.data[0].description,
            }
        })
        return {images: imageDataList, totalImagesCount };
    }
}