<?php

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users', // Ez marad a kölcsönzőknek
    ],
    'dolgozo' => [
        'driver' => 'session',
        'provider' => 'dolgozos_provider', // Új őr a személyzetnek
    ],
],

'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\User::class,
    ],
    'dolgozos_provider' => [
        'driver' => 'eloquent',
        'model' => App\Models\Dolgozo::class, // Itt a te egyedi modelled
    ],
],

    'password_timeout' => 10800,

];
