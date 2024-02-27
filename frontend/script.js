document.addEventListener('DOMContentLoaded', function () {
    var resultContainer = document.getElementById('barcode-result');
    var lastResult,
        canvas,
        ctx;

    function onDetected(data) {
        var code = data.codeResult.code;

        if (code !== lastResult) {
            lastResult = code;
            resultContainer.innerHTML = 'Barcode: ' + code;
            alert('Barcode: ' + code);
        }
    }

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive')
        },
        decoder: {
            readers: ["ean_reader"]
        }
    }, function (err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
    });

    Quagga.onDetected(onDetected);
});