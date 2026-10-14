<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Island extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'image',
        'tagline',
        'description',
        'narration',
        'stats',
        'highlights',
    ];

    protected $casts = [
        'stats' => 'array',
        'highlights' => 'array',
    ];
}
