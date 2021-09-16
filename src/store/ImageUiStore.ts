import { makeAutoObservable } from "mobx";
import { ImageStore } from "./ImageStore";

export class ImageUiStore {
    private imageStore: ImageStore;
    private currentSearch = "";
    private filters: {[x: string]: string} = {};
    private page = 1;
    private selectedFilter = "title";

    private isLoading = false;
    private isLikeLoading = false;
    private isDetailsLoading = false;
    private isDetailsOpen = false;
    private isListView = false;

    constructor(imageStore: ImageStore) {
        makeAutoObservable(this);
        this.imageStore = imageStore;
    }

    // Getters and setters

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

    getIsDetailsLoading(): boolean {
        return this.isDetailsLoading;
    }
    setIsDetailsLoading(status: boolean): void {
        this.isDetailsLoading = status;
    }

    getIsDetailsOpen(): boolean {
        return this.isDetailsOpen;
    }
    setIsDetailsOpen(status: boolean): void {
        this.isDetailsOpen = status;
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

    getSelectedFilter(): string {
        return this.selectedFilter;
    }
    setSelectedFilter(selectedFilter: string): void {
        this.selectedFilter = selectedFilter;
    }

    getFilters(): {[x: string]: string} {
        return this.filters;
    }
    editFilter(value: string): void {
        if (!value || value == "") {
            this.removeFilter(this.selectedFilter);
        } else {
            this.filters[this.selectedFilter] = value;
        }
        this.loadSearchResults();
    }
    removeFilter(filterType: string): void {
        delete this.filters[filterType];
        this.loadSearchResults();
    }

    resetImageDetails(): void {
        this.imageStore.setImageDetails({image: undefined});
    }

    // Interact with main store

    async loadSearchResults(): Promise<void> {
        /*
        Load search results
        */
        this.setIsLoading(true);
        await this.imageStore.fetchImagesSearch(this.currentSearch, this.filters, this.page);
        this.setIsLoading(false);
    }

    async loadLikedImages(): Promise<void> {
        /*
        Load liked images
        */
        this.setIsLikeLoading(true);
        await this.imageStore.fetchLikedImages();
        this.setIsLikeLoading(false);
    }

    loadImageDetails = async (assetId: string): Promise<void> => {
        /*
        Load full image details
        :input assetId: NASA ID string
        */
        this.setIsDetailsLoading(true);
        this.setIsDetailsOpen(true);
        await this.imageStore.fetchImageDetails(assetId);
        this.setIsDetailsLoading(false);
    }
}