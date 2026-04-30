<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBusinessIsSelected
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        if ($request->is('select-business') || $request->is('logout')) {
            return $next($request);
        }

        if (!$user->current_business_id) {
            return redirect('/select-business');
        }

        return $next($request);
    }
}
