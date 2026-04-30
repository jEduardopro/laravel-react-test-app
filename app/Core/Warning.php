<?php

namespace App\Core;

final class Warning
{
    public function __construct(
        public $message,
        public $code = 0
    ) {}
}
