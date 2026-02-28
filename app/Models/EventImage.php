<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventImage extends Model
{
    use HasFactory;

    protected $table = 'event_images';

    protected $fillable = [
        'event_id',
        'image_url',
        'order',
    ];

    public function event()
    {
        return $this->belongsTo('App\Models\Event');
    }
}
