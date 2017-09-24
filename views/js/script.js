navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        $('video').attr('src', URL.createObjectURL(stream));

        const peer = new Peer({ key: "3197c5d7-0541-4131-92bb-75c8f45eefb4" });

        peer.on('open', () => {
            const sfuRoom = peer.joinRoom('testRoom', { mode: 'sfu', stream: stream });
            sfuRoom.on('stream', remoteStream => {
                const streamURL = URL.createObjectURL(remoteStream);
                const remoteId = remoteStream.peerId;
                $('#videos').append(
                    '<video autoplay class="remoteVideos" src=' + streamURL + ' id="video_' + remoteId + '">'
                );
            });
            sfuRoom.on('removeStream', stream => {
                $('#video_' + stream.peerId).remove();
            });
        });

    });