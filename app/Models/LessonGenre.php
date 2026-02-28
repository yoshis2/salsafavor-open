<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonGenre extends Model
{
    protected $table = 'lesson_genres';

    protected $fillable = [
        'lesson_id',
        'genre_id',
    ];

    public function genre()
    {
        return $this->belongsTo('App\Models\Genre');
    }

    public function lesson()
    {
        return $this->belongsTo('App\Models\Lesson');
    }
}
