const products = [
    { barcode: '0613008730772', name: 'Bouteille Arizona', reduction: 10, description: 'Bouteille test' },
    { barcode: '8002270116544', name: 'Bouteille San Pellegrino', reduction: 5, description: 'This is product  2' },
    { barcode: '3268840001008', name: 'Bouteille Cristaline', reduction: 8, description: 'This is product  3' },
    { barcode: '3700123300380', name: 'Nestle Pure Life', reduction: 3, description: 'This is product  4' },
    { barcode: '567890123456', name: 'Product  5', reduction: 30.99, description: 'This is product  5' },
    { barcode: '678901234567', name: 'Product  6', reduction: 35.99, description: 'This is product  6' },
    { barcode: '789012345678', name: 'Product  7', reduction: 40.99, description: 'This is product  7' },
    { barcode: '890123456789', name: 'Product  8', reduction: 45.99, description: 'This is product  8' },
    { barcode: '901234567890', name: 'Product  9', reduction: 50.99, description: 'This is product  9' },
    { barcode: '012345678901', name: 'Product  10', reduction: 55.99, description: 'This is product  10' }
];

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
            // if the code is in the products array
            var product = products.find(p => p.barcode === code);
            if (product) {
                alert('Reduction Code Found on ' + product.name + '. The reduction is ' + product.reduction + '%');
            } else {
                alert('This barcode is not available');
            }
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