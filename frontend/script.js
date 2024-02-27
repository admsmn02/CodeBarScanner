document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('startButton');
    var stopButton = document.getElementById('stopButton');
    var barcodeResult = document.getElementById('barcodeResult');
    var videoElement = document.getElementById('videoElement'); // Assurez-vous d'avoir un élément <video> avec cet ID dans votre HTML

    startButton.addEventListener('click', function () {
        var codeReader = new ZXing.BrowserBarcodeReader();
        codeReader.decodeFromVideoDevice(undefined, 'interactive')
            .then(function (result) {
                barcodeResult.textContent = 'Barcode: ' + result.text;
                codeReader.reset();
            })
            .catch(function (err) {
                console.error(err);
                barcodeResult.textContent = 'Error: Could not decode barcode.';
            });

        // Demandez l'accès à la caméra
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                videoElement.srcObject = stream;
                videoElement.play();
            })
            .catch(function (err) {
                console.error("Error accessing camera: ", err);
            });
    });

    stopButton.addEventListener('click', function () {
        codeReader.reset();
        // Arrêtez le flux vidéo
        if (videoElement.srcObject) {
            videoElement.srcObject.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
        }
    });
});