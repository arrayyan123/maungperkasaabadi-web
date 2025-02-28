<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_blog'
    ];

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'blog_type_id');
    }
}
