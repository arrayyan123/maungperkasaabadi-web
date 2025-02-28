<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class WhyChoose extends Model
{
    use HasFactory;

    protected $table = 'whychoose';

    protected $fillable = [
        'title',
        'description',
        'icon_code',
    ];
}
