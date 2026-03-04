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
        return Foglalas::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFoglalasRequest  $request
     * @return \Illuminate\Http\Response
     */

    
    public function store(Request $request)
    {
        $konyv = Konyv::find($request->konyv_id);
        
        if(!$konyv || $konyv->db_szam <= 0){
            return response()->json([
                'hiba' => 'Sajnos ez a könyv jelenleg elfogyott.'
            ], 400);
        }

        $foglalas = new Foglalas();
        $foglalas->fill($request->all());
        $foglalas->save();
        $foglalas->refresh();

        $konyv->refresh();
        
        return response()->json(['uzenet' => 'Sikeres foglalás!', 'foglalas' => $foglalas, 'konyv' => $konyv], 201);
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
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFoglalasRequest  $request
     * @param  \App\Models\Foglalas  $foglalas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Foglalas $user_id)
    {
        $foglalas = Foglalas::find($user_id);
        $foglalas->fill($request->all());
        $foglalas->save();
        $foglalas->refresh();

        $konyv = Konyv::find($request->konyv_id);
        $konyv->refresh();

        return response()->json($user_id, 201);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Foglalas  $foglalas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Foglalas $user_id)
    {
        $foglalas = Foglalas::find($user_id);
        $foglalas->delete();

        $konyv = Konyv::find($request->konyv_id);    
        $konyv->refresh();

        return response()->json(null,200);
    }
}
