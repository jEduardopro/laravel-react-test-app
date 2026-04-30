<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

trait SearchByPattern
{
    public function scopeSearchByPattern(Builder $query, ?string $pattern): Builder
    {
        if (!$pattern) {
            return $query;
        }

        $columns = collect($this->getSearchAttributes());

        if ($columns->isEmpty()) {
            $columns = collect($this->getAllColumnsFromTable());
        }

        $words = Str::of($pattern)->explode(' ')->filter();

        $query->where(function (Builder $outer) use ($columns, $pattern, $words) {
            $outer->where(function (Builder $q) use ($columns, $pattern) {
                foreach ($columns as $column) {
                    if (Str::contains($column, '.')) {
                        [$relation, $field] = explode('.', $column, 2);
                        $q->orWhereHas($relation, function (Builder $relQuery) use ($field, $pattern) {
                            $relQuery->where($field, 'LIKE', "{$pattern}%");
                        });
                    } else {
                        $q->orWhere($column, 'LIKE', "{$pattern}%");
                    }
                }
            });

            if ($words->isNotEmpty()) {
                $outer->orWhere(function (Builder $q) use ($columns, $words) {
                    foreach ($words as $word) {
                        foreach ($columns as $column) {
                            if (Str::contains($column, '.')) {
                                [$relation, $field] = explode('.', $column, 2);
                                $q->orWhereHas($relation, function (Builder $relQuery) use ($field, $word) {
                                    $relQuery->where($field, 'LIKE', "{$word}%");
                                });
                            } else {
                                $q->orWhere($column, 'LIKE', "{$word}%");
                            }
                        }
                    }
                });
            }
        });

        return $query;
    }

    private function getAllColumnsFromTable()
    {
        return Schema::getColumnListing($this->getTable());
    }
}
