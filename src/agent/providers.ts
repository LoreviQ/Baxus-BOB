import  { type Provider, wrapInJsonBlock } from '@olivertj/agent-builder';
import { BarDataAPI, BarContent } from '@/types/BarData';
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