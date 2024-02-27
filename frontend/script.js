const products = [
    { barcode: '0613008730772', name: 'Product  1', price: 10.99, description: 'Bouteille test' },
    { barcode: '234567890123', name: 'Product  2', price: 15.99, description: 'This is product  2' },
    { barcode: '345678901234', name: 'Product  3', price: 20.99, description: 'This is product  3' },
    { barcode: '456789012345', name: 'Product  4', price: 25.99, description: 'This is product  4' },
    { barcode: '567890123456', name: 'Product  5', price: 30.99, description: 'This is product  5' },
    { barcode: '678901234567', name: 'Product  6', price: 35.99, description: 'This is product  6' },
    { barcode: '789012345678', name: 'Product  7', price: 40.99, description: 'This is product  7' },
    { barcode: '890123456789', name: 'Product  8', price: 45.99, description: 'This is product  8' },
    { barcode: '901234567890', name: 'Product  9', price: 50.99, description: 'This is product  9' },
    { barcode: '012345678901', name: 'Product  10', price: 55.99, description: 'This is product  10' }
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
                alert('Product find, ' + product.name + ' ' + product.price + ' ' + product.description)
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