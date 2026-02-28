<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Enums\ShopType;
use App\Http\Requests\RakutenRequest;
use App\Services\ShopService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopsController extends Controller
{
    private $shopService;

    public function __construct(ShopService $shopService)
    {
        $this->shopService = $shopService;
    }

    public function rakutenShoes(RakutenRequest $request)
    {
        $param = $request->all();
        $items = $this->shopService->rakutenSearch(ProductType::DANCE_SHOES, $param);
        if (! isset($items['count'])) {
            $items['count'] = 0;
        }

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'rakuten', '楽天市場'),
            'total' => $items['count'],
            'page' => $this->shopService->pagingFix($param, $items['pageCount']),
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => $param,
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function rakutenMusic(RakutenRequest $request)
    {
        $param = $request->all();
        $items = $this->shopService->rakutenSearch(ProductType::DANCE_MUSIC, $param);
        if (! isset($items['count'])) {
            $items['count'] = 0;
        }

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'rakuten', '楽天市場'),
            'total' => $items['count'],
            'page' => $this->shopService->pagingFix($param, $items['pageCount']),
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => $param,
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function rakutenMovie(RakutenRequest $request)
    {
        $param = $request->all();
        $items = $this->shopService->rakutenSearch(ProductType::MOVIE, $param);

        return Inertia::render('Shop/ProductList', [
            'searchParams' => $param,
            'items' => $this->shopService->normalizeProducts($items, 'rakuten', '楽天市場'),
            'total' => $items['count'],
            'pageCount' => $items['pageCount'] ?? 1,
            'page' => $this->shopService->pagingFix($param, $items['pageCount']),
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function rakutenClothes(RakutenRequest $request)
    {
        $param = $request->all();
        $items = $this->shopService->rakutenSearch(ProductType::DANCE_WEAR, $param);

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'rakuten', '楽天市場'),
            'total' => $items['count'],
            'pageCount' => $items['pageCount'] ?? 1,
            'page' => $this->shopService->pagingFix($param, $items['pageCount']),
            'searchParams' => $param,
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function dvd()
    {
        return \Inertia\Inertia::render('Shop/Dvd');
    }

    public function yahooShoes(Request $request)
    {
        $page = $request->input('page');
        if ($page == null || $page < 1) {
            $page = 1;
        }

        $keyword = $request->input('keyword');
        $searchKeyword = 'ダンス '.$keyword;
        $category = '&category=fashion,shoes';

        $requestURL = $this->shopService->valueCommerceSearch($page, $category, $searchKeyword); // 検索条件を収集
        $beforeProcessingItems = $this->shopService->beforeProcessingItems($requestURL); // 検索し、リスト収集
        $items = json_decode(str_replace('&quot;', '"', $beforeProcessingItems), true);

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'yahoo', 'Yahoo!ショッピング'),
            'total' => $items['count'] ?? 0,
            'page' => $this->shopService->pagingFix(['page' => $page], $items['pageCount'] ?? 1),
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => [
                'keyword' => $keyword,
                'page' => $page,
            ],
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function yahooMusic(Request $request)
    {
        $page = $request->input('page');
        if ($page == null || $page < 1) {
            $page = 1;
        }

        $keyword = $request->input('keyword');
        $searchKeyword = 'サルサ '.$keyword;
        $category = '&category=cd_dvd,cd';

        $requestURL = $this->shopService->valueCommerceSearch($page, $category, $searchKeyword); // 検索条件を収集
        $beforeProcessingItems = $this->shopService->beforeProcessingItems($requestURL); // 検索し、リスト収集
        $items = json_decode(html_entity_decode($beforeProcessingItems), true);

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'yahoo', 'Yahoo!ショッピング'),
            'total' => $items['count'] ?? 0,
            'page' => $page,
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => [
                'keyword' => $keyword,
                'page' => $page,
            ],
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function yahooMovie(Request $request)
    {
        $page = $request->input('page');
        if ($page == null || $page < 1) {
            $page = 1;
        }

        $keyword = $request->input('keyword');
        $searchKeyword = 'サルサ '.$keyword;
        $category = '&category=cd_dvd,dvd_blu-ray';

        $requestURL = $this->shopService->valueCommerceSearch($page, $category, $searchKeyword); // 検索条件を収集
        $beforeProcessingItems = $this->shopService->beforeProcessingItems($requestURL); // 検索し、リスト収集
        $items = json_decode(html_entity_decode($beforeProcessingItems), true);

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'yahoo', 'Yahoo!ショッピング'),
            'total' => $items['count'] ?? 0,
            'page' => $page,
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => [
                'keyword' => $keyword,
                'page' => $page,
            ],
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }

    public function yahooClothes(Request $request)
    {
        $page = $request->input('page');
        if ($page == null || $page < 1) {
            $page = 1;
        }

        $keyword = $request->input('keyword');
        $searchKeyword = '社交ダンス ウェア '.$keyword;
        $category = '&category=';

        $requestURL = $this->shopService->valueCommerceSearch($page, $category, $searchKeyword); // 検索条件を収集
        $beforeProcessingItems = $this->shopService->beforeProcessingItems($requestURL); // 検索し、リスト収集
        $items = json_decode(html_entity_decode($beforeProcessingItems), true);

        return Inertia::render('Shop/ProductList', [
            'items' => $this->shopService->normalizeProducts($items, 'yahoo', 'Yahoo!ショッピング'),
            'total' => $items['count'] ?? 0,
            'page' => $page,
            'pageCount' => $items['pageCount'] ?? 1,
            'searchParams' => [
                'keyword' => $keyword,
                'page' => $page,
            ],
            'colors' => ShopType::COLORS,
            'displayOrders' => ShopType::DISPLAY_ORDER,
        ]);
    }
}
