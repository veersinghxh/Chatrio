let peer;
let localStream;

const localVideo = document.getElementById("local");
const remoteVideo = document.getElementById("remote");
const myId = document.getElementById("myId");

/* START CAMERA */

async function start(){

    localStream = await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false
    });

    localVideo.srcObject = localStream;

    await localVideo.play();

    peer = new Peer();

    peer.on("open", id=>{
        myId.innerText = id;
    });

    peer.on("call", call=>{

        call.answer(localStream);

        call.on("stream", stream=>{

            remoteVideo.srcObject = stream;

            remoteVideo.play();

        });

    });

}

/* CALL PEER */

function callPeer(){

    const id = document.getElementById("peerId").value;

    const call = peer.call(id, localStream);

    call.on("stream", stream=>{

        remoteVideo.srcObject = stream;

        remoteVideo.play();

    });

}