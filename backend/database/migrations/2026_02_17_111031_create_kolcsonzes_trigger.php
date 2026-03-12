<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateKolcsonzesTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER `trg_kolcsonzes_db_szam_kikolcsonzes`
            AFTER INSERT ON `kolcsonzes` 
            FOR EACH ROW 
            BEGIN 
                UPDATE konyv
                SET konyv.db_szam = konyv.db_szam - 1 
                WHERE new.konyv_id = konyv.id;
            END
        ");

        DB::unprepared("
        CREATE TRIGGER `trg_kolcsonzes_db_szam_visszavetel`
        AFTER DELETE ON `kolcsonzes` 
        FOR EACH ROW 
        BEGIN 
            UPDATE konyv SET db_szam = db_szam + 1 WHERE id = OLD.konyv_id;
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
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_kolcsonzes_db_szam_kikolcsonzes` ");
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_kolcsonzes_db_szam_visszavetel` ");
    }
}
