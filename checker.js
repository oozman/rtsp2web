require('dotenv').config();
const pm2 = require('pm2');
const http = require('axios');
const CronJob = require('cron').CronJob;

let delay = parseInt(process.env.CHECKER_DELAY);
let streamUrl = 'http://0.0.0.0/live/' + process.env.RTSP_NAME + '/index.m3u8';
let failed = 0;
let restartIn = 3;

runCron(delay);

/**
 * Check if stream is still accessible.
 */
function runCron(delay) {

    // If auto restart is disabled, don't run checker.
    if (process.env.AUTO_RESTART !== "true") {
        return stopChecker();
    }

    let isChecking = false;

    new CronJob('*/' + delay + ' * * * * *', () => {

        if (isChecking) {
            console.log("Currently checking at the moment.");
            return true;
        }

        // If not found, restart and re-stream.
        if (failed > restartIn) {
            failed = 0;
            return restartParser();
        }

        http.get(streamUrl).then(() => {
            // Stream is alive...
        }).catch(xhr => {
            failed++;
            console.log(xhr);
        }).finally(() => {
            isChecking = false;
        });
    }, null, true, process.env.APP_TIMEZONE);
}

/**
 * Stop checker.
 *
 * @returns {boolean}
 */
function stopChecker() {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        console.log("Stopping checker...");

        pm2.stop('checker', (err, result) => {
            console.log("Error", err);
            console.log("Result", result);
        });
    });

    return true;
}

/**
 * Restart parser, which is responsible for parsing video stream.
 *
 * @returns {boolean}
 */
function restartParser() {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        console.log("Restarting parser...");

        pm2.restart('parser', (err, result) => {
            console.log("Error", err);
            console.log("Result", result);
        });
    });

    return true;
}


