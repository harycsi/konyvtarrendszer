<?php

use App\Models\Konyv;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKonyvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('konyv', function (Blueprint $table) {
            $table->id();
            $table->string('cim');
            $table->string('szerzo');
            $table->unique(['cim', 'szerzo']);
            $table->year('kiadas_eve');
            $table->integer('oldalak');
            $table->integer('db_szam');
            $table->string('kep');
            $table->integer('osszdb_szam');
            $table->timestamps();
        });

        Konyv::create([
            "cim" => "Kobalt - A pekingi játszma",
            "szerzo" => "Frei Tamás",
            "kiadas_eve" => 2025,
            "oldalak" => 606,
            "db_szam" => 10,
            "kep" => "kepek/kobalt.jpg",
            "osszdb_szam" => 10,
        ]);

        Konyv::create([
            "cim" => "Sátántangó",
            "szerzo" => "Krasznahorkai László",
            "kiadas_eve" => 2025,
            "oldalak" => 322,
            "db_szam" => 12,
            "kep" => "kepek/satantango.jpg",
            "osszdb_szam" => 12,
        ]);

        Konyv::create([
            "cim" => "Szerintem",
            "szerzo" => "Náray Tamás",
            "kiadas_eve" => 2025,
            "oldalak" => 425,
            "db_szam" => 9,
            "kep" => "kepek/szerintem.jpg",
            "osszdb_szam" => 9,
        ]);

        Konyv::create([
            "cim" => "Stonehenge, Az idő katedrálisa",
            "szerzo" => "Ken Folett",
            "kiadas_eve" => 2025,
            "oldalak" => 632,
            "db_szam" => 11,
            "kep" => "kepek/stonehenge.jpg",
            "osszdb_szam" => 11,
        ]);

        Konyv::create([
            "cim" => "Az ég minden kékje",
            "szerzo" => "Mélissa Da Costa",
            "kiadas_eve" => 2025,
            "oldalak" => 654,
            "db_szam" => 11,
            "kep" => "kepek/egmindenkekje.jpg",
            "osszdb_szam" => 11,
        ]);

        Konyv::create([
            "cim" => "Dimenzió kapu",
            "szerzo" => "Zecharia Sitchin",
            "kiadas_eve" => 2004,
            "oldalak" => 350,
            "db_szam" => 9,
            "kep" => "kepek/dimenziokapu.jpg",
            "osszdb_szam" => 9,
        ]);

        Konyv::create([
            "cim" => "Fehér mágia",
            "szerzo" => "Matthias Mala",
            "kiadas_eve" => 1998,
            "oldalak" => 134,
            "db_szam" => 8,
            "kep" => "kepek/fehermagia.jpg",
            "osszdb_szam" => 8,
        ]);

        Konyv::create([
            "cim" => "Önmagad forrása",
            "szerzo" => "Lisa Lister",
            "kiadas_eve" => 2023,
            "oldalak" => 311,
            "db_szam" => 12,
            "kep" => "kepek/onmagadforrasa.jpg",
            "osszdb_szam" => 12,
        ]);

        Konyv::create([
            "cim" => "A kozmosz üzenete",
            "szerzo" => "Erich Von Däniken",
            "kiadas_eve" => 2025,
            "oldalak" => 192,
            "db_szam" => 5,
            "kep" => "kepek/kozmoszuzenete.jpg",
            "osszdb_szam" => 5,
        ]);

        Konyv::create([
            "cim" => "A háború művészete",
            "szerzo" => "Szun-Ce",
            "kiadas_eve" => 2024,
            "oldalak" => 192,
            "db_szam" => 9,
            "kep" => "kepek/haborumuveszete.jpg",
            "osszdb_szam" => 9,
        ]);

        Konyv::create([
            "cim" => "Csak a baj",
            "szerzo" => "Rachel Gibson",
            "kiadas_eve" => 2017,
            "oldalak" => 318,
            "db_szam" => 8,
            "kep" => "kepek/csakabaj.jpg",
            "osszdb_szam" => 8,
        ]);

        Konyv::create([
            "cim" => "Kapj el, ha tudsz",
            "szerzo" => "Frank W. Abagnale",
            "kiadas_eve" => 2003,
            "oldalak" => 266,
            "db_szam" => 8,
            "kep" => "kepek/kapjel.jpg",
            "osszdb_szam" => 8,
        ]);

        Konyv::create([
            "cim" => "A vak bérgyilkos",
            "szerzo" => "Margaret Atwood",
            "kiadas_eve" => 2003,
            "oldalak" => 564,
            "db_szam" => 10,
            "kep" => "kepek/vakbergyilkos.jpg",
            "osszdb_szam" => 10,
        ]);

        Konyv::create([
            "cim" => "Csokonai, az újrakezdések költője",
            "szerzo" => "Debreczeni Attila",
            "kiadas_eve" => 1993,
            "oldalak" => 272,
            "db_szam" => 12,
            "kep" => "kepek/csokonaiujrakezdes.jpg",
            "osszdb_szam" => 12,
        ]);

        Konyv::create([
            "cim" => "Ez van",
            "szerzo" => "Vida Gusztáv",
            "kiadas_eve" => 2018,
            "oldalak" => 314,
            "db_szam" => 9,
            "kep" => "kepek/ezvan.jpg",
            "osszdb_szam" => 9,
        ]);

        Konyv::create([
            "cim" => "Winnetou kalandjai",
            "szerzo" => "Karl May",
            "kiadas_eve" => 1994,
            "oldalak" => 434,
            "db_szam" => 12,
            "kep" => "kepek/winnetou.jpg",
            "osszdb_szam" => 12,
        ]);

        Konyv::create([
            "cim" => "Válogatott mesék",
            "szerzo" => "Viktor Alekszandrovics Krilov",
            "kiadas_eve" => 1959,
            "oldalak" => 62,
            "db_szam" => 9,
            "kep" => "kepek/valogatottmesek.jpg",
            "osszdb_szam" => 9,
        ]);

        Konyv::create([
            "cim" => "Pápaszemes Manolito",
            "szerzo" => "Elvira Lindo",
            "kiadas_eve" => 2010,
            "oldalak" => 134,
            "db_szam" => 10,
            "kep" => "kepek/papaszemmanolito.jpg",
            "osszdb_szam" => 10,
        ]);

        Konyv::create([
            "cim" => "Betyár becsület",
            "szerzo" => "Cserni András",
            "kiadas_eve" => 2023,
            "oldalak" => 516,
            "db_szam" => 8,
            "kep" => "kepek/betyarbecsulet.jpg",
            "osszdb_szam" => 8,
        ]);

        Konyv::create([
            "cim" => "A szekrény",
            "szerzo" => "Nemes István",
            "kiadas_eve" => 1995,
            "oldalak" => 24,
            "db_szam" => 11,
            "kep" => "kepek/aszekreny.jpg",
            "osszdb_szam" => 11,
        ]);

        Konyv::create([
            "cim" => "Nők könyve",
            "szerzo" => "OSHO",
            "kiadas_eve" => 2016,
            "oldalak" => 269,
            "db_szam" => 10,
            "kep" => "kepek/nokkonyve.jpg",
            "osszdb_szam" => 10,
        ]);

        Konyv::create([
            "cim" => "Tanár úr kérem",
            "szerzo" => "Karinthy Frigyes",
            "kiadas_eve" => 2010,
            "oldalak" => 86,
            "db_szam" => 15,
            "kep" => "kepek/tanarurkerem.jpg",
            "osszdb_szam" => 15,
        ]);

        Konyv::create([
            "cim" => "A kőszívű ember fiai",
            "szerzo" => "Jókai Mór",
            "kiadas_eve" => 2022,
            "oldalak" => 531,
            "db_szam" => 13,
            "kep" => "kepek/koszivuemberfiai.jpg",
            "osszdb_szam" => 13,
        ]);

        Konyv::create([
            "cim" => "A Pál utcai fiúk",
            "szerzo" => "Molnár Ferenc",
            "kiadas_eve" => 2010,
            "oldalak" => 158,
            "db_szam" => 15,
            "kep" => "kepek/palutcaifiuk.jpg",
            "osszdb_szam" => 15,
        ]);

        Konyv::create([
            "cim" => "Az ember tragédiája",
            "szerzo" => "Madách Imre",
            "kiadas_eve" => 2006,
            "oldalak" => 191,
            "db_szam" => 16,
            "kep" => "kepek/azembertragediaja.jpg",
            "osszdb_szam" => 16,
        ]);

        Konyv::create([
            "cim" => "Légy jó mindhalálig",
            "szerzo" => "Móricz Zsigmond",
            "kiadas_eve" => 2008,
            "oldalak" => 317,
            "db_szam" => 15,
            "kep" => "kepek/legyjomindhalalig.jpg",
            "osszdb_szam" => 15,
        ]);

        Konyv::create([
            "cim" => "Tom Sawyer kalandjai",
            "szerzo" => "Mark Twain",
            "kiadas_eve" => 2011,
            "oldalak" => 238,
            "db_szam" => 10,
            "kep" => "kepek/tomsawyer.jpg",
            "osszdb_szam" => 10,
        ]);

        Konyv::create([
            "cim" => "Huckleberry Finn kalandjai",
            "szerzo" => "Mark Twain",
            "kiadas_eve" => 2011,
            "oldalak" => 157,
            "db_szam" => 11,
            "kep" => "kepek/huckleberryfinn.jpg",
            "osszdb_szam" => 11,
        ]);

        Konyv::create([
            "cim" => "Egri csillagok",
            "szerzo" => "Gárdonyi Géza",
            "kiadas_eve" => 2006,
            "oldalak" => 612,
            "db_szam" => 13,
            "kep" => "kepek/egricsillagok.jpg",
            "osszdb_szam" => 13,
        ]);

        Konyv::create([
            "cim" => "Nemo kapitány",
            "szerzo" => "Verne Gyula",
            "kiadas_eve" => 2009,
            "oldalak" => 455,
            "db_szam" => 10,
            "kep" => "kepek/nemokapitany.jpg",
            "osszdb_szam" => 10,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('konyv');
    }
}
