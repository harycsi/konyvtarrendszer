<?php

namespace App\Http\Controllers;

use App\Models\Kolcsonzes;
use App\Models\Konyv;
use Illuminate\Http\Request;

class KolcsonzesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Kolcsonzes::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreKolcsonzesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 1. Validáció: Ellenőrizzük, hogy megadták-e az olvasót és a könyvet
        $request->validate([
            'user_id'  => 'required|exists:users,id', // Az olvasó (vásárló)
            'konyv_id' => 'required|exists:konyv,id',  // A kikölcsönzendő könyv
        ]);

        $konyv = Konyv::find($request->konyv_id);

        // 2. Készlet ellenőrzése (ha a trigger csak a levonást végzi, a hibaüzenet még kellhet)
        if (!$konyv || $konyv->db_szam <= 0) {
            return response()->json(['hiba' => 'A könyv jelenleg nem elérhető.'], 400);
        }

        // 3. Mentés
        $kolcsonzes = new Kolcsonzes();
        $kolcsonzes->user_id = $request->user_id;    // Aki kiveszi a könyvet
        $kolcsonzes->konyv_id = $request->konyv_id;
        $kolcsonzes->kolcs_datum = now();            // Ma
        $kolcsonzes->hatarido = now()->addDays(14);   // + 14 nap
        $kolcsonzes->dolg_id = $request->user()->id; // A bejelentkezett dolgozó (Auth)
        $kolcsonzes->save();
        // Itt fut le a trigger az adatbázisban, ami csökkenti a db_szam-ot!

        return response()->json([
            'uzenet' => 'Sikeres kölcsönzés rögzítve!',
            'hatarido' => $kolcsonzes->hatarido
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kolcsonzes  $kolcsonzes
     * @return \Illuminate\Http\Response
     */
    public function show(Kolcsonzes $user_id)
    {
        return Kolcsonzes::find($user_id);
    }

    public function kolcson(Request $request)
    {
        $userId = $request->user()->id;
        $adatok = \App\Models\Kolcsonzes::where('user_id', $userId)
            ->with('konyv')
            ->get();
        return response()->json($adatok);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateKolcsonzesRequest  $request
     * @param  \App\Models\Kolcsonzes  $kolcsonzes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kolcsonzes $kolcsonzes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kolcsonzes  $kolcsonzes
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        // Megkeressük a konkrét kölcsönzési rekordot
        $kolcsonzes = Kolcsonzes::findOrFail($id);

        // A törlés elindítja az AFTER DELETE triggert, ami növeli a készletet
        $kolcsonzes->delete();

        return response()->json([
            'uzenet' => 'A könyv visszavétele sikeres, a készlet frissült!'
        ], 200);
    }

    public function lejartKolcsonzesek()
    {
    //Lekérjük azokat, ahol a határidő kisebb, mint a mai nap és még nincsenek visszahozva
        $kesesek = Kolcsonzes::with(['user', 'konyv']) //Beemeljük az olvasó és könyv adatait is
            ->where('hatarido', '<', now())
            ->get();

        if ($kesesek->isEmpty()) {
            return response()->json(['uzenet' => 'Szuper! Nincs késésben lévő kölcsönzés.'], 200);
        }

        return response()->json([
            'darabszam' => $kesesek->count(),
            'lista' => $kesesek
        ], 200);
    }
}
