<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Determine if the user is rules to make this request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules()
    {
        return [
            'prefecture_id' => ['required'],
            'web' => ['nullable', 'active_url'],
            'file' => [
                'nullable', // 必須ではない
                'file', // アップロードされたファイルであること
                'image', // 画像ファイルであること
                'max:10240',
                'mimes:jpg,jpeg,png,gif', // MIMEタイプを指定
                'dimensions:min_width=120,min_height=120,max_width=10240,max_height=10240', // 最小縦横120px 最大縦横12,400px
            ],
        ];
    }
}
