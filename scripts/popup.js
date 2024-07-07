document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['materialText'], function (result) {
        if (result.materialText) {
            document.getElementById('material-text').innerText = result.materialText;
        } else {
            document.getElementById('material-text').innerText = 'No material found.';
        }
    });
});