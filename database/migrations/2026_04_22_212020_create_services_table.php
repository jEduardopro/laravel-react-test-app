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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('business_id')->constrained();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('duration');
            $table->unsignedBigInteger('buffer_time')->default(0);
            $table->decimal('price', 10);
            $table->longText('notes')->nullable();
            $table->boolean('visible')->default(true);
            $table->unsignedBigInteger('position')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
			$table->index(['business_id', 'created_at', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
