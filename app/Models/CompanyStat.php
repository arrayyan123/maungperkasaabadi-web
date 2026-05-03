<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyStat extends Model
{
    protected $fillable = [
        'label',
        'value',
        'order'
    ];
}
