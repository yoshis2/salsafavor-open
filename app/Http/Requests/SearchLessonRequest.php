<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchLessonRequest extends FormRequest
{
    /**
     * Determine if the user is rules to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'week' => ['nullable', 'string'],
            'genre_id' => ['nullable', 'string'],
            'prefecture_id' => ['nullable', 'string'],
        ];
    }
}
