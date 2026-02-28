<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonImage extends Model
{
    use HasFactory;

    protected $table = 'lesson_images';

    protected $fillable = [
        'id',
        'lesson_id',
        'image_url',
        'order',
    ];

    public function lesson()
    {
        return $this->belongsToMany('App\Models\Lesson', 'lesson_id');
    }
}
