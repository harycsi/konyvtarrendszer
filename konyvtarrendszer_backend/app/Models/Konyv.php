<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konyv extends Model
{
    use HasFactory;

    protected $table = 'konyvek';

    protected $fillable = [
        'cim',
        'szerzo',
        'kiadas_eve',
        'oldalak',
        'db_szam',
        'kep',
        'osszdb_szam',
    ];
}
