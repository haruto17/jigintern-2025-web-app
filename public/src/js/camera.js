// カメラストリームを格納する変数
let currentStream = null;

// DOMツリーが完全に読み込まれた後にイベントリスナーを設定
document.addEventListener("DOMContentLoaded", () => {
    setupCameraControls();
});

// カメラコントロールのイベントリスナーを設定
function setupCameraControls() {
    // 自動でカメラを開始
    startCamera();
}

// カメラを起動する関数
async function startCamera(facingMode = 'environment') {
    const userVideo = document.getElementById("userVideo");
    
    if (!userVideo) {
        console.error("video要素が見つかりません");
        return;
    }

    try {
        // 既存のストリームがあれば停止
        if (currentStream) {
            stopCamera();
        }

        // カメラの設定
        const constraints = {
            video: {
                facingMode: facingMode, // 'environment'でリアカメラ、'user'でフロントカメラ
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 }
            },
            audio: false
        };

        // カメラの映像を取得
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        userVideo.srcObject = currentStream;
        
        // 自動再生を開始
        await userVideo.play();
        
        console.log("カメラが正常に起動しました");
        
    } catch (error) {
        console.error("カメラの起動に失敗しました:", error);
        
        // エラーメッセージを表示
        if (error.name === 'NotAllowedError') {
            alert('カメラの使用が許可されていません。ブラウザの設定を確認してください。');
        } else if (error.name === 'NotFoundError') {
            alert('カメラが見つかりません。');
        } else if (error.name === 'NotSupportedError') {
            alert('このブラウザはカメラ機能をサポートしていません。');
        } else {
            alert('カメラの起動に失敗しました: ' + error.message);
        }
    }
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
    
    console.log("カメラが停止されました");
}

// ページが閉じられる時にカメラを停止
globalThis.addEventListener("beforeunload", () => {
    stopCamera();
});
