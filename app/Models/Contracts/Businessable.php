<?php

namespace App\Models\Contracts;


interface Businessable
{
    /**
     * Get the business that owns the Model
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function business();
}
