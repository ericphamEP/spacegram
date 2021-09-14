import { makeAutoObservable } from "mobx";
import { ImageService } from "../service/ImageService";
import { Image, AssetDetails, FilterParams } from "../service/ImageInterfaces";

export class ImageStore {
    imageService = new ImageService();
    imagesList: Image[] = [];
    totalImagesCount = 0;
    imageDetails: AssetDetails = {image: undefined};
    likedImages: {[key: string]: boolean} = {};
    likedImagesList: Image[] = [];

    constructor() {
        makeAutoObservable(this);
        try { // Initialize with local storage if available
            const initialLikedImages = localStorage.getItem( 'likedImages' );
            this.likedImages = initialLikedImages ? JSON.parse(initialLikedImages) : {}
        } catch {
            this.likedImages = {};
        }
    }

    // Main functions

    async fetchImagesSearch(search?: string, filters?: FilterParams, page?: number, assetId?: string): Promise<void> {
        /*
        Fetch and save images using variety of params
        :input search: Search string
        :input filters: Filter params object
        :input page: Page number
        :input assetId: NASA ID string
        */
        const imagesObj = await this.imageService.getImagesSearch(search, filters, page, assetId);
        this.setImagesList(imagesObj.images);
        this.setTotalImagesCount(imagesObj.totalImagesCount);
    }

    async fetchLikedImages(): Promise<void> {
        /*
        Fetch and save liked images
        */
        const imagesObj = await this.imageService.getImagesFromIds(Object.keys(this.likedImages));
        this.setLikedImagesList(imagesObj.images);
    }

    async fetchImageDetails(assetId: string): Promise<void> {
        /*
        Fetch and save full image details
        :input assetId: NASA ID string
        */
        const imageObj = await this.imageService.getImageDetails(assetId);
        this.setImageDetails(imageObj);
    }

    onLike = async (assetId: string): Promise<void> => {
        /*
        Save or remove liked image
        :input assetId: NASA ID string
        */
        if (assetId in this.likedImages) {
            delete this.likedImages[assetId];
        } else {
            this.likedImages[assetId] = true;
        }
        localStorage.setItem( 'likedImages', JSON.stringify(this.likedImages) ); // Save to local
        await this.fetchLikedImages();
    }

    // Setters for observable state

    setImagesList = (imagesList: Image[]): void => {
        this.imagesList = imagesList;
    }
    setTotalImagesCount = (count: number): void => {
        this.totalImagesCount = count;
    }
    setLikedImagesList = (imagesList: Image[]): void => {
        this.likedImagesList = imagesList;
    }
    setImageDetails = (imageData: AssetDetails): void => {
        this.imageDetails = imageData;
    }
}