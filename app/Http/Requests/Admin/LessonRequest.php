<?php

namespace App\Http\Requests\Admin;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class LessonRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Determine if the user is rules to make this request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:255'],
            'files' => ['nullable', 'array', 'max:6'],
            'files.*' => [
                'file', // アップロードされたファイルであること
                'image', // 画像ファイルであること
                'mimes:jpg,jpeg,png,gif', // MIMEタイプを指定
                'max:10240', // 最大サイズを指定
                'dimensions:min_width=120,min_height=120,max_width=20000,max_height=20000', // 最小縦横120px 最大縦横2,000px
            ],
            'frequency' => ['required'],
            'week' => ['required'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time' => ['nullable', 'date_format:H:i'],
            'prefecture_id' => ['required'],
            'place' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'files.max' => '画像は6枚まで登録可能です。',
        ];
    }
}
