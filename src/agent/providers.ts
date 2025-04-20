import { type Provider, wrapInJsonBlock } from '@olivertj/agent-builder';
import { BarDataAPI, BarContent, WhiskeyContent } from '@/types';
import { getUserKnowledge } from '@/models/UserKnowledge';
import { getMessagesByThread } from '@/models/Message';
import { getThreadById } from '@/models/Thread';
import axios from 'axios';

const formatTimeAgo = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    return `${diffMins} minutes ago`;
};

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
        let whiskeyConent: WhiskeyContent[] = dataset.map(item => ({
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
        whiskeyConent = whiskeyConent.slice(0, 10); // Limit to 10 items for performance
        return wrapInJsonBlock(JSON.stringify(whiskeyConent, null, 2));
    }
});

export const knowledgeProvider = (username: string): Provider => ({
    key: 'knowledge',
    type: 'system',
    index: 2,
    title: `Knowledge about ${username}`,
    execute: async () => {
        const userKnowledge = await getUserKnowledge(username);
        const knowledge = userKnowledge?.knowledge || {};
        if (Object.keys(knowledge).length === 0) {
            throw new Error(`No knowledge found for user: ${username}`);
        }
        return wrapInJsonBlock(JSON.stringify(knowledge, null, 2));
    }
});

export const messageHistoryProvider = (threadId: string): Provider => ({
    key: 'message_history',
    type: 'prompt',
    index: 0,
    title: `Message History`,
    execute: async () => {
        const messages = await getMessagesByThread(threadId);
        const thread = await getThreadById(threadId);
        
        if (!messages || messages.length === 0) {
            throw new Error(`No messages found for thread: ${threadId}`);
        }
        
        if (!thread) {
            throw new Error(`Thread not found: ${threadId}`);
        }

        const formattedMessages = messages.map(msg => ({
            sent_by: msg.sender_type === 'user' ? thread.username : 'BOB',
            content: msg.content,
            sent_at: formatTimeAgo(msg.created_at)
        }));

        return wrapInJsonBlock(JSON.stringify(formattedMessages, null, 2));
    }
});
