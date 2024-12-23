<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerContent extends Model
{
    use HasFactory;

    protected $table = 'partner_content';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];
}
