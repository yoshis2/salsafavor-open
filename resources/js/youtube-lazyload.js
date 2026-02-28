document.addEventListener('DOMContentLoaded', function () {
    const youtubePlaceholders = document.querySelectorAll('.youtube-placeholder');

    if ('IntersectionObserver' in window) {
        // IntersectionObserverをサポートするブラウザ
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const embedSrc = placeholder.dataset.embedSrc;
                    const title = placeholder.title; // プレースホルダーからタイトルを取得

                    // iframe要素を動的に作成
                    const iframe = document.createElement('iframe');
                    iframe.classList.add('embed-responsive-item'); // Bootstrapのクラスを保持
                    iframe.src = embedSrc; // autoplay=1 を削除
                    iframe.title = title;
                    iframe.frameborder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true; // allowfullscreen 属性を設定

                    // プレースホルダーをiframeに置き換え
                    placeholder.parentNode.replaceChild(iframe, placeholder);

                    // この要素の監視を停止
                    observer.unobserve(placeholder);
                }
            });
        }, {
            // IntersectionObserverのオプション (必要に応じて調整)
            // rootMargin: '0px', // デフォルト
            // threshold: 0.1 // 要素の10%が見えたらトリガー
        });

        // 各プレースホルダーの監視を開始
        youtubePlaceholders.forEach(function (placeholder) {
            observer.observe(placeholder);
        });

    } else {
        // IntersectionObserverをサポートしないブラウザ向けのフォールバック
        // クリックされたらiframeを読み込むようにします
        youtubePlaceholders.forEach(function (placeholder) {
            const embedSrc = placeholder.dataset.embedSrc;
            const title = placeholder.title;

            placeholder.addEventListener('click', function() {
                 // クリックされたらiframeを動的に作成して置き換え
                 const iframe = document.createElement('iframe');
                 iframe.classList.add('embed-responsive-item'); // Bootstrapのクラスを保持
                 iframe.src = embedSrc; // autoplay=1 を削除
                 iframe.title = title;
                 iframe.frameborder = '0';
                 iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                 iframe.allowFullscreen = true; // allowfullscreen 属性を設定

                 placeholder.parentNode.replaceChild(iframe, placeholder);
            });
        });
         console.warn('IntersectionObserver is not supported. YouTube videos will load on click.');
    }
});
