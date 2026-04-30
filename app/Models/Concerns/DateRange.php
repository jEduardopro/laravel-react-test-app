<?php

namespace App\Models\Concerns;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

trait DateRange
{
    /**
     * Scope to filter records within a date range.
     *
     * @param Builder $query The query builder instance.
     * @param string|null $start_date Format: Y-m-d
     * @param string|null $end_date Format: Y-m-d
     * @param string $column The date column to filter on (default: created_at)
     */
    public function scopeDateRange(Builder $query, ?string $start_date, ?string $end_date, string $column = 'created_at'): void
    {
        if (!$start_date || !$end_date) {
            return;
        }

        $start = Carbon::parse($start_date)->startOfDay();
        $end = Carbon::parse($end_date)->endOfDay();

        $query->whereBetween($column, [$start, $end]);
    }
}
