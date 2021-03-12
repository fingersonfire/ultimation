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
                username: 'Bebot',
                content: `[${productInfo.data.deal.title}](${productInfo.data.deal.url})`
            }
        );
    },
    null,
    true,
    'America/Los_Angeles'
);

export const dailyMeme = new Cron.CronJob(
    '00 00 06 * * *',
    async () => {
        const d = new Date();

        switch (d.getDay()) {
            case 0:
                await sendMeme('https://twitter.com/ItBeSunday/status/1368586237926383616');
                break;
            case 1:
                await sendMeme('https://twitter.com/RiseMonday/status/1368849138708848643');
                break;
            case 2:
                await sendMeme('https://twitter.com/tuesdaymateys/status/1369154910353252355');
                break;
            case 3:
                await sendMeme('https://twitter.com/SailerWednesday/status/1369585318370762752');
                break;
            case 4:
                await sendMeme('https://twitter.com/ThursdaySailer/status/1367369219185119237');
                break;
            case 5:
                await sendMeme('https://twitter.com/FridaySailer/status/1367822956362035200');
                break;
            case 6:
                await sendMeme('https://twitter.com/SaturdaySailer/status/1368171736034906112');
                break;
            default:
                break;
        }
    }
);

async function sendMeme(url) {
    await API.post(
        `${process.env.DISCORD_GENERAL_HOOK}`,
            {
                'Content-type' : 'application/json'
            },
            {
                username: 'Bebot',
                content: url
            }
    )
}