<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKonyvRequest;
use App\Http\Requests\UpdateKonyvRequest;
use App\Models\Konyv;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class KonyvController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Konyv::all();
    }

    public function keres(Request $request) 
    {
        $searchTerm = $request->query('query');
        $sortBy = $request->query('sort', 'cim');

        $eredmenyek = Konyv::query()
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query->where('cim', 'LIKE', "%{$searchTerm}%")
                      ->orWhere('szerzo', 'LIKE', "%{$searchTerm}%");
            })
            ->orderBy($sortBy, 'asc')
            ->limit(50)
            ->get();

        return response()->json($eredmenyek);
    }

    public function show(string $id)
    {
        return Konyv::find($id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreKonyvRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreKonyvRequest $request)
    {
        $request->validate([
            'cim' => 'required|string|max:255',
            'szerzo' => 'required|string|max:255',

            'cim' => Rule::unique('konyvek')->where(function ($query) use ($request) {
            return $query->where('szerzo', $request->szerzo);
            }),
        ]);

        $konyv = new Konyv();
        $konyv->fill($request->all());
        $konyv->save();
        return response()->json($konyv, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Konyv  $konyv
     * @return \Illuminate\Http\Response
     */
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateKonyvRequest  $request
     * @param  \App\Models\Konyv  $konyv
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateKonyvRequest $request, string $id)
    {
        $konyv = Konyv::find($id);
        $konyv->fill($request->all());
        $konyv->save();
        return response()->json($konyv, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Konyv  $konyv
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $konyv = Konyv::find($id)->delete();
        return response()->json($konyv, 200);
    }
}
