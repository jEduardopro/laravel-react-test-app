<?php

namespace App\Models\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface Searchable
{
    /**
     * Apply a search pattern to the query.
     */
    public function scopeSearchByPattern(Builder $query, ?string $pattern);

    /**
     * Must return an array of searchable attributes.
     *
     * @return array
     */
    public function getSearchAttributes(): array;
}
