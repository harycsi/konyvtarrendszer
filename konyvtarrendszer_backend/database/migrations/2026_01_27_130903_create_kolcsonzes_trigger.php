<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateKolcsonzesTrigger extends Migration
{
    
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER `trg_kolcsonzes_db_szam_kikolcsonzes`
            AFTER INSERT ON `kolcsonzes` 
            FOR EACH ROW 
            BEGIN 
                UPDATE konyvek 
                SET konyvek.db_szam = konyvek.db_szam - 1 
                WHERE new.konyv_id = konyvek.id;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `trg_kolcsonzes_db_szam_visszahozatal`
            AFTER UPDATE ON `kolcsonzes` 
            FOR EACH ROW 
            BEGIN 
                UPDATE konyvek 
                SET konyvek.db_szam = konyvek.db_szam + 1 
                WHERE new.vissza_datum IS NOT NULL;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `trg_kolcsonzes_vissza_datum_before_update`
            BEFORE UPDATE ON `kolcsonzes` 
            FOR EACH ROW 
            BEGIN 
                if new.kolcs_datum > new.vissza_datum THEN
	                signal SQLSTATE '45000' set MESSAGE_TEXT='Hiba: A kölcsönzés 
                    dátuma előbbi dátum kell legyen, mint a visszahozatal dátuma!';
                end if;
            END
        ");
    }

    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_kolcsonzes_db_szam_kikolcsonzes` ");
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_kolcsonzes_db_szam_visszahozatal` ");
        DB::unprepared("DROP TRIGGER IF EXISTS `trg_kolcsonzes_vissza_datum_before_update` ");
    }
}
