<?php

namespace Database\Factories;

use App\Models\Availability;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Availability>
 */
class AvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $day = fake()->numberBetween(1, 5); // weekdays

        return [
            'uuid' => Str::uuid()->toString(),
            'business_id' => null,
            'available_id' => null,
            'available_type' => null,

            'day_of_week' => $day,
            'day_name' => [
                0 => 'sunday',
                1 => 'monday',
                2 => 'tuesday',
                3 => 'wednesday',
                4 => 'thursday',
                5 => 'friday',
                6 => 'saturday',
            ][$day],

            'start_time' => '10:00:00',
            'end_time' => '20:00:00',
            'is_available' => true,
        ];
    }

    public function employeeShift(): static
    {
        return $this->state(function () {
            return [
                'day_of_week' => fake()->numberBetween(4, 6), // Thu–Sat
                'start_time' => '11:00:00',
                'end_time' => '21:00:00',
            ];
        });
    }
}
