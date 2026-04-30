<?php

namespace App\Core\UseCases;

use App\Core\Dtos\PaginationParamsDto;
use App\Models\Business;

class PaginatedResource
{
    public function __construct(
        protected Business $business,
        protected PaginationParamsDto $paginationParams
    ) {}
}
