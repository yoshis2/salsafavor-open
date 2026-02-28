<?php

namespace App\Http\Requests\Admin;

use Auth;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EventImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'files' => ['required', 'array', 'max:6'],
            'files.*' => [
                'file', // アップロードされたファイルであること
                'image', // 画像ファイルであること
                'max:10240',
                'mimes:jpg,jpeg,png,gif', // MIMEタイプを指定
                'dimensions:min_width=120,min_height=120,max_width=10240,max_height=10240', // 最小縦横120px 最大縦横12,400px
            ],
        ];
    }

    /**
     * バリデーション失敗時に JSON レスポンスを返す
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 400));
    }
}
