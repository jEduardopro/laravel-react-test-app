<?php

namespace App\Domains\Services\UseCases;

use App\Core\UseCaseResponse;
use App\Models\Business;
use App\Models\User;

class SoftDeleteService
{
    public function __construct(
        protected Business $business,
        protected User|null $authUser = null
    ) {}

    public function perform(string $uuid): UseCaseResponse
    {
        $response = (new GetServiceByUuid($this->business))->perform($uuid);

        if (!$response->isSuccess()) {
            return UseCaseResponse::addBadRequestError($response->error->getMessage());
        }

        $service = $response->data;

        $hasPendingBookings = $service->bookings()
            ->pending()
            ->upcoming()
            ->exists();

        $hasPendingBookings = $service->bookings()
            ->pending()
            ->upcoming()
            ->exists();

        if ($hasPendingBookings) {
            return UseCaseResponse::addBadRequestError(__('api.service_cannot_delete_with_upcoming_bookings'));
        }

        $service->delete();

        return UseCaseResponse::success(true);
    }
}
