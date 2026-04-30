<?php

namespace App\Models;

use App\Models\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Business extends Model
{
    /** @use HasFactory<\Database\Factories\BusinessFactory> */
    use HasFactory;
    use HasUuid, SoftDeletes;

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps();
    }

    public function services() : HasMany
    {
        return $this->hasMany(Service::class);
    }
}
