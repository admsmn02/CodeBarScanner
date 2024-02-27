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
            alert('Barcode detected: ' + code);

            // Send the barcode to the backend
            fetch('/check-barcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ barcode: code }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // You can handle the response here, e.g., display it on the page
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
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