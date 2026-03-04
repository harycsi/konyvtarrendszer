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
        $konyv = Konyv::find($request->konyv_id);
        
        if(!$konyv || $konyv->db_szam <= 0){
            return response()->json([
                'hiba' => 'Sajnos ez a könyv jelenleg elfogyott.'
            ], 400);
        }

        $kolcsonzes = new Kolcsonzes();
        $kolcsonzes->fill($request->all());
        $kolcsonzes->save();
        $kolcsonzes->refresh();
 
        $konyv->refresh();
        
        return response()->json(['kolcsonzes' => $kolcsonzes, 'konyv' => $konyv], 201);
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
    public function destroy(Request $request, Kolcsonzes $user_id)
    {
        $kolcsonzes = Kolcsonzes::find($user_id);
        $kolcsonzes->delete();

        $konyv = Konyv::find($request->konyv_id);    
        $konyv->refresh();

        return response()->json(null,200);
    }
}
