<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER `trg_foglalas_db_szam_lefoglalta` 
            AFTER INSERT ON `foglalas` 
            FOR EACH ROW 
            BEGIN 
                UPDATE konyvek 
                SET konyvek.db_szam = konyvek.db_szam - 1 
                WHERE konyvek.id = NEW.konyv_id; 
            END
        ");
    }

    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_foglalas_db_szam_lefoglalta` ");
    }

};