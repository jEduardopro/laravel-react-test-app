<?php

namespace App\Core\Dtos;

use App\Models\User;

final class RegisterActivityLogDto
{
    public function __construct(
        private $performedOn,
        private string $event,
        private User|null $causedBy = null,
        private array $properties = [],
        private string|null $logName = null,
        private string|null $logDescription = null
    ) {}

    public function getCausedBy(): User|null { return $this->causedBy; }
    public function getPerformedOn() { return $this->performedOn; }
    public function getEvent(): string { return $this->event; }
    public function getProperties(): array { return $this->properties; }
    public function getLogName(): string|null { return $this->logName; }
    public function getLogDescription(): string|null { return $this->logDescription; }
}
