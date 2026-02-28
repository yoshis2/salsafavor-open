<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InquirySendRequest extends FormRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:128'],
            'mail' => ['required', 'string', 'email', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'detail' => ['required', 'string', 'max:4000'],
            'inquiry_token' => ['required', 'string'],
        ];
    }
}
