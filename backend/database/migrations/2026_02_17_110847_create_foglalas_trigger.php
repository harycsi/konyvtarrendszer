<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateFoglalasTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER `trg_foglalas_db_szam_lefoglalta` 
            AFTER INSERT ON `foglalas` 
            FOR EACH ROW 
            BEGIN 
                UPDATE konyv
                SET konyv.db_szam = konyv.db_szam - 1 
                WHERE konyv.id = NEW.konyv_id; 
            END
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_foglalas_db_szam_lefoglalta` ");
    }
}
