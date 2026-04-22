<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

Route::post('/test-job', [JobController::class, 'dispatch']);
