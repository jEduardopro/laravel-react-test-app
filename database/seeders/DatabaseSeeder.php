<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\Booking;
use App\Models\Business;
use App\Models\Customer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 🔑 Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        $businesses = Business::factory()->count(3)->create();

        // 👉 Attach admin ONLY to first business
        $businesses->first()->users()->attach($admin->id);

        $businesses->each(function ($business) {

            // 👥 Employees
            $employees = User::factory()
                ->count(3)
                ->create();

            foreach ($employees as $employee) {
                $business->users()->attach($employee->id);
            }

            // 👤 Customers
            $customers = Customer::factory()
                ->count(10)
                ->create([
                    'business_id' => $business->id,
                ]);

            // 🛠 Services
            $services = Service::factory()
                ->count(26)
                ->create([
                    'business_id' => $business->id,
                ]);

            // 🏢 Business availability
            foreach (range(1, 5) as $day) {
                Availability::factory()->create([
                    'business_id' => $business->id,
                    'available_id' => $business->id,
                    'available_type' => Business::class,
                    'day_of_week' => $day,
                    'day_name' => Availability::resolveDayName($day),
                ]);
            }

            // 👤 Employee availability
            foreach ($employees as $employee) {
                foreach (range(4, 6) as $day) {
                    Availability::factory()
                        ->employeeShift()
                        ->create([
                            'business_id' => $business->id,
                            'available_id' => $employee->id,
                            'available_type' => User::class,
                            'day_of_week' => $day,
                            'day_name' => Availability::resolveDayName($day),
                        ]);
                }
            }

            // 📅 Bookings
            foreach ($services as $service) {
                foreach ($employees as $employee) {
                    for ($i = 0; $i < 3; $i++) {
                        Booking::factory()->create([
                            'business_id' => $business->id,
                            'service_id' => $service->id,
                            'employee_id' => $employee->id,
                            'customer_id' => $customers->random()->id,
                        ]);
                    }
                }
            }
        });
    }
}
