<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kolcsonzok', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('user_nev')->unique();
            $table->string('jelszo');
            $table->string('email_cim');
            $table->string('lakcim');
            $table->string('telefonszam');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        User::create([
            "nev" => "Horváth János",
            "user_nev" => "jani458",
            "jelszo" => "goliat8",
            "email_cim" => "jani458@gmail.com",
            "lakcim" => "2016.Leányfalu.Szarvas utca 3.",
            "telefonszam" => "06205987464",
        ]);

        User::create([
            "nev" => "Nagy Ágnes",
            "user_nev" => "agika74",
            "jelszo" => "mumus74",
            "email_cim" => "agika74@freemail.hu",
            "lakcim" => "2200.Monor.Radnóti Miklós utca 6.",
            "telefonszam" => "06705841258",
        ]);

        User::create([
            "nev" => "Török Krisztián",
            "user_nev" => "krissz5",
            "jelszo" => "torok5",
            "email_cim" => "krissz5@citromail.hu",
            "lakcim" => "2120.Dunakeszi.Puskás Ferenc utca 11.",
            "telefonszam" => "06304526587",
        ]);

        User::create([
            "nev" => "Papp Krisztián",
            "user_nev" => "pappk",
            "jelszo" => "pk1985",
            "email_cim" => "pappk@t-online.hu",
            "lakcim" => "2112.Veresegyház.Pöltenberg Ernő utca 83.",
            "telefonszam" => "06206859874",
        ]);

        User::create([
            "nev" => "Fekete Tamás",
            "user_nev" => "fekete23",
            "jelszo" => "fekatomi",
            "email_cim" => "fekete23@freemail.hu",
            "lakcim" => "2220.Vecsés.Blaha Lujza utca 59.",
            "telefonszam" => "06705842569",
        ]);

        User::create([
            "nev" => "Kovács János",
            "user_nev" => "kovijani",
            "jelszo" => "kovacs132",
            "email_cim" => "kovijani@gmail.com",
            "lakcim" => "2013.Pomáz.Pöltenberg Ernő utca 78.",
            "telefonszam" => "06206549874",
        ]);

        User::create([
            "nev" => "Tóth Anna",
            "user_nev" => "ancsika",
            "jelszo" => "totha10",
            "email_cim" => "ancsika@gmail.com",
            "lakcim" => "1111.Budapest.Budafoki út 32.",
            "telefonszam" => "06706584124",
        ]);

        User::create([
            "nev" => "Antal Edit",
            "user_nev" => "aeditke",
            "jelszo" => "antal58",
            "email_cim" => "editke2@freemail.hu",
            "lakcim" => "2000.Szentendre.Kassák Lajos utca 62.",
            "telefonszam" => "06706589521",
        ]);

        User::create([
            "nev" => "Török Judit",
            "user_nev" => "torokj",
            "jelszo" => "jucus745",
            "email_cim" => "torokj@freemail.hu",
            "lakcim" => "2112.Veresegyház.Radnóti Miklós utca 6.",
            "telefonszam" => "06305874125",
        ]);

        User::create([
            "nev" => "Deák János",
            "user_nev" => "deakjani",
            "jelszo" => "janoska6",
            "email_cim" => "deakjani@t-online.hu",
            "lakcim" => "2119.Pécel.Jedlik Ányos utca 58.",
            "telefonszam" => "06305841987",
        ]);

        User::create([
            "nev" => "Nagy Ágnes",
            "user_nev" => "agi1970",
            "jelszo" => "kugli456",
            "email_cim" => "agi1970@gmail.com",
            "lakcim" => "2200.Monor.Radnóti Miklós utca 6.",
            "telefonszam" => "06206587451",
        ]);

        User::create([
            "nev" => "Bíró Tibor",
            "user_nev" => "btibike",
            "jelszo" => "erditibi8",
            "email_cim" => "btibike@gmail.com",
            "lakcim" => "2030.Érd.Kandó Kálmán utca 88.",
            "telefonszam" => "06205874987",
        ]);

        User::create([
            "nev" => "Hegedűs Viktória",
            "user_nev" => "ahegedus",
            "jelszo" => "viki95",
            "email_cim" => "ahegedus@freemail.hu",
            "lakcim" => "2230.Gyömrő.Pázmány Péter utca 49.",
            "telefonszam" => "06703259841",
        ]);

        User::create([
            "nev" => "Molnár Mária",
            "user_nev" => "marcsi83",
            "jelszo" => "ezajelszo",
            "email_cim" => "marcsi83@yahoo.com",
            "lakcim" => "1183.Budapest.Úz utca 3.",
            "telefonszam" => "06206549874",
        ]);

        User::create([
            "nev" => "Balogh Éva",
            "user_nev" => "evike99",
            "jelszo" => "balogh99",
            "email_cim" => "evike99@yahoo.com",
            "lakcim" => "2119.Pécel.Dobos István utca 28.",
            "telefonszam" => "06702581479",
        ]);

        User::create([
            "nev" => "Nagy Edit",
            "user_nev" => "editnagy20",
            "jelszo" => "szentendre",
            "email_cim" => "editnagy2002@gmail.com",
            "lakcim" => "2000.Szentendre.Tóth Árpád utca 27.",
            "telefonszam" => "06305649871",
        ]);

        User::create([
            "nev" => "Gál Andrea",
            "user_nev" => "galandaaa",
            "jelszo" => "andrea654",
            "email_cim" => "galandaaa@gmail.com",
            "lakcim" => "2230.Gyömrő.Karinthy Frigyes utca 13.",
            "telefonszam" => "06706532487",
        ]);

        User::create([
            "nev" => "Fazekas Krisztina",
            "user_nev" => "afazekas",
            "jelszo" => "konyvtarj",
            "email_cim" => "afazekas@freemail.hu",
            "lakcim" => "2600.Vác.Blaha Lujza utca 72.",
            "telefonszam" => "06203126847",
        ]);

        User::create([
            "nev" => "Sándor András",
            "user_nev" => "sandora",
            "jelszo" => "sanyiand57",
            "email_cim" => "sandora@freemail.hu",
            "lakcim" => "1112.Budapest.Örkény István utca 3.",
            "telefonszam" => "06303508547",
        ]);

        User::create([
            "nev" => "Szalai Mónika",
            "user_nev" => "mszalai",
            "jelszo" => "moncsika2",
            "email_cim" => "mszalai@gmail.com",
            "lakcim" => "1039.Budapest.Berzsenyi Dániel utca 86.",
            "telefonszam" => "06309898521",
        ]);

        User::create([
            "nev" => "Fazekas Lajos",
            "user_nev" => "lalika14",
            "jelszo" => "lalijelszo",
            "email_cim" => "lalika14@t-online.hu",
            "lakcim" => "1183.Budapest.Kosztolányi Dezső utca 87.",
            "telefonszam" => "06705557474",
        ]);

        User::create([
            "nev" => "Lukács Erzsébet",
            "user_nev" => "lukbozsi",
            "jelszo" => "erzsikee",
            "email_cim" => "lukacsbozsi@t-online.hu",
            "lakcim" => "1077.Budapest.Rejtő Jenő utca 23.",
            "telefonszam" => "06308574125",
        ]);

        User::create([
            "nev" => "Sipos Mária",
            "user_nev" => "smarcsi6",
            "jelszo" => "marcsi1995",
            "email_cim" => "smarcsi6@citromail.hu",
            "lakcim" => "1183.Budapest.Széchenyi István utca 70.",
            "telefonszam" => "06705412874",
        ]);

        User::create([
            "nev" => "Lakatos Mihály",
            "user_nev" => "misilakat",
            "jelszo" => "lakatos123",
            "email_cim" => "misilakat@freemail.hu",
            "lakcim" => "1164.Budapest.Hét vezér utca 6.",
            "telefonszam" => "06303216598",
        ]);

        User::create([
            "nev" => "Fodor Szilvia",
            "user_nev" => "szilva1998",
            "jelszo" => "szaboervin",
            "email_cim" => "szilva1998@gmail.com",
            "lakcim" => "1026.Budapest.Gábor Áron utca 4.",
            "telefonszam" => "06703258741",
        ]);

        User::create([
            "nev" => "Nagy Eszter",
            "user_nev" => "nagyesztii",
            "jelszo" => "bluemoon55",
            "email_cim" => "nagyeszti12@freemail.hu",
            "lakcim" => "1105.Budapest.Gergely utca 23.",
            "telefonszam" => "06204512784",
        ]);

        User::create([
            "nev" => "Molnár Mária",
            "user_nev" => "mmarika",
            "jelszo" => "molnar55",
            "email_cim" => "mmarika@citromail.hu",
            "lakcim" => "1183.Budapest.Úz utca 3.",
            "telefonszam" => "06305468748",
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
