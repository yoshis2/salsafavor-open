<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'genres';

    // public $timestamps = true; (default)

    protected $fillable = ['name'];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_genres');
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'lesson_genres');
    }
}
