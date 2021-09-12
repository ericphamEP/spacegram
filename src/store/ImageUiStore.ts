import { ImageStore } from "./ImageStore";
import { FilterParams } from "../service/ImageInterfaces";

export class ImageUiStore {
    private imageStore: ImageStore;
    private isLoading: boolean = false;
    private currentSearch: string = "";
    private filters: FilterParams = {};
    private page: number = 1;

    constructor(imageStore: ImageStore) {
        this.imageStore = imageStore;
    }

    getSearch(): string {
        return this.currentSearch;
    }
    setSearch(newSearch: string) {
        this.currentSearch = newSearch;
    }

    getIsLoading(): boolean {
        return this.isLoading;
    }
    setIsLoading(status: boolean) {
        this.isLoading = status;
    }

    loadSearchResults() {
        this.imageStore.fetchImagesSearch(this.currentSearch, this.filters, this.page)
    }
}