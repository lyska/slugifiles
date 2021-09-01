let dropArea = document.getElementById("drop-area");

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

function handleFiles(files) {
    files = [...files]
    files.forEach(suglifyFileName)
}

function suglifyFileName(file) {
    let reader = new FileReader();

    reader.onloadend = function(){
        let originalName = file.name.split('.').slice(0, -1).join('.');
        let extension = file.name.split('.').slice(-1)[0];
        let slugifiedName = slugify(originalName, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'en',
            trim: true
        });

        if (typeof extension === 'string'){
            slugifiedName = slugifiedName + '.' + extension;
        }

        let link = document.createElement('a');
        link.download = slugifiedName;
        link.href = reader.result;

        link.click();
    }

    reader.readAsDataURL(file);
}