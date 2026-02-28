<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @inertiaHead
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    <!-- Google Tag Manager -->
    <script>
        window.dataLayer = window.dataLayer || [];
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '{{ config('google.TagManager', 'null') }}');
    </script>
    <!-- End Google Tag Manager -->
</head>

<body>
    @inertia
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ config('google.TagManager', 'null') }}"
            style="display:none;visibility:hidden" height="0" width="0"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
</body>

</html>
