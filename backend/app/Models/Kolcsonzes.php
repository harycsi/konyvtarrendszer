<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kolcsonzes extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $table = 'kolcsonzes'; 

    protected $fillable = [
        'user_id',
        'konyv_id',
        'kolcs_datum',
        'vissza_datum',
        'email',
        'dolg_id',
        'uzenet',
    ];

    public function konyv()
    {
        return $this->belongsTo(Konyv::class, 'konyv_id');
    }
}
