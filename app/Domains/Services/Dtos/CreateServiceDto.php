<?php

namespace App\Domains\Services\Dtos;

use App\Http\Requests\Services\CreateServiceFormRequest;

class CreateServiceDto
{
    public function __construct(
        private string $name,
        private ?string $description = null,
        private int $duration,
        private int $bufferTime,
        private float $price,
        private ?string $notes = null,
        private bool $visible = true,
        private ?int $position = 0,
    ) {}

    public static function fromRequest(CreateServiceFormRequest $request): self
    {
        return new self(
            name: $request->validated('name'),
            description: $request->validated('description'),
            duration: (int) $request->validated('duration'),
            bufferTime: (int) ($request->validated('buffer_time') ?? 0),
            price: (float) $request->validated('price'),
            notes: $request->validated('notes'),
            visible: (bool) $request->validated('visible'),
            position: $request->validated('position') !== null
                ? (int) $request->validated('position')
                : 0,
        );
    }

    public function getName(): string { return $this->name; }
    public function getDescription(): ?string { return $this->description; }
    public function getDuration(): int { return $this->duration; }
    public function getBufferTime(): int { return $this->bufferTime; }
    public function getPrice(): int { return $this->price; }
    public function getNotes(): ?string { return $this->notes; }
    public function getVisible(): bool { return $this->visible; }
    public function getPosition(): ?int { return $this->position; }

}
