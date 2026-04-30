<?php

namespace App\Core;

use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Throwable;

/**
 * @property mixed $data
 * @property Throwable|null $error
 * @property Warning[] $warnings
 */
final class UseCaseResponse
{
    public function __construct(
        public $data = null,
        public ?Throwable $error = null,
        public $warnings = []
    ) { }

    public static function success($data = null)
    {
        return new self($data);
    }

    public function addWarning(string $message, int $code = 0): self
    {
        $this->warnings[] = new Warning($message, $code);
        return $this;
    }

    public function getWarnings(): array
    {
        /** @var Warning[] $warnings */
        return collect($this->warnings)->map(fn (Warning $w) => [
            "message" => $w->message,
            "code" => $w->code
        ])->toArray();
    }

    public static function addBadRequestError(string $error)
    {
        $badRequestError = new BadRequestException($error, 400);
        return new self(null, $badRequestError);
    }

    public static function addResourceNotFoundError(string $error)
    {
        $resourceNotFoundError = new ResourceNotFoundException($error, 404);
        return new self(null, $resourceNotFoundError);
    }

    public static function addAccessDeniedError(string $error)
    {
        $accessDeniedError = new AccessDeniedHttpException($error, null, 403);
        return new self(null, $accessDeniedError);
    }

    public function isSuccess(): bool {
        return is_null($this->error);
    }

    public function error(): bool {
        return !is_null($this->error);
    }

}
