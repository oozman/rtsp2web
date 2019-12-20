![RTSP2Web](https://i.imgur.com/ZjhuJn0.png)

## RTSP2Web

A simple script that brings RTSP to web. Usually helpful if you want to bring your video or IP cam streams to web.

### Installation

1. Rename `.env.example` to `.env`
2. Replace `.env` variables respectively:
   
   ```
   RTSP_NAME=YourNameHere
   RTSP_URL=rtsp://user:pass@ip
   ```
   
3. Build this container by running this command:

   ```
   docker build --tag rtsp2web .
   ```

4. After building the container, you can run it as follow:

    ```
    docker run -p 8000:80 rtsp2web
    ```

### Accessing Your Live Stream

You can access the link to your stream as follows:

#### RTMP 
```
rtmp://localhost/live/<RTSP_NAME>
```

#### http-flv
```
http://localhost/live/<RTSP_NAME>.flv
```

#### websocket-flv
```
ws://localhost/live/<RTSP_NAME>.flv
```

#### HLS
```
http://localhost/live/<RTSP_NAME>/index.m3u8
```

#### DASH
```
http://localhost/live/<RTSP_NAME>/index.mpd
```

#### via flv.js over http-flv

```html
<script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost/live/<RTSP_NAME>.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
```

#### via flv.js over websocket-flv

```html
<script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'ws://localhost/live/<RTSP_NAME>.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
```


**Note:** `<RTSP_NAME>` is the value you set in for *<RTSP_NAME>* in your `.env` file.

### Access Dashboard

You can access the dashboard at:
`http://localhost/admin`

### For more info

If you want to customize the settings, you can refer to [Node-Media-Server](https://github.com/illuspas/Node-Media-Server) which this script is based on.
