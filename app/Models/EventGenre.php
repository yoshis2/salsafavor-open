<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventGenre extends Model
{
    protected $table = 'event_genres';

    protected $fillable = [
        'event_id',
        'genre_id',
    ];

    public function genre()
    {
        return $this->belongsTo('App\Models\Genre');
    }

    public function event()
    {
        return $this->belongsTo('App\Models\Event');
    }
}
