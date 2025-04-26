import mongoose, { Document, Model } from 'mongoose';

interface WhiskeyModel extends Model<WhiskeyDocument> {
    findBySpirit(spiritType: string): Promise<WhiskeyDocument[]>;
    findTopRated(limit?: number): Promise<WhiskeyDocument[]>;
    findInPriceRange(min: number, max: number): Promise<WhiskeyDocument[]>;
    searchByName(query: string): Promise<WhiskeyDocument[]>;
}

export interface WhiskeyDocument extends Document {
    id: number;
    name: string;
    size: number;
    proof: number;
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

const whiskeySchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    size: { 
        type: Number
    },
    proof: { 
        type: Number
    },
    abv: { 
        type: Number
    },
    spirit_type: { 
        type: String
    },
    brand_id: { 
        type: Number
    },
    popularity: { 
        type: Number
    },
    image_url: { 
        type: String
    },
    avg_msrp: { 
        type: Number
    },
    fair_price: { 
        type: Number
    },
    shelf_price: { 
        type: Number
    },
    total_score: { 
        type: Number
    },
    wishlist_count: { 
        type: Number
    },
    vote_count: { 
        type: Number
    },
    bar_count: { 
        type: Number
    },
    ranking: { 
        type: Number
    }
}, {
    timestamps: true
});

// Create indexes for common queries
whiskeySchema.index({ name: 1 });
whiskeySchema.index({ spirit_type: 1 });
whiskeySchema.index({ ranking: 1 });
whiskeySchema.index({ total_score: -1 });

// Query helper methods
whiskeySchema.statics.findBySpirit = function(spiritType: string) {
    return this.find({ spirit_type: spiritType }).sort({ ranking: 1 });
};

whiskeySchema.statics.findTopRated = function(limit = 10) {
    return this.find().sort({ total_score: -1 }).limit(limit);
};

whiskeySchema.statics.findInPriceRange = function(min: number, max: number) {
    return this.find({
        avg_msrp: { $gte: min, $lte: max }
    }).sort({ total_score: -1 });
};

whiskeySchema.statics.searchByName = function(query: string) {
    return this.find({
        name: { $regex: query, $options: 'i' }
    }).sort({ total_score: -1 });
};

const WhiskeyData = mongoose.model<WhiskeyDocument, WhiskeyModel>('WhiskeyData', whiskeySchema);

export default WhiskeyData;