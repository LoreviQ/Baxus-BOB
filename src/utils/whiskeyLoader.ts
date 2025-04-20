import fs from 'fs';
import path from 'path';
import { WhiskeyData } from '../types/WhiskeyData';

export const loadWhiskeyData = (): WhiskeyData[] => {
    const tsvPath = path.join(__dirname, '..', 'dataset.tsv');
    const fileContent = fs.readFileSync(tsvPath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const headers = lines[0].split('\t');
    
    const data = lines.slice(1).map(line => {
        const values = line.split('\t');
        const entry: any = {};
        
        headers.forEach((header, index) => {
            const value = values[index];
            if (value === '') {
                entry[header] = null;
            } else if (['id', 'size', 'brand_id', 'popularity', 'total_score', 'wishlist_count', 'vote_count', 'bar_count', 'ranking'].includes(header)) {
                entry[header] = parseInt(value);
            } else if (['proof', 'abv', 'avg_msrp', 'fair_price', 'shelf_price'].includes(header)) {
                entry[header] = parseFloat(value);
            } else {
                entry[header] = value;
            }
        });
        
        return entry as WhiskeyData;
    });

    return data;
};