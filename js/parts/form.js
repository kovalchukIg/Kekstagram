function form () {

const uploadiFile = document.querySelector("#upload-file"),
      uploadOverlay = document.querySelector(".upload-overlay"),
      formCancel = document.querySelector(".upload-form-cancel"),
      formHashtags = document.querySelector(".upload-form-hashtags"),
      controlValue = document.querySelector(".upload-resize-controls-value"),
      buttonInc = document.querySelector(".upload-resize-controls-button-inc"),
      buttonDec = document.querySelector(".upload-resize-controls-button-dec"),
      effectImage = document.querySelector(".effect-image-preview"),
      effectControl = document.querySelector(".upload-effect-controls"),
      form = document.querySelector(".upload-form"),
      formText = document.querySelector(".upload-form-description"),
      dataForm = new FormData(form),
      ESC_KEYKODE = 27,
      ENTER_KEYKODE = 13;


     form.addEventListener("submit", function (evt) {
         window.upload(dataForm, function () {
             uploadOverlay.classList.add("hidden");
             formHashtags.value = "";
             formText.value = "";
             });
         evt.preventDefault();
     });


    uploadiFile.addEventListener("change", showForm);

    function showForm() {
        uploadOverlay.classList.remove("hidden");
    }

    function cancelForm() {
        uploadOverlay.classList.add("hidden");
    }

    formCancel.addEventListener("click", cancelForm);
    formCancel.addEventListener("keydown", function (evt) {
        if (evt.keyCode === ENTER_KEYKODE){
            cancelForm();
        }
    });

    document.addEventListener("keydown", function (evt) {
        if (evt.keyCode === ESC_KEYKODE){
            cancelForm();
        }
    });

    function controlEffect(evt) {
        let controlEfect = "effect-" + evt.target.value;
        if (effectImage.classList.length === 2){
            let previosClass = effectImage.classList[1];
            effectImage.classList.remove(previosClass);
        }
        effectImage.classList.add(controlEfect);


    }

    effectControl.addEventListener("click", controlEffect);

    buttonDec.addEventListener("click", function () {
        let parseaValue = parseInt(controlValue.value, 10);
        if (parseaValue > 25){
            parseaValue = parseaValue - 25;
            controlValue.value = parseaValue + "%";
            effectImage.style.transform = "scale(" + parseaValue / 100 + ")";
        }
    });

    buttonInc.addEventListener("click", function () {
        let parseaValue = parseInt(controlValue.value, 10);
        if (parseaValue < 100){
            parseaValue = parseaValue + 25;
            controlValue.value = parseaValue + "%";
            effectImage.style.transform = "scale(" + parseaValue / 100 + ")";
        }
    });

    function sendHashtags() {
        let arrayHashtags = formHashtags.value.toLowerCase().split(" ");

        console.log(arrayHashtags);

        let isDublicated = arrayHashtags.some(function(item, pos) {
            return arrayHashtags.indexOf(item) !== pos;
        });

        if (arrayHashtags === "#"){
            formHashtags.setCustomValidity("хештег не може містити тільки #");
        } else if (isDublicated){
            formHashtags.setCustomValidity("однакові значення");
        } else if (arrayHashtags.length > 5){
            formHashtags.setCustomValidity("не можна написати більше 5 хештегів");
        }else {
            arrayHashtags.forEach(function (element) {
                if (/[a-zа-я0-9]#/g.test(element)){
                    formHashtags.setCustomValidity("має бути відступ");
                }
                else if (element.charAt(0) !== "#"){
                    formHashtags.setCustomValidity("хештег має починатися з #");
                    console.log(element);
                }
                else if (element.length > 20){
                    formHashtags.setCustomValidity("хештег не може містити більше 20 символів");
                }else {
                    formHashtags.setCustomValidity(" ");
                }
            });
        }
    }


    formHashtags.addEventListener("input", sendHashtags);


}

module.exports = form;
