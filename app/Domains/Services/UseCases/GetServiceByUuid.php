<?php

namespace App\Domains\Services\UseCases;

use App\Core\UseCaseResponse;
use App\Models\Business;

class GetServiceByUuid
{
    public function __construct(
        protected Business $business
    ) {}

    public function perform(string $uuid): UseCaseResponse
    {
        $service = $this->business->services()->where('uuid', $uuid)->with(['bookings'])->first();

        if (!$service) {
            return UseCaseResponse::addResourceNotFoundError('Service not found');
        }

        return UseCaseResponse::success($service);
    }
}
