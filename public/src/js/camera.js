// カメラストリームを格納する変数
let currentStream = null;

// DOMツリーが完全に読み込まれた後にイベントリスナーを設定
document.addEventListener("DOMContentLoaded", () => {
    startCamera();
});

// カメラを起動する関数
async function startCamera() {
    const userVideo = document.getElementById("userVideo");
    
    if (!userVideo) {
        return;
    }
    
    // 既存のストリームがあれば停止
    if (currentStream) {
        stopCamera();
    }

    // カメラの設定
    const constraints = {
        video: {
            facingMode: 'environment', // 'environment'でリアカメラ、'user'でフロントカメラ
        },
        audio: false
    };

    // カメラの映像を取得
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    userVideo.srcObject = currentStream;
    
    // 自動再生を開始
    await userVideo.play();        
}

// カメラを停止する関数
function stopCamera() {
    const userVideo = document.getElementById("userVideo");
    
    if (currentStream) {
        // すべてのトラックを停止
        const tracks = currentStream.getTracks();
        tracks.forEach(track => track.stop());
        currentStream = null;
    }
    
    if (userVideo) {
        userVideo.srcObject = null;
    }
}

// ページが閉じられる時にカメラを停止
globalThis.addEventListener("beforeunload", () => {
    stopCamera();
});
