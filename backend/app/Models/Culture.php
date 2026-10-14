<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Culture extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'category',
        'island',
        'place',
        'summary',
        'description',
        'src',
        'gallery',
        'funFacts',
        'credit',
    ];

    protected $casts = [
        'gallery' => 'array',
        'funFacts' => 'array',
    ];
}
