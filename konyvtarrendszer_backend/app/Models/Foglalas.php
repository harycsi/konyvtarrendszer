<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foglalas extends Model
{
    use HasFactory;

    protected $table = 'foglalas';

    protected $fillable = [
        'user_id',
        'konyv_id',
        'fogl_datum',
    ];

    public $timestamps = false;
}
