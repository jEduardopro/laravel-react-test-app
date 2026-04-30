<?php

namespace App\Core\UseCases;

use App\Core\Dtos\RegisterActivityLogDto;
use App\Core\ServiceResponse;
use App\Models\Organization;
use Illuminate\Support\Arr;
use Spatie\Activitylog\Models\Activity;
use Throwable;

class RegisterActivityLog
{
    public function __construct(
        protected Organization $organization,
        protected RegisterActivityLogDto $logDto
    ) {}

    public function perform()
    {
        $causedBy = $this->logDto->getCausedBy();
        $userOrganizationId = $causedBy?->organization_id;

        if ($userOrganizationId && $userOrganizationId != $this->organization->id) {
            return ServiceResponse::addAccessDeniedError('You are not allowed to log activities for this organization.');
        }

        try {
            activity()
                ->causedBy($causedBy)
                ->performedOn($this->logDto->getPerformedOn())
                ->withProperties([
                    'old' => Arr::get($this->logDto->getProperties(), 'changes.old', []),
                    'new' => Arr::get($this->logDto->getProperties(), 'changes.new', []),
                    'extra' => Arr::except( $this->logDto->getProperties(), ['changes']) // Additional properties
                ])
                ->tap(function (Activity $activity) use ($causedBy) {
                    $activity->organization_id = $this->organization->id;
                    if (!$causedBy) {
                        $activity->causer_id = null;
                        $activity->causer_type = 'System';
                    }
                })
                ->useLog($this->logDto->getLogName())
                ->event($this->logDto->getEvent())
                ->log($this->logDto->getLogDescription());

            return ServiceResponse::success(true);

        } catch (Throwable $e) {
            return ServiceResponse::addBadRequestError($e->getMessage());
        }

    }
}
