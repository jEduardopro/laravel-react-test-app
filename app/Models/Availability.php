<?php

namespace App\Models;

use App\Models\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Availability extends Model
{
    /** @use HasFactory<\Database\Factories\AvailabilityFactory> */
    use HasFactory;
    use HasUuid, SoftDeletes;

    public static function resolveDayName(int $day): string
    {
        return match ($day) {
            0 => 'sunday',
            1 => 'monday',
            2 => 'tuesday',
            3 => 'wednesday',
            4 => 'thursday',
            5 => 'friday',
            6 => 'saturday',
            default => 'unknown',
        };
    }
}
