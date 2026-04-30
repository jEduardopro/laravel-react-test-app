<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => Str::uuid()->toString(),
            'business_id' => null, // assigned later
            'name' => fake()->randomElement([
                'Haircut',
                'Consultation',
                'Massage',
                'Therapy Session',
            ]),
            'description' => fake()->sentence(),
            'duration' => fake()->randomElement([30, 45, 60, 90]),
            'buffer_time' => fake()->randomElement([0, 5, 10]),
            'price' => fake()->numberBetween(1000, 10000), // cents
            'visible' => true,
        ];
    }
}
