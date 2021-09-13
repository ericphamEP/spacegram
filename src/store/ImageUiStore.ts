import { makeAutoObservable } from "mobx";
import { ImageStore } from "./ImageStore";
import { FilterParams } from "../service/ImageInterfaces";

export class ImageUiStore {
    private imageStore: ImageStore;
    private isLoading = false;
    private currentSearch = "";
    private filters: FilterParams = {};
    private page = 1;

    constructor(imageStore: ImageStore) {
        makeAutoObservable(this);
        this.imageStore = imageStore;
    }

    getSearch(): string {
        return this.currentSearch;
    }
    setSearch(newSearch: string): void {
        this.currentSearch = newSearch;
        this.setPage(1);
    }

    getIsLoading(): boolean {
        return this.isLoading;
    }
    setIsLoading(status: boolean): void {
        this.isLoading = status;
    }

    getPage(): number {
        return this.page;
    }
    setPage(newPage: number): void {
        this.page = newPage;
    }

    async loadSearchResults(): Promise<void> {
        this.setIsLoading(true);
        console.log(this.page)
        await this.imageStore.fetchImagesSearch(this.currentSearch, this.filters, this.page);
        this.setIsLoading(false);
    }
}