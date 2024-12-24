<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OurService extends Model
{
    protected $table = 'services';

    protected $fillable = [
        'title',
        'link_web',
        'image',
    ];
}
