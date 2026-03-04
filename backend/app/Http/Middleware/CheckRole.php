<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next, ...$roles)
    {
   
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Bejelentkezés szükséges.'], 401);
        }

        if (in_array((int)$user->role, array_map('intval', $roles))) {
        return $next($request);
        }

        return response()->json([
            'message' => 'Nincs jogosultságod a művelethez.',
            'your_role' => $user->role,
            'required_roles' => $roles
        ], 403);
        
    }
}
