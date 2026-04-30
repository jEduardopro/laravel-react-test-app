<?php

use App\Http\Controllers\API\Private\Auth\SelectBusinessController;
use App\Http\Controllers\API\Private\Services\ServicesController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('select-business', [SelectBusinessController::class, 'show'])->name('select-business');
    Route::put('select-business', [SelectBusinessController::class, 'update'])->name('user.selected-business');
});

Route::middleware(['auth', 'verified', 'business.selected'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('demo-page', 'demo')->name('demo-page');

    Route::prefix('services')->group(function () {
        Route::get('/', [ServicesController::class, 'index'])->name('services.index');
        // Route::get('/create', [CouponsController::class, 'create'])->name('coupons.create')->middleware('permission:create-coupon');
        Route::post('/', [ServicesController::class, 'store'])->name('services.store');
        // Route::get('/{uuid}', [CouponsController::class, 'show'])->name('coupons.show')->middleware('permission:view-coupon');
        // Route::get('/{uuid}/edit', [CouponsController::class, 'edit'])->name('coupons.edit')->middleware('permission:edit-coupon');
        // Route::put('{uuid}', [CouponsController::class, 'update'])->name('coupons.update')->middleware('permission:edit-coupon');
    });
});

require __DIR__.'/settings.php';
