<?php

namespace App\Http\Controllers;

use App\Models\Foglalas;
use App\Models\Konyv;
use Illuminate\Http\Request;

class FoglalasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $foglalasok = Foglalas::with(['user', 'konyv'])->get();
        return response()->json($foglalasok);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFoglalasRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['hiba' => 'Bejelentkezés szükséges!'], 401);
        }

        $konyv = Konyv::find($request->konyv_id);

        if (!$konyv || $konyv->db_szam <= 0) {
            return response()->json(['hiba' => 'Nincs készleten'], 400);
        }

        $lefoglalta = Foglalas::where('user_id', $request->user()->id)
            ->where('konyv_id', $request->konyv_id)
            ->exists();

        if ($lefoglalta) {
            return response()->json(['hiba' => 'Ezt a könyvet már lefoglaltad!'], 409);
        }

        $foglalas = new Foglalas();
        $foglalas->konyv_id = $request->konyv_id;
        $foglalas->user_id = $request->user()->id;
        $foglalas->save();

        return response()->json(['uzenet' => 'Sikeres foglalás!'], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Foglalas  $foglalas
     * @return \Illuminate\Http\Response
     */
    public function show(Foglalas $user_id)
    {
        return Foglalas::find($user_id);
    }

    public function foglal(Request $request)
    {
        $userId = $request->user()->id;
        $adatok = Foglalas::where('user_id', $userId)
            ->with('konyv')
            ->get();
        return response()->json($adatok);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFoglalasRequest  $request
     * @param  \App\Models\Foglalas  $foglalas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Foglalas  $foglalas
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $foglalas = Foglalas::findOrFail($id);
        $foglalas->delete();
        return response()->json(['message' => 'Foglalás törölve, készlet visszatöltve.'], 200);
    }

    public function torol(Request $request, $id)
    {
        $foglalas = Foglalas::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($foglalas) {
            $foglalas->delete();
            return response()->json(['message' => 'Saját foglalás sikeresen törölve!']);
        }

        return response()->json(['message' => 'Foglalás nem található vagy nincsen jogosultsága'], 404);
    }
}
