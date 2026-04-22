<?php

namespace App\Http\Controllers;

use App\Jobs\TestLogJob;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function dispatch(Request $request)
    {
        TestLogJob::dispatch($request->message ?? 'Hello from React');

        return response()->json([
            'status' => 'Job dispatched'
        ]);
    }
}
