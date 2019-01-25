function gallery () {

    const pictures = document.querySelector(".pictures"),
          teplate = document.querySelector("#picture-template").content,
          overlay = document.querySelector(".gallery-overlay"),
          overlayClose = document.querySelector(".gallery-overlay-close"),
          fragment = document.createDocumentFragment(),
          filter = document.querySelector(".filters"),
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
            comment: comment[getRandomFromInterval(0, comment.length)],
        });

    }


    filter.classList.remove("hidden");

    function clearPictures() {
        while (pictures.firstChild) {
            pictures.removeChild(pictures.firstChild);
        }
    }


    function sortFuncArray(evt) {
        clearPictures();
        let filtersArr = evt.target.value,
            randomFhoto = [];

        console.log(filtersArr);

        switch (filtersArr) {
            case "popular":
                randomFhoto = photos.slice(0).sort(function (a, b) {
                    return b.likes - a.likes;
                });
                break;
            case "random":
                randomFhoto = photos.slice(0).sort(function(){
                    return 0.5 - Math.random()
                });
                break;
            case "recommend":
                randomFhoto = photos;
        }
        console.log(randomFhoto);
        for (let i = 0; i < photosQuantity; i++){
            let photoElement = teplate.cloneNode(true);
            photoElement.querySelector(".picture img").src = randomFhoto[i].url;
            photoElement.querySelector(".picture-comments").textContent = randomFhoto[i].comment;
            photoElement.querySelector(".picture-likes").textContent = randomFhoto[i].likes;
            fragment.appendChild(photoElement);
        }
        pictures.appendChild(fragment);

        renderShowFhoto();
    }


    filter.addEventListener("click", sortFuncArray);



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