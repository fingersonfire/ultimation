import Cron from 'cron';

export const mehNotifier = new Cron.CronJob(
    '00 00 07 * * *',
    () => {
        console.log('The time is 9:19 PM');
    },
    null,
    true,
    'America/Los_Angeles'
);