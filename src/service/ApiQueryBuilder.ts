import axios from "axios";
import { Images, FilterParams } from "./ImageInterfaces";

export class ApiQueryBuilder {
    root: string = "https://images-api.nasa.gov";

    async getImages(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<Images> {
        const params = {q: search, page, nasa_id: assetId, media_type: "image", ...filters};
        const response = await axios.get(`${this.root}/search`, { params });
        console.log(response);
        return response.data;
    }
}