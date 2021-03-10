import { API, DATA } from '../../index';
import Cron from 'cron';

export const mehNotifier = new Cron.CronJob(
    '00 00 07 * * *',
    async () => {
        const productInfo = await API.get(`${DATA.endpoints.meh}${process.env.MEH_AUTH}`);

        await API.post(
            `${process.env.DISCORD_MEH_HOOK}`,
            {
                'Content-type' : 'application/json'
            },
            {
                username: 'MehBot',
                content: `${productInfo.data.deal.title}`
            }
        );
    },
    null,
    true,
    'America/Los_Angeles'
);