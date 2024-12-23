<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teams extends Model
{
    protected $table = 'teams';

    protected $fillable = [
        'name',
        'position',
        'description',
        'image',
    ];
}
