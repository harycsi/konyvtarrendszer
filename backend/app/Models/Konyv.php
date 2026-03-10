<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konyv extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'konyv';

    protected $fillable = [
        'cim',
        'szerzo',
        'kiadas_eve',
        'oldalak',
        'db_szam',
        'kep',
        'osszdb_szam',
        'leiras'
    ];
}
