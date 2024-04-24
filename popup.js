document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('convertButton').addEventListener('click', convertToExcel);

    var overlay = document.getElementById('overlay');
    var overlayImage = document.getElementById('overlayImage');
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        overlay.style.display = 'flex';
        setTimeout(function () {
            if (overlayImage.src.toLowerCase().endsWith('.gif')) {
                // Si es un GIF, establece la velocidad de fotogramas para cámara rápida
                overlayImage.style.animation = 'playGif 2s steps(1) infinite';
            }
            overlay.style.display = 'none';
        }, 2000);
    });

});

function convertToExcel() {
    // Obtener el valor del texto de entrada (cadena Base64)
    var base64String = document.getElementById('base64Input').value.trim();

    // Crear un enlace de descarga con el archivo de Excel
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + base64String;
    downloadLink.download = 'excel_file.xlsx';
    document.body.appendChild(downloadLink);

    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Limpiar el enlace después de la descarga
    document.body.removeChild(downloadLink);
}