document.addEventListener('DOMContentLoaded', function () {
    // 送信ボタンの要素を取得します (クラス名 .form-submit-option を持つ要素)
    const submitButton = document.querySelector('.form-submit-option');

    if (submitButton) {
        // 送信ボタンが含まれるフォーム要素を取得します
        const form = submitButton.closest('form');

        if (form) {
            // フォームの送信イベント (submit) にイベントリスナーを追加します
            form.addEventListener('submit', function () {
                // 送信ボタンを無効化します
                submitButton.disabled = true;

                // オプション: ボタンのテキストを変更して、処理中であることをユーザーに伝えることもできます
                // submitButton.textContent = '登録処理中...';
            });
        }
    }
});
