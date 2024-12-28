<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetailImage extends Model
{
    use HasFactory;

    protected $table = 'product_detail_images';

    protected $fillable = [
        'product_detail_id',
        'path',
    ];

    public function blog()
    {
        return $this->belongsTo(ProductDetail::class);
    }
}
