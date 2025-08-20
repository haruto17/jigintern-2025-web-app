document.addEventListener("load", () => {
    startCamera();
}, false);

// カメラを起動する関数
function startCamera() {
    console.log("start");

    const userVideo = document.getElementById("userVideo");

    if (!userVideo) {
        return;
    }

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            userVideo.srcObject = stream;
            userVideo.play();
        })
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
        });
}
