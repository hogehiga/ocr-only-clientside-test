function ocr() {
    document.getElementById('txtout').innerHTML = '認識中……';
    var selectedFile = document.getElementById('input').files[0];

    var img = document.createElement("img");
    img.setAttribute('id', 'image');
    img.setAttribute('style', 'border-style: solid; border-width: 10px');
    img.file = selectedFile;
    var img_out_erea = document.getElementById('imgout');
    var already_out = document.getElementById('image');
    if (already_out) {
        img_out_erea.removeChild(already_out);
    }
    img_out_erea.appendChild(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(selectedFile);

    Tesseract
        .recognize(selectedFile, {lang: 'jpn'})
        .then(function(result){
            console.log(result);
            $('#txtout').text(result.text);
        });
};
