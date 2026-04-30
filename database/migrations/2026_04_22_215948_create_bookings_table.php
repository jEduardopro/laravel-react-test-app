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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('business_id')->constrained();
            $table->foreignId('service_id')->constrained();
            $table->foreignId('employee_id')->constrained('users', 'id');
            $table->foreignId('customer_id')->constrained();
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->string('status');
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
        Schema::dropIfExists('bookings');
    }
};
