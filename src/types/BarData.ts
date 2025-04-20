export interface User {
    user_name: string;
}

export interface Product {
    id: number;
    name: string;
    image_url: string;
    brand_id: number;
    brand: string;
    spirit: string;
    size: string;
    proof: number;
    average_msrp: number;
    fair_price: number;
    shelf_price: number;
    popularity: number;
    created: number;
    updated: number;
    barcode: string;
    barrel_pick: boolean;
    user_added_id: number | null;
    submitter_email?: string;
    submitter_username: string;
    private: boolean;
    verified_date: number;
    user_added: boolean;
}

export interface BarDataAPI {
    id: number;
    bar_id: number;
    price: number | null;
    note: string | null;
    created_at: string;
    updated_at: string;
    user_id: number;
    release_id: number;
    fill_percentage: number;
    added: string;
    user: User;
    product: Product;
}

export interface BarContent {
    name: string;
    brand: string;
    spirit: string;
    size: string;
    proof: number;
    average_msrp: number;
    fair_price: number;
    shelf_price: number;
    popularity: number;
}