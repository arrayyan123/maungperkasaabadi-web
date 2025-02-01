<?php

use Illuminate\Support\Facades\DB;
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
        Schema::table('products', function (Blueprint $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS = 0');
            Schema::dropIfExists('products');
            DB::statement('SET FOREIGN_KEY_CHECKS = 1');
        });
        Schema::table('product_details', function (Blueprint $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS = 0');
            Schema::dropIfExists('product_details');
            DB::statement('SET FOREIGN_KEY_CHECKS = 1');
        });
        Schema::table('product_detail_images', function (Blueprint $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS = 0');
            Schema::dropIfExists('product_detail_images');
            DB::statement('SET FOREIGN_KEY_CHECKS = 1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
