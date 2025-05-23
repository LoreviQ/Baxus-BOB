export interface WhiskeyDataset {
    id: number;
    name: string;
    size: number;
    proof: number | null;
    abv: number;
    spirit_type: string;
    brand_id: number;
    popularity: number;
    image_url: string;
    avg_msrp: number;
    fair_price: number;
    shelf_price: number;
    total_score: number;
    wishlist_count: number;
    vote_count: number;
    bar_count: number;
    ranking: number;
}

export type WhiskeyContent = Pick<WhiskeyDataset, 
    | 'name'
    | 'size'
    | 'proof'
    | 'abv'
    | 'spirit_type'
    | 'popularity'
    | 'avg_msrp'
    | 'fair_price'
    | 'shelf_price'
    | 'ranking'
>;