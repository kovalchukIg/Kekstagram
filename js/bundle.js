(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      ESC_KEYKODE = 27,
      ENTER_KEYKODE = 13;




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

        console.log(arrayHashtags);
        arrayHashtags.forEach(function (element) {
            if (/[a-zа-я0-9]#/g.test(element)){
                formHashtags.setCustomValidity("має бути відступ");
            }
            else if (element.charAt(0) !== "#"){
                formHashtags.setCustomValidity("хештег має починатися з #");
                console.log(element);
            }
            else if (arrayHashtags === "#"){
                formHashtags.setCustomValidity("хештег не може містити тільки #");
            }
            else if (arrayHashtags.length > 5){
                formHashtags.setCustomValidity("не можна написати більше 5 хештегів");
            }
            else if (element.length > 20){
                formHashtags.setCustomValidity("хештег не може містити більше 20 символів");
            }
            else if (isDublicated){
                formHashtags.setCustomValidity("однакові значення");
            }
        });
    }


    formHashtags.addEventListener("input", sendHashtags);
}

module.exports = form;

},{}],2:[function(require,module,exports){
function gallery () {

    const pictures = document.querySelector(".pictures"),
        teplate = document.querySelector("#picture-template").content,
        overlay = document.querySelector(".gallery-overlay"),
        overlayClose = document.querySelector(".gallery-overlay-close"),
        fragment = document.createDocumentFragment(),
        ESC_KEYKODE = 27,
        ENTER_KEYKODE = 13,
        photosQuantity = 26;

    function getRandomFromInterval(min, max) {
        const index = Math.floor(Math.random() * (max - min) + min);
        return index;
    }
    let photos = [];


    let comment = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    for (let i = 1; i <= photosQuantity; i++){
        photos.push({
            url: 'photos/' + i + '.jpg',
            likes: getRandomFromInterval(15, 200),
            comment: comment[getRandomFromInterval(0, comment.length)]
        });

    }

    function createPhotoElements(photoCount) {
        for (let i = 0; i < photoCount; i++){
            let photoElement = teplate.cloneNode(true);
            photoElement.querySelector(".picture img").src = photos[i].url;
            photoElement.querySelector(".picture-comments").textContent = photos[i].comment;
            photoElement.querySelector(".picture-likes").textContent = photos[i].likes;
            fragment.appendChild(photoElement);
        }
        pictures.appendChild(fragment);

    }
    function showPhotoElement(evt) {
        evt.preventDefault();
        overlay.classList.remove("hidden");
        overlay.querySelector(".gallery-overlay-image").src = evt.currentTarget.querySelector(".picture-img").src;
        overlay.querySelector(".likes-count").textContent = evt.currentTarget.querySelector(".picture-likes").textContent;
        overlay.querySelector(".comments-count").textContent = evt.currentTarget.querySelector(".picture-comments").textContent;
    }
    document.addEventListener("keydown", onPoppEsc);

    createPhotoElements(photosQuantity);

    function renderShowFhoto() {
        let pict = document.querySelectorAll(".picture");
        for (let i = 0; i < pict.length; i++){
            pict[i].addEventListener("click", showPhotoElement);
        }
    }

    renderShowFhoto();

    function onPoppEsc(evt) {
        if(evt.keyCode === ESC_KEYKODE){
            closePopup();
        }
    }

    function closePopup(){
        overlay.classList.add("hidden");
    }

    overlayClose.addEventListener("click", closePopup);
    overlayClose.addEventListener("keydown", function (evt) {
        if (evt.keyCode === ENTER_KEYKODE){
            closePopup();
        }
    });
    overlay.addEventListener("keydown", function (evt) {
        if(evt.keyCode === ENTER_KEYKODE){
            showPhotoElement();
        }

    });
}

module.exports = gallery;
},{}],3:[function(require,module,exports){
window.addEventListener("DOMContentLoaded", function () {
    let gallery = require("./parts/gallery"),
        form = require("./parts/form");

    gallery();
    form();
});
},{"./parts/form":1,"./parts/gallery":2}]},{},[3]);
