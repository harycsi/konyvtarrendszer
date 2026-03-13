<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adatmodositas extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',   
        'uj_nev',
        'uj_email',
        'uj_cim',
        'uj_tel',
        'statusz'    
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}