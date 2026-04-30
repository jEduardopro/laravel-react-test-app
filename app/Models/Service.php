<?php

namespace App\Models;

use App\Models\Concerns\DateRange;
use App\Models\Concerns\HasUuid;
use App\Models\Concerns\SearchByPattern;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name',
    'description',
    'duration',
    'buffer_time',
    'price',
    'notes',
    'visible',
    'position',
])]
class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;
    use HasUuid, SoftDeletes, DateRange, SearchByPattern;

    protected function casts()
    {
        return [
            'price' => 'decimal:2',
        ];
    }
}
