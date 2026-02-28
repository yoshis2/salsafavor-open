<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'user_id',
        'name',
        'start_datetime',
        'end_datetime',
        'lesson',
        'performance',
        'price',
        'prefecture_id',
        'address',
        'place',
        'station',
        'dj',
        'owner',
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
        return $this->belongsToMany(Genre::class, 'event_genres', 'event_id', 'genre_id');
    }

    public function images()
    {
        return $this->hasMany('App\Models\EventImage')
            ->orderBy('order', 'asc');
    }
}
