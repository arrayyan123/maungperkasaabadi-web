<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    protected $fillable = [
        'year',
        'title',
        'desc',
        'tags',
        'right',
        'gradient',
        'pulse'
    ];

    protected $casts = [
        'tags' => 'array',
        'right' => 'boolean',
        'gradient' => 'boolean',
        'pulse' => 'boolean',
    ];
}
