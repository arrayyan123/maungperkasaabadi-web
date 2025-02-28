<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;
    protected $table = 'blogs';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'author',
        'blog_type_id',
        'created_at',
        'updated_at',
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
        return $this->hasMany(BlogImage::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function blogType()
    {
        return $this->belongsTo(BlogType::class, 'blog_type_id');
    }
}
