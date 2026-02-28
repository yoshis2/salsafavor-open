<?php

namespace App\Services;

use App\Enums\PermissionWordType;
use App\Enums\RobotWordType;
use Log;
use RakutenRws_Client;

class ShopService
{
    public function normalizeProducts($items, string $linkType, string $linkLabel): array
    {
        // オブジェクトなら toArray() で配列化
        if (is_object($items) && method_exists($items, 'toArray')) {
            $items = $items->toArray();
        }
        $products = [];

        foreach ($items['Items'] ?? [] as $item) {
            $product = $item['Item'];
            $products[] = [
                'imageUrl' => $product['mediumImageUrls'][0]['imageUrl'] ?? '',
                'title' => $product['itemName'] ?? '',
                'price' => isset($product['itemPrice']) ? number_format($product['itemPrice']).' 円' : '',
                'shopName' => $product['shopName'] ?? '',
                'links' => [
                    [
                        'type' => $linkType,
                        'url' => $product['affiliateUrl'] ?? '',
                        'label' => $linkLabel,
                    ],
                ],
            ];
        }

        return $products;
    }

    public function rakutenSearch($genreID, $param)
    {
        $searchCondition = [
            'format' => 'json',
            'NGKeyword' => '【中古】 氷川きよし USED',
            'imageFlag' => true,
            'orFlag' => false,
            'field' => false,
            'hits' => 30,
        ];

        $searchCondition['keyword'] = $this->setKeyword($param);
        $searchCondition['genreId'] = $genreID;
        foreach (PermissionWordType::RAKUTEN_SEARCH as $search) {
            if (isset($param[$search])) {
                $searchCondition[$search] = $param[$search];
            }
        }

        $client = new RakutenRws_Client;
        $client->setApplicationId(Config('api.Rakuten.ApplicationID'));   // アプリID (デベロッパーID) をセットします
        $client->setAffiliateId(Config('api.Rakuten.AffiliateID'));   // アフィリエイトID をセットします(任意)
        $response = $client->execute('IchibaItemSearch', $searchCondition);

        // レスポンスが正しいかを isOk() で確認することができます
        if ($response->isOk() === 0) {
            Log::error('Error:'.$response->getMessage());
        }

        if (! isset($response['count'])) {
            Log::info('カウントが存在しない');
            abort(403, 'Forbidden');
        }

        return $response;
    }

    private function setKeyword($param)
    {
        if (isset($param['keyword']) && in_array($param['keyword'], RobotWordType::NG)) {
            Log::info('NGワード');
            abort(403, 'Forbidden');
        }

        if (isset($param['gender']) && ! in_array($param['gender'], ['レディース', 'メンズ'])) {
            Log::info('genderに不正なパラメータが発生しました');
            abort(403, 'Forbidden');
        }

        $keyword = 'サルサ';
        foreach (PermissionWordType::RAKUTEN_KEYWORD as $search) {
            if (isset($param[$search])) {
                $keyword = $param[$search].' '.$keyword;
            }
        }

        return $keyword;
    }

    public function pagingFix(array $param, int $pageCount = 1)
    {
        if (empty($param['page']) || $param['page'] < 1) {
            $param['page'] = 1;
        }

        if ($param['page'] > $pageCount) {
            $param['page'] = $pageCount;
        }

        if ($param['page'] > $pageCount) {
            $param['page'] = $pageCount;
        }

        return $param['page'];
    }

    public function valueCommerceSearch($page, $category, $keyword)
    {
        $baseurl = 'http://webservice.valuecommerce.ne.jp/productdb/search?token=';

        $keyword = '&keyword='.urlencode($keyword);
        $pageParam = '&page='.$page;

        $requestURL = $baseurl.Config('api.ValueCommerceToken').$pageParam.$keyword.$category.'&format=JSON';

        return $requestURL;
    }

    /**
     * お問い合わせの関数が始まる前の処理.
     *
     * @param  string  $requestURL  リクエストURL
     * @return string
     */
    public function beforeProcessingItems($requestURL)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $requestURL);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $contents = curl_exec($ch);
        if (curl_errno($ch)) {
            echo curl_error($ch);
            echo "\n<br />";
            $contents = '';
        }

        if (! is_string($contents) || ! strlen($contents)) {
            Log::info('コンテンツの取得に失敗しました。');
            $contents = '';
        }

        return $contents;
    }
}
