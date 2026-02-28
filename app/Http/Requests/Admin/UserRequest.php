<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'prefecture_id' => ['required'],
            'file' => [
                'nullable', // 必須ではない
                'file', // アップロードされたファイルであること
                'image', // 画像ファイルであること
                'mimes:jpg,jpeg,png,gif', // MIMEタイプを指定
                'max:10240',
                'dimensions:min_width=120,min_height=120,max_width=10240,max_height=10240', // 最小縦横120px 最大縦横12,400px
            ],
        ];
    }
}
