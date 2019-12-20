require('dotenv').config();

const NodeMediaServer = require('node-media-server');

console.log(process.env);

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 80,
        allow_origin: '*'
    },
    relay: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                mode: 'static',
                edge: process.env.RTSP_URL,
                name: process.env.RTSP_NAME,
                rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
            }
        ]
    }
};

const nms = new NodeMediaServer(config);
nms.run();