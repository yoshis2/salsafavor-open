<?php

// app/Http/Requests/ImageRequest.php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ImageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'files' => 'required|array',
            'files.*' => [
                'file',
                'image',
                'mimes:jpg,jpeg,png,gif',
                'max:10240',
                'dimensions:min_width=120,min_height=120,max_width=20000,max_height=20000',
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
