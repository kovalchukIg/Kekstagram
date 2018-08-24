'use strict';
(function () {
   var photosQuantity = 25;
    function getRandomFromInterval(min, max) {
        var index = Math.floor(Math.random() * (max - min) + min);
        return index;
    }
    function generatePhotosArray(photoCount) {
        var photos = [];

        var comment = [
            'Всё отлично!',
            'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ];

        for (var i = 1; i <= photoCount; i++){
            photos.push({
                url: 'photos/' + i + '.jpg',
                likes: getRandomFromInterval(15, 200),
                comment: comment[getRandomFromInterval(0, comment.length)]
            });

        }
        return photos;
    }
    function createPhotoElements(photoCount) {
        var photos = generatePhotosArray(photoCount);
        var pictureTemplate = document.querySelector('#picture-template').content;
        var fragment = document.createDocumentFragment();
        var picture = document.querySelector('.picture');
       for (var i = 0; i < photoCount; i++){
           var photoElemnt = pictureTemplate.cloneNode(true);
           photoElemnt.querySelector('img').setAttribute('src', photos[i].url);
           photoElemnt.querySelector('.picture-likes').textContent = photos[i].likes;
           photoElemnt.querySelector('.picture-comments').textContent = photos[i].comment;
           fragment.appendChild(photoElemnt);
        }
        photoElemnt.appendChild(fragment);
        document.querySelector('.upload-overlay').classList.remove('hidden');
    }

    function createGaletyOverlay(photoCount) {
        var photos = generatePhotosArray(photoCount);
        var galleryOverlay = document.querySelector('.gallery-overlay');
        galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photos[getRandomFromInterval(0,24)].url);
        galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
        galleryOverlay.querySelector('.comments-count').textContent = photos[0].comment;
        galleryOverlay.classList.remove('hidden');
    }
    createPhotoElements(photosQuantity);
    createGaletyOverlay(photosQuantity);
})();