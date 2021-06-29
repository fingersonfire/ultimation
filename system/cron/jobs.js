import { API, DATA, Web } from '../../index';
import Cron from 'cron';

export const dailyMeme = new Cron.CronJob(
    '00 00 06 * * *',
    async () => {
        const d = new Date();

        switch (d.getDay()) {
            case 0:
                await discordMsg('general', 'https://twitter.com/ItBeSunday/status/1368586237926383616');
                break;
            case 1:
                await discordMsg('general', 'https://twitter.com/RiseMonday/status/1368849138708848643');
                break;
            case 2:
                await discordMsg('general', 'https://twitter.com/tuesdaymateys/status/1369154910353252355');
                break;
            case 3:
                await discordMsg('general', 'https://twitter.com/SailerWednesday/status/1369585318370762752');
                break;
            case 4:
                await discordMsg('general', 'https://twitter.com/ThursdaySailer/status/1367369219185119237');
                break;
            case 5:
                await discordMsg('general', 'https://twitter.com/FridaySailer/status/1367822956362035200');
                break;
            case 6:
                await discordMsg('general', 'https://twitter.com/SaturdaySailer/status/1368171736034906112');
                break;
            default:
                break;
        }
    }
);

export const graphicsCheck = new Cron.CronJob(
    '00 */5 * * * *',
    async () => {
        try {
            Web.session(async function(page) {

                const products = [
                    {
                        link: 'https://www.amd.com/en/direct-buy/5496921400/us',
                        oosIndicator: 'p[class="product-out-of-stock"]',
                        product: 'Radeon RX 6700 XT'
                    },
                    {
                        link: 'https://www.amd.com/en/direct-buy/5458373400/us',
                        oosIndicator: 'p[class="product-out-of-stock"]',
                        product: 'Radeon RX 6800'
                    }
                ];
        
        
                for (const p of products) {
                    const stock = DATA.productstock.filter(s => { return s.product == p.product })[0];
                    const dataIndex = DATA.productstock.indexOf(stock);
        
                    await page.goto(p.link);
                    const oosIndicator = await page.$(p.oosIndicator);
    
                    const updateStock = function(stockStatus) {
                        File.write('data/storage.json', function(JSON) {
                            stock.inStock = stockStatus;
                            JSON.productstock[dataIndex] = stock;
                            return JSON;
                        });
                    }
        
                    if(oosIndicator == null && !stock.inStock) {
        
                        await discordMsg('debug', `The ${p.product} is in stock: ${p.link}`);
                        updateStock(true);
        
                    } else if(oosIndicator != null && stock.inStock) {
    
                        await discordMsg('debug', `The ${p.product} is out of stock`);
                        updateStock(false);
        
                    }
                }
        
            });
        } catch (error) {
            discordMsg('debug', error);
        }
    },
    null,
    true,
    'America/Los_Angeles'
);

async function discordMsg(channel, content) {
    let webhook;

    switch (channel) {
        case 'debug':
            webhook = process.env.DISCORD_DEBUG_HOOK;
            break;
        case 'general':
            webhook = process.env.DISCORD_GENERAL_HOOK;
            break;
        default:
            webhook = process.env.DISCORD_DEBUG_HOOK;
            break;
    }

    try {
        await API.post(
            `${webhook}`,
                {
                    'Content-type' : 'application/json'
                },
                {
                    username: 'Bebot',
                    content: `${content}`
                }
        );
    } catch (error) {
        console.log(error);
    }

    
}