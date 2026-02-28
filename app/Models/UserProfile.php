<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_profiles';

    // public $timestamps = true; (default)

    protected $fillable = [
        'user_id',
        'prefecture_id',
        'address',
        'web',
        'image_url',
        'details',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
