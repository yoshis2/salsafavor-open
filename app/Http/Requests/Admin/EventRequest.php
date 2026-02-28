<?php

namespace App\Http\Requests\Admin;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * 検証用のデータを準備する。
     *
     * リクエストがバリデートされると、バリデーションルールがチェックされた後にこのメソッドが呼ばれます。
     * このメソッドは、フィールドの値を単一の値にマージするなど、
     * バリデーションのためにデータを準備するために使用されるべきです。
     *
     * この場合、event_date フィールド、start_time フィールド、end_time フィールドは、
     * それぞれ単一の start_datetime フィールドと end_datetime フィールドにマージされます。
     * マージする前に、タイムゾーンはAsia/Tokyoに設定されます。
     */
    protected function prepareForValidation(): void
    {
        // タイムゾーンを設定（必要であれば）
        date_default_timezone_set('Asia/Tokyo');

        // event_date, start_time, end_time が存在する場合に結合
        $eventDate = $this->input('event_date');
        $startTime = $this->input('start_time');
        $endTime = $this->input('end_time');

        // nullチェックを追加して、値がない場合にエラーが出ないようにする
        if ($eventDate && $startTime) {
            $this->merge([
                'start_datetime' => date('Y-m-d H:i:s', strtotime($eventDate.' '.$startTime)),
            ]);
        }

        if ($eventDate && $endTime) {
            $this->merge([
                'end_datetime' => date('Y-m-d H:i:s', strtotime($eventDate.' '.$endTime)),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        date_default_timezone_set('Asia/Tokyo');

        $today = date('Y-m-d');
        $maxDate = date('Y-m-d', strtotime($today.' +180 days'));

        return [
            'name' => ['required', 'max:255'],
            'files' => ['nullable', 'array', 'max:6'],
            'files.*' => [
                'file', // アップロードされたファイルであること
                'image', // 画像ファイルであること
                'mimes:jpg,jpeg,png,gif', // MIMEタイプを指定
                'max:10240', // 最大サイズを指定
                'dimensions:min_width=120,min_height=120,max_width=10240,max_height=10240', // 最小縦横120px 最大縦横10,240px
            ],
            'event_date' => [
                'required',
                'date',
                'after_or_equal:'.$today,
                'before_or_equal:'.$maxDate,
            ],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => [
                'required',
                'date_format:H:i',
            ],
            // prepareForValidationで作成したフィールドに対してバリデーション
            'start_datetime' => ['required', 'date'], // 日時形式の確認
            'end_datetime' => ['required', 'date', 'after:start_datetime'], // ここで順序をチェック
            'web' => [
                'nullable',
                'url',
                'active_url',
                'max:255',
            ],
            'mail' => ['nullable', 'email', 'max:255'],
            'prefecture_id' => ['required'],
            'place' => ['required', 'max:255'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'files.max' => '画像は6枚まで登録可能です。',
            'event_date.after_or_equal' => '開催日は今日以降に設定してください。',
            'event_date.before_or_equal' => '開催日は180日以内に設定してください。',
            'end_datetime.after' => '開始日時は終了日時より前に設定してください。',
        ];
    }
}
