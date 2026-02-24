const $ = (elem) => (document.querySelector(elem))
const $dropZone = $("#drop-zone");
const $canvas = $("#canvas");
const ctx = $canvas.getContext("2d");
const horMax = 600
const vertMax = 400

$dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
});

$dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleFile(file)
});

const $fileInput = document.createElement("input");
$fileInput.type = "file";
$fileInput.accept = "image/*";
$fileInput.style.display = "none";
document.body.appendChild($fileInput);

$dropZone.addEventListener("click", () => {
    $fileInput.click();
});


$fileInput.addEventListener("change", () => {
    const file = $fileInput.files[0];
    handleFile(file);
});

const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
        alert('Eso no es una imagen')
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
            maxSide = img.width < img.height ? vertMax : horMax
            let scale = maxSide / (Math.max(img.width, img.height))
            img.width *= scale
            img.height *= scale
            $canvas.width = 1.2 * img.width
            $canvas.height = 1.3 * img.height
            $canvas.style.width = `${$canvas.width}px`
            $canvas.style.height = `${$canvas.height}px`
            drawImage(ctx, img)

            downloadImage($canvas)
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

const drawImage = (ctx, img) => {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    ctx.strokeStyle = 'rgb(255,255,255)'
    ctx.strokeRect(($canvas.width - img.width) / 2 - 4, ($canvas.height - img.height) * .2 - 4, img.width + 8, img.height + 8);
    ctx.drawImage(img, ($canvas.width - img.width) / 2, ($canvas.height - img.height) * .2, img.width, img.height);
    ctx.font = "40px sans-serif";
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fillText("qué", $canvas.width / 2, $canvas.height * .9);
    ctx.font = "20px sans-serif";
    ctx.fillText("XD", $canvas.width / 2, $canvas.height * .96);
}

const downloadImage = ($canvas) => {
    const dataURL = $canvas.toDataURL("image/png");
    const $link = document.createElement("a");
    $link.href = dataURL;
    $link.download = '';
    document.body.appendChild($link);
    $link.click();
    document.body.removeChild($link);
}


$dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    $dropZone.classList.add('is-dragover')
})

$dropZone.addEventListener('dragleave', () => {
    $dropZone.classList.remove('is-dragover')
})

$dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    $dropZone.classList.remove('is-dragover')
})

