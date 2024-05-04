$(document).ready(function () {
    const images = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/151",
        "https://via.placeholder.com/152",
        "https://via.placeholder.com/153",
        "https://via.placeholder.com/154",
        "https://via.placeholder.com/155",
        "https://via.placeholder.com/156",
        "https://via.placeholder.com/157",
        "https://via.placeholder.com/158",
        "https://via.placeholder.com/159",
    ];

    const gridContainer = $("#imageGrid");
    const seeMoreBtn = $("#seeMoreBtn");
    const seeLessBtn = $("#seeLessBtn");
    const imagesToShow = 4;
    let currentIndex = 0;

    function displayImages() {
        gridContainer.empty();
        for (let i = 0; i < Math.min(currentIndex + imagesToShow, images.length); i++) {
            gridContainer.append(`<div class="col-md-3 mb-3"><img src="${images[i]}" class="img-fluid"></div>`);
        }
    }

    function toggleButtons() {
        if (currentIndex + imagesToShow >= images.length) {
            seeMoreBtn.addClass('d-none');
            seeLessBtn.removeClass('d-none');
        } else {
            seeMoreBtn.removeClass('d-none');
            seeLessBtn.addClass('d-none');
        }
    }

    seeMoreBtn.click(function () {
        currentIndex += imagesToShow;
        displayImages();
        toggleButtons();
    });

    seeLessBtn.click(function () {
        currentIndex -= imagesToShow;
        displayImages();
        toggleButtons();
    });

    displayImages();
    toggleButtons();
});
