import  { type Provider, wrapInJsonBlock } from '@olivertj/agent-builder';
import { BarDataAPI, BarContent, WhiskeyContent } from '@/types';
import axios from 'axios';

export const barProvider = (username: string): Provider => ({
    key: 'bar',
    type: 'system',
    index: 0,
    title: `${username}'s Bar`,
    execute: async () => {
        const response = await axios.get<BarDataAPI[]>(`http://services.baxus.co/api/bar/user/${username}`);
        const barContent: BarContent[] = response.data.map(item => ({
            name: item.product.name,
            brand: item.product.brand,
            spirit: item.product.spirit,
            size: item.product.size,
            proof: item.product.proof,
            average_msrp: item.product.average_msrp,
            fair_price: item.product.fair_price,
            shelf_price: item.product.shelf_price,
            popularity: item.product.popularity
        }));
        return wrapInJsonBlock(JSON.stringify(barContent, null, 2));
    }
});

export const datasetProvider = (): Provider => ({
    key: 'dataset',
    type: 'system',
    index: 1,
    title: 'Whiskey Dataset',
    execute: async () => {
        const dataset = global.whiskeyData;
        const whiskeyConent: WhiskeyContent[] = dataset.map(item => ({
            name: item.name,
            size: item.size,
            proof: item.proof,
            abv: item.abv,
            spirit_type: item.spirit_type,
            popularity: item.popularity,
            avg_msrp: item.avg_msrp,
            fair_price: item.fair_price,
            shelf_price: item.shelf_price,
            ranking: item.ranking
        }));
        return wrapInJsonBlock(JSON.stringify(whiskeyConent, null, 2));
    }
});
