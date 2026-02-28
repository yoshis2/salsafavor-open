document.addEventListener('DOMContentLoaded', function () {
    const galleryModal = $('#imageGalleryModal'); // jQueryオブジェクトとして取得
    const modalImage = document.getElementById('modalGalleryImage');
    const modalPrevButton = document.getElementById('modalPrevButton');
    const modalNextButton = document.getElementById('modalNextButton');
    const triggerImages = document.querySelectorAll('.modal-trigger-image');

    let currentImageIndex = 0;
    const galleryImageSources = [];

    // カルーセル内の全画像の情報を収集
    triggerImages.forEach(img => {
        galleryImageSources.push({
            src: img.dataset.fullSrc,
            alt: img.alt
        });
    });

    function updateModalImage(index) {
        if (index >= 0 && index < galleryImageSources.length) {
            modalImage.src = galleryImageSources[index].src;
            modalImage.alt = galleryImageSources[index].alt;
            currentImageIndex = index;

            // ナビゲーションボタンの表示/非表示制御
            modalPrevButton.style.display = (index === 0 || galleryImageSources.length <= 1) ? 'none' : 'block';
            modalNextButton.style.display = (index === galleryImageSources.length - 1 || galleryImageSources.length <= 1) ? 'none' : 'block';
        }
    }

    triggerImages.forEach(image => {
        image.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            updateModalImage(index);
            galleryModal.modal('show');
        });
    });

    modalPrevButton.addEventListener('click', function() {
        if (currentImageIndex > 0) {
            updateModalImage(currentImageIndex - 1);
        }
    });

    modalNextButton.addEventListener('click', function() {
        if (currentImageIndex < galleryImageSources.length - 1) {
            updateModalImage(currentImageIndex + 1);
        }
    });

    // モーダルが閉じられたときに画像をクリアする（任意）
    galleryModal.on('hidden.bs.modal', function () {
        modalImage.src = '';
    });

    // キーボード操作（左右矢印キー）でのナビゲーション (任意)
    // events/detail.blade.php と同じなので、共通化を検討しても良いでしょう。
    document.addEventListener('keydown', function(event) {
        if (galleryModal.hasClass('show')) { // モーダルが表示されている場合のみ
            if (event.key === 'ArrowLeft') {
                if (currentImageIndex > 0) {
                    updateModalImage(currentImageIndex - 1);
                }
            } else if (event.key === 'ArrowRight') {
                if (currentImageIndex < galleryImageSources.length - 1) {
                    updateModalImage(currentImageIndex + 1);
                }
            }
        }
    });
});
