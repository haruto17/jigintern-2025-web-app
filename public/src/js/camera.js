document.addEventListener("DOMContentLoaded", () => {
    startCamera();
});

// カメラを起動する関数
function startCamera() {
    const userVideo = document.getElementById("userVideo");
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