<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class TestLogJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public string $message)
    {
        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info('🚀 Job executed: ' . $this->message);
    }
}
