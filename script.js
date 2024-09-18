document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const destinationFolder = document.getElementById('destinationFolder').value;
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Пожалуйста, выберите папку для загрузки.');
        return;
    }

    if (!destinationFolder) {
        alert('Пожалуйста, укажите папку назначения на сервере.');
        return;
    }

    const batchSizeLimit = 100;
    const batchSizeLimitBytes = 20 * 1024 * 1024; // 20 MB
    let currentIndex = 0;
    let totalCopied = 0;
    let totalSkipped = 0;
    // let totalBatches = Math.ceil(files.length / batchSizeLimit);
    const totalSize = Array.from(files).reduce((accumulator, file) => accumulator + file.size, 0);
    // let currentBatch = 0;
    let currentSize  = 0;
    let startTime = Date.now();

    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressBarText = document.querySelector('.progress-bar-text');

    function sendBatch() {
        const formData = new FormData();
        formData.append('destinationFolder', destinationFolder);

        let batchFiles = [];
        let batchSizes = [];
        let batchTotalSize = 0;

        while (currentIndex < files.length && batchFiles.length < batchSizeLimit && batchTotalSize < batchSizeLimitBytes) {
            const file = files[currentIndex];
            batchFiles.push(file);
            batchSizes.push(file.size);
            batchTotalSize += file.size;
            currentIndex++;
        }

        for (let i = 0; i < batchFiles.length; i++) {
            formData.append('files[]', batchFiles[i], batchFiles[i].webkitRelativePath);
            formData.append('sizes[]', batchSizes[i]);
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'upload');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(`Пакет загружен успешно!\nСкопировано: ${response.copied}\nПропущено: ${response.skipped}`);

                totalCopied += response.copied;
                totalSkipped += response.skipped;

                // currentBatch++;
                currentSize+=batchTotalSize;
                const progress = (currentSize / totalSize) * 100;
                progressBarFill.style.width = `${progress}%`;
                progressBarText.textContent = `${progress.toFixed(2)}%`;

                const elapsedTime = (Date.now() - startTime) / 1000;
                progressBarText.textContent += ` (${elapsedTime.toFixed(2)} сек)`;

                if (currentIndex < files.length) {
                    sendBatch();
                } else {
                    alert(`Все файлы загружены успешно!\nСкопировано: ${totalCopied}\nПропущено: ${totalSkipped}`);
                }
            } else {
                alert('Ошибка загрузки файлов: ' + xhr.statusText);
            }
        };

        xhr.onerror = function() {
            alert('Ошибка загрузки файлов: ' + xhr.statusText);
        };

        xhr.send(formData);
    }

    sendBatch();
});