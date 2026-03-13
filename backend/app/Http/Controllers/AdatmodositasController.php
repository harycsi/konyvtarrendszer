<?php

namespace App\Http\Controllers;

use App\Models\Adatmodositas;
use App\Models\User;
use Illuminate\Http\Request;

class AdatmodositasController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'uj_nev' => 'nullable|string|max:255',
            'uj_email' => 'nullable|email|unique:users,email',
            'uj_cim' => 'nullable|string',
            'uj_tel' => 'nullable|string',
        ]);

        $modositas = new Adatmodositas();
        $modositas->user_id = $request->user()->id; // A bejelentkezett user ID-ja
        $modositas->fill($request->only(['uj_nev', 'uj_email', 'uj_cim', 'uj_tel']));
        $modositas->statusz = 'fuggo';
        $modositas->save();

        return response()->json(['message' => 'Módosítási kérelem elküldve az adminnak!'], 201);
    }

    public function save($id)
    {
        $keres = Adatmodositas::findOrFail($id);

        if ($keres->statusz !== 'fuggo') {
            return response()->json(['message' => 'Ez a kérés már fel lett dolgozva.'], 400);
        }

        // Megkeressük a tényleges felhasználót
        $user = User::findOrFail($keres->user_id);

        // Csak azokat a mezőket írjuk át, amikre érkezett kérés
        if ($keres->uj_nev) $user->nev = $keres->uj_nev;
        if ($keres->uj_email) $user->email_cim = $keres->uj_email;
        if ($keres->uj_cim) $user->lakcim = $keres->uj_cim;
        if ($keres->uj_tel) $user->telefonszam = $keres->uj_tel;

        $user->save();

        // Frissítjük a kérés állapotát
        $keres->statusz = 'elfogadva';
        $keres->save();

        return response()->json(['message' => 'Adatok sikeresen frissítve a felhasználónál!']);
    }

    public function reject($id)
    {
        $keres = Adatmodositas::findOrFail($id);
        $keres->statusz = 'elutasitva';
        $keres->save();

        return response()->json(['message' => 'A kérést elutasítottad.']);
    }
}
