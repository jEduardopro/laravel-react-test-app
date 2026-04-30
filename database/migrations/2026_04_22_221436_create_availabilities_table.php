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
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('business_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->morphs('available');
            $table->unsignedTinyInteger('day_of_week'); // 0–6
            $table->string('day_name', 10); // monday, tuesday, etc.
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('is_available')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->unique([
                'business_id',
                'available_id',
                'available_type',
                'day_of_week',
                'start_time',
                'end_time'
            ], 'availability_unique_slot');

            $table->index(['available_id', 'available_type']);
            $table->index(['business_id', 'day_of_week']);
            $table->index(['business_id', 'day_name']);
            $table->index('created_at');
            $table->index(['business_id', 'created_at', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('availabilities');
    }
};
