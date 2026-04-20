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
        $kolcsonzesek = Kolcsonzes::with(['user', 'konyv'])->get();
        return response()->json($kolcsonzesek);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreKolcsonzesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id'  => 'required|exists:users,id',
            'konyv_id' => 'required|exists:konyv,id',
        ]);

        $kikolcsonozte = Kolcsonzes::where('user_id', $request->user_id)
            ->where('konyv_id', $request->konyv_id)
            ->exists();

        if ($kikolcsonozte) {
            return response()->json(['hiba' => 'Ezt a könyvet már kikölcsönözte ez a kölcsönző!'], 400);
        }

        $konyv = Konyv::find($request->konyv_id);

        if (!$konyv || $konyv->db_szam == 0) {
            return response()->json(['hiba' => 'A könyv jelenleg nem elérhető.'], 400);
        }

        $kolcsonzes = new Kolcsonzes();
        $kolcsonzes->user_id = $request->user_id;
        $kolcsonzes->konyv_id = $request->konyv_id;
        $kolcsonzes->kolcs_datum = now();
        $kolcsonzes->hatarido = now()->addDays(14);
        $kolcsonzes->dolg_id = $request->user()->id;
        $kolcsonzes->save();

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
        $adatok = Kolcsonzes::where('user_id', $userId)
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
    public function update(Request $request, $id)
    {
        $kolcsonzes = Kolcsonzes::findOrFail($id);

        $validated = $request->validate([
            'uzenet' => 'nullable|string|max:1000',
            'email'  => 'nullable|integer|in:0,1',
        ]);

        if ($request->has('uzenet')) {
            $kolcsonzes->uzenet = $validated['uzenet'];
        }

        if ($request->has('email')) {
            $kolcsonzes->email = $validated['email'];
        }

        $kolcsonzes->save();

        return response()->json([
            'message' => 'Adatok sikeresen frissítve!',
            'kolcsonzes' => $kolcsonzes
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kolcsonzes  $kolcsonzes
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $kolcsonzes = Kolcsonzes::findOrFail($id);

        $kolcsonzes->delete();

        return response()->json([
            'uzenet' => 'A könyv visszavétele sikeres, a készlet frissült!'
        ], 200);
    }
}
