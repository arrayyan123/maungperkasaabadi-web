<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->string('author')->nullable();
            $table->timestamps();
        });

        Schema::create('blog_images', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('blog_id');
            $table->foreign('blog_id')->references('id')->on('blogs')->cascadeOnDelete();
            $table->string('path');
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('blog_id');
            $table->foreign('blog_id')->references('id')->on('blogs')->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->text('comment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
        Schema::dropIfExists('blog_images');
        Schema::dropIfExists('blogs');
    }
};
