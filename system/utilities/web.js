import API from '../utilities/api';
import Puppet from 'puppeteer';

/**
 * @callback sessionCallback
 * @param {Puppet.Page} page
 */

export default class Web {

    /**
     * Interact with a puppeteer web session
     * @param {sessionCallback} callback - Callback function to run in the session
     */
    static async session(callback) {
        const browser = await Puppet.launch(), page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');

        try {
            await callback(page);
        } catch (error) {
            try {
                await API.post(
                    `${process.env.DISCORD_DEBUG_HOOK}`,
                    {
                        'Content-type' : 'application/json'
                    },
                    {
                        username: 'Bebot',
                        content: `${error}`
                    }
                );
            } catch (err) { }
        }

        await browser.close();
    }

}