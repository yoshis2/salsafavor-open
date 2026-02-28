<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'lessons';

    protected $fillable = [
        'user_id',
        'name',
        'frequency',
        'week',
        'start_time',
        'end_time',
        'price',
        'prefecture_id',
        'address',
        'place',
        'station',
        'instructor',
        'web',
        'mail',
        'phone',
        'details',
        'published',
        'created_date',
    ];

    public function user()
    {
        return $this->belongsToMany('App\Models\User');
    }

    public function prefecture()
    {
        return $this->hasOne('App\Models\Prefecture', 'id', 'prefecture_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'lesson_genres', 'lesson_id', 'genre_id');
    }

    public function images()
    {
        return $this->hasMany('App\Models\LessonImage')
            ->orderBy('order', 'asc');
    }
}
