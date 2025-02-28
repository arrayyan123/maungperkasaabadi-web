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
        Schema::create('blog_types', function (Blueprint $table) {
            $table->id();
            $table->string('type_blog')->unique();
            $table->timestamps();
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->unsignedBigInteger('blog_type_id')->nullable();
            $table->foreign('blog_type_id')->references('id')->on('blog_types')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropForeign(['blog_type_id']);
            $table->dropColumn('blog_type_id');
        });
        
        Schema::dropIfExists('blog_types');
    }
};
