<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kolcsonzes extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = 'kolcsonzes';

    protected $fillable = [
        'user_id',
        'konyv_id',
        'kolcs_datum',
        'hatarido',
        'email',
        'dolg_id',
        'uzenet',
    ];

    public function konyv()
    {
        return $this->belongsTo(Konyv::class, 'konyv_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function dolgozo()
    {
        return $this->belongsTo(User::class, 'dolg_id');
    }

    public function getKesesNapokSzama()
    {
        return now()->diffInDays($this->hatarido, false) * -1;
    }
}
