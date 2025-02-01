<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductDetail extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'product_id',
        'product_detail_name',
        'product_detail_description',
        'product_detail_type',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function images()
    {
        return $this->hasMany(ProductDetailImage::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}