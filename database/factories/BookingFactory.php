<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = Carbon::today()
            ->addDays(fake()->numberBetween(0, 5))
            ->setTime(fake()->numberBetween(10, 17), 0);

        $duration = fake()->randomElement([30, 60]);

        return [
            'uuid' => Str::uuid()->toString(),
            'business_id' => null,
            'service_id' => null,
            'employee_id' => null,
            'customer_id' => null,
            'starts_at' => $start,
            'ends_at' => (clone $start)->addMinutes($duration),

            'status' => fake()->randomElement([
                'confirmed',
                'pending',
                'cancelled',
            ]),
        ];
    }
}
