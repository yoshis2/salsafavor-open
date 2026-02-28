<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RakutenRequest extends FormRequest
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
            'page' => ['nullable', 'numeric', 'max:10'],
            'keyword' => ['nullable', 'string', 'max:255'],
            'sort' => ['nullable', 'string'],
            'genre' => ['nullable', 'string'],
            'musicGenre' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'minPrice' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'maxPrice' => ['nullable', 'numeric', 'min:0', 'max:999999'],
        ];
    }
}
