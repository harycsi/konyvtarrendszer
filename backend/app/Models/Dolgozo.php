<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Dolgozo extends Authenticatable {

    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;

    protected $fillable = [
        'nev',
        'user_nev',
        'jelszo',
        'telefonszam',
        'role',
    ];

    public function isAdmin(){
        return $this->role === 0;
    }

    public function isKonyvtaros(){
        return $this->role === 1;
    }
    
    public function isRaktaros(){
        return $this->role === 2;
    }

    public function getAuthPassword()
    {
        return $this->jelszo;
    }
}
