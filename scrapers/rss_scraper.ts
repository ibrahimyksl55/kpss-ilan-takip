import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function fetchMemurlarRSS() {
    console.log('Fetching Memurlar.net RSS...');
    try {
        const { data } = await axios.get('https://www.memurlar.net/rss/', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const parser = new XMLParser();
        const jsonObj = parser.parse(data);
        
        // Memurlar.net RSS yapısını kontrol edelim
        const items = jsonObj.rss?.channel?.item || [];
        
        return items.map((item: any) => ({
            title: item.title,
            institution: 'Memurlar.net',
            original_url: item.link,
            source_name: 'memurlar.net',
            start_date: new Date(item.pubDate || Date.now()).toISOString()
        }));
    } catch (e) {
        console.error('RSS fetch error:', e);
        return [];
    }
}
