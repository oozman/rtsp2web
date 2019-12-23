require('dotenv').config();

const NodeMediaServer = require('node-media-server');

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
        allow_origin: '*',
        mediaroot: '/var/www/html/media',
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
    },
    trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                name: process.env.RTSP_NAME
            }
        ]
    }
};

const nms = new NodeMediaServer(config);
nms.run();