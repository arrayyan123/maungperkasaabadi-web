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
        Schema::create('timelines', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('title');
            $table->text('desc');
            $table->json('tags')->nullable(); // array objek tag
            $table->boolean('right')->default(false); // posisi timeline di kanan
            $table->boolean('gradient')->default(false); // gradient card?
            $table->boolean('pulse')->default(false); // animasi dot?
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timelines');
    }
};
