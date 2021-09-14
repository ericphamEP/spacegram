import { makeAutoObservable } from "mobx";
import { ImageStore } from "./ImageStore";
import { FilterParams } from "../service/ImageInterfaces";

export class ImageUiStore {
    private imageStore: ImageStore;
    private currentSearch = "";
    private filters: FilterParams = {};
    private page = 1;

    private isLoading = false;
    private isLikeLoading = false;
    private isListView = false;

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

    getIsLikeLoading(): boolean {
        return this.isLikeLoading;
    }
    setIsLikeLoading(status: boolean): void {
        this.isLikeLoading = status;
    }

    getIsListView(): boolean {
        return this.isListView;
    }
    setIsListView(status: boolean): void {
        this.isListView = status;
    }

    getPage(): number {
        return this.page;
    }
    setPage(newPage: number): void {
        this.page = newPage;
    }

    async loadSearchResults(): Promise<void> {
        this.setIsLoading(true);
        await this.imageStore.fetchImagesSearch(this.currentSearch, this.filters, this.page);
        this.setIsLoading(false);
    }

    async loadLikedImages(): Promise<void> {
        this.setIsLikeLoading(true);
        await this.imageStore.fetchLikedImages();
        this.setIsLikeLoading(false);
    }
}