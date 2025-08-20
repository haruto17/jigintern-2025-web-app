document.addEventListener("load", () => {
    startCamera();
}, false);

// カメラを起動する関数
function startCamera() {
    const userVideo = document.getElementById("userVideo");

    if (!userVideo) {
        return;
    }

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
        });
}
