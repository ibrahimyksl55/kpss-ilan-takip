import { scrapeSBB } from './sbb';
import { scrapeKariyerKapisi } from './kariyerkapisi';
import { scrapeIlanGov } from './ilangov';
import { supabase } from '../lib/supabase/client';

async function runScrapers() {
    console.log('Starting orchestration...');
    const results = await Promise.all([
        scrapeSBB(),
        scrapeKariyerKapisi(),
        scrapeIlanGov()
    ]);

    const allJobs = results.flat();
    console.log(`Found ${allJobs.length} jobs. Upserting...`);

    const { error } = await supabase
        .from('jobs')
        .upsert(allJobs, { onConflict: 'original_url' });

    if (error) console.error('Supabase error:', error);
    else console.log('Successfully updated jobs.');
}

runScrapers();
