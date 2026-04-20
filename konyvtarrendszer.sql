-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2026 at 05:46 PM
-- Server version: 8.0.45-0ubuntu0.22.04.1
-- PHP Version: 8.1.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konyvtarrendszer`
--

-- --------------------------------------------------------

--
-- Table structure for table `adatmodositas`
--

CREATE TABLE `adatmodositas` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `uj_nev` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uj_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uj_cim` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uj_tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statusz` enum('fuggo','elfogadva','elutasitva') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fuggo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adatmodositas`
--

INSERT INTO `adatmodositas` (`id`, `user_id`, `uj_nev`, `uj_email`, `uj_cim`, `uj_tel`, `statusz`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL, NULL, '06309305566', 'fuggo', '2026-04-26 12:45:58', '2026-04-26 12:45:58');

-- --------------------------------------------------------

--
-- Table structure for table `dolgozos`
--

CREATE TABLE `dolgozos` (
  `id` bigint UNSIGNED NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_nev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefonszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dolgozos`
--

INSERT INTO `dolgozos` (`id`, `nev`, `user_nev`, `jelszo`, `telefonszam`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Kovács Mária', 'konyvtar1', '$2y$10$477w/URUBLZlVEXOJJ2BKOFEZYJM6f6l9lZqzOm54F5rAt5qlt4gy', '06203123456', 1, NULL, NULL),
(2, 'Probst Attila', 'raktaros1', '$2y$10$3TK0XLZrli/bSeZLo/3xkeBDbN7DoC89H1qOsyewTOTGdnrpUMwMa', '06205858417', 2, NULL, NULL),
(3, 'Mogyorósi Merse', 'admin', '$2y$10$1rCUlpv9JSMDY1KXFaoGCei3cGyu1xGA2IchNoawVL22Osc5t9wTS', '06205554848', 0, NULL, NULL),
(4, 'Tóth Gyöngyvér', 'konyvtar2', '$2y$10$OxY9Hz0NKSeqZA7n80F7Q.ee5mp9p4K8DzvsBYR0gtcEOT4H0maGi', '06305684477', 1, NULL, NULL),
(5, 'Szentendrey Klára', 'konyvtar3', '$2y$10$lmp1auqAOo1nk3OnAdsQEeQp3GCJtowSLKZhsE7fd38xMUfU5ILoa', '06709258741', 1, NULL, NULL),
(6, 'Papp Tamás', 'raktaros2', '$2y$10$g6SsgfS/20sYpAPkYAMarO8tCw88VR9SmUVn9E4NdOqbxfu/GyYWW', '06206664512', 2, NULL, NULL),
(7, 'Tóth Elemér', 'raktaros3', '$2y$10$9NfH2Vj/IvI/vbvw9HFW/O2bK7BVKVfPgfy1siIq7Ovh2f9do3Op2', '06707415821', 2, NULL, NULL),
(8, 'Fekete Anna', 'konyvtar4', '$2y$10$Lbci2OUbCKrDXNULVbSK7OPLkwwzMqZ/ULLP3QR8YCcU/NHECYiYC', '06704457781', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foglalas`
--

CREATE TABLE `foglalas` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `konyv_id` bigint UNSIGNED NOT NULL,
  `fogl_datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `foglalas`
--

INSERT INTO `foglalas` (`id`, `user_id`, `konyv_id`, `fogl_datum`, `created_at`, `updated_at`) VALUES
(12, 4, 6, '2026-03-19 19:21:02', '2026-03-19 18:21:02', '2026-03-19 18:21:02'),
(13, 4, 4, '2026-03-19 19:23:48', '2026-03-19 18:23:48', '2026-03-19 18:23:48'),
(15, 28, 15, '2026-04-09 19:37:08', '2026-04-09 17:37:08', '2026-04-09 17:37:08'),
(17, 29, 8, '2026-04-09 20:02:50', '2026-04-09 18:02:50', '2026-04-09 18:02:50'),
(18, 1, 25, '2026-04-19 15:35:30', '2026-04-19 13:35:30', '2026-04-19 13:35:30');

--
-- Triggers `foglalas`
--
DELIMITER $$
CREATE TRIGGER `trg_foglalas_db_szam_lefoglalta` AFTER INSERT ON `foglalas` FOR EACH ROW BEGIN 
                UPDATE konyv
                SET konyv.db_szam = konyv.db_szam - 1 
                WHERE konyv.id = NEW.konyv_id; 
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_foglalas_db_szam_torleskor` AFTER DELETE ON `foglalas` FOR EACH ROW BEGIN 
                    UPDATE konyv 
                    SET db_szam = db_szam + 1 
                    WHERE id = OLD.konyv_id;
            END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `konyv_id` bigint UNSIGNED NOT NULL,
  `kolcs_datum` date NOT NULL DEFAULT (curdate()),
  `hatarido` date DEFAULT NULL,
  `email` tinyint NOT NULL DEFAULT '0',
  `dolg_id` bigint UNSIGNED NOT NULL,
  `uzenet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kolcsonzes`
--

INSERT INTO `kolcsonzes` (`id`, `user_id`, `konyv_id`, `kolcs_datum`, `hatarido`, `email`, `dolg_id`, `uzenet`, `created_at`, `updated_at`) VALUES
(3, 5, 7, '2026-03-17', '2026-03-31', 1, 1, NULL, '2026-03-17 12:50:28', '2026-04-09 13:44:29'),
(5, 11, 9, '2026-03-17', '2026-03-31', 1, 1, 'nem találja', '2026-03-17 19:05:32', '2026-04-09 13:44:29'),
(6, 4, 3, '2026-03-17', '2026-03-31', 1, 4, 'leöntötte KV-val', '2026-03-17 19:34:05', '2026-04-09 13:44:30'),
(7, 4, 1, '2026-04-09', '2026-04-23', 0, 1, NULL, '2026-04-09 13:53:59', '2026-04-09 13:53:59'),
(8, 4, 24, '2026-04-09', '2026-04-23', 0, 1, NULL, '2026-04-09 13:54:06', '2026-04-09 13:54:06'),
(9, 21, 22, '2026-04-19', '2026-05-03', 0, 1, NULL, '2026-04-19 13:28:18', '2026-04-19 13:28:18'),
(10, 29, 4, '2026-04-19', '2026-05-03', 0, 1, NULL, '2026-04-19 13:30:28', '2026-04-19 13:30:28');

--
-- Triggers `kolcsonzes`
--
DELIMITER $$
CREATE TRIGGER `trg_kolcsonzes_db_szam_kikolcsonzes` AFTER INSERT ON `kolcsonzes` FOR EACH ROW BEGIN 
                UPDATE konyv
                SET konyv.db_szam = konyv.db_szam - 1 
                WHERE new.konyv_id = konyv.id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_kolcsonzes_db_szam_visszavetel` AFTER DELETE ON `kolcsonzes` FOR EACH ROW BEGIN 
            UPDATE konyv SET db_szam = db_szam + 1 WHERE id = OLD.konyv_id;
        END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `konyv`
--

CREATE TABLE `konyv` (
  `id` bigint UNSIGNED NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `szerzo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kiadas_eve` year NOT NULL,
  `oldalak` int NOT NULL,
  `db_szam` int UNSIGNED NOT NULL DEFAULT '0',
  `kep` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `osszdb_szam` int UNSIGNED NOT NULL DEFAULT '0',
  `leiras` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `konyv`
--

INSERT INTO `konyv` (`id`, `cim`, `szerzo`, `kiadas_eve`, `oldalak`, `db_szam`, `kep`, `osszdb_szam`, `leiras`, `created_at`, `updated_at`) VALUES
(1, 'Kobalt - A pekingi játszma', 'Frei Tamás', 2025, 606, 9, 'kepek/kobalt.jpg', 10, 'ANDRÉ CALVI új feladatot kap: a Kínai Kommunista Párt egyik \n            kulcsfiguráját kell elrabolnia, de fogalma sincs, hogy valójában ki áll \n            a megbízás hátterében. Eszébe sem jut, hogy a küldetés Kína és Amerika \n            csatájának tűzvonalába sodorhatja. A szálak Budapestre vezetnek, a magyar \n            miniszterelnök dolgozószobájába... Közben egy gyönyörű, de titokzatos \n            francia nővel is találkozik, és ez mindent felkavar! Államfők, elnökök, \n            milliárdosok, hazardőrök és az árnyékvilág harcosai - kitalált és a \n            híradásokból,jól ismert valós szereplők sora. FREI TAMÁS új politikai \n            akcióthrillere a közeljövőben játszódik. A szerzőtől megszokott feszes \n            ütemű, letehetetlen könyv kíméletlenül lerántja a leplet a színfalak \n            mögött zajló gátlástalan alkukról, az országok sorsát meghatározó emberi \n            gyarlóságról és az elhibázott politikai döntésekről.', NULL, NULL),
(2, 'Sátántangó', 'Krasznahorkai László', 2025, 322, 12, 'kepek/satantango.jpg', 12, 'Valamikor a nyolcvanas évek elején, valahol Délkelet-Magyarországon, \n            egy egykor volt mezőgazdasági telep eleven romjain bontakozik ki a Sátántangó különleges, \n            mai napig páratlan koreográfiája. Ebbe a zárt és mozdulatlan világba érkezik meg \n            Irimiás, az oldalán Petrinával, hogy új reményekkel és illúziókkal kápráztassa el a telepen élő, \n            leginkább túlélni próbáló helyieket.Krasznahorkai László 1985-ben megjelent első regénye mára a \n            modern magyar és világirodalom klasszikusa lett. A Sátántangó a maga szociografikus gyökereivel \n            így lesz örök érvényű példázat az ember törékeny mivoltáról, a menekülésről és a maradásról, a \n            kegyelemről és a könyörületről, a közelgő katasztrófákról - olyan eredeti hangon és elbeszélői nézőpontból, \n            ami a mai napig lenyűgözi a regény olvasóját. A regény az elmúlt négy évtizedben mit sem vesztett aktualitásából: \n            ezt bizonyítják újabb és újabb hazai kiadásai, megfilmesítése, sorjázó külföldi fordításai és a 2025-ös Irodalmi Nobel-díj.', NULL, NULL),
(3, 'Szerintem', 'Náray Tamás', 2025, 425, 8, 'kepek/szerintem.jpg', 9, 'Semmiért sem kell - úgy érzem - bocsánatot kérnem. Mert ez van. \n            Náray Tamás eddigi legőszintébb és legszemélyesebb könyvének nemes egyszerűséggel \n            saját létezése a tárgya. Önmaga elől nincs mit lepleznie; nincs, akinek vagy akiért \n            szépítsen, maszatoljon. Az Anyám szerint és az Apám szerint című nagy sikerű kötetek \n            után most levonja a saját tanulságait. Az életéből, a munkásságából, a származásából \n            és a neveltetéséből, az őt övező szeretetből és figyelemből, de nem kevésbé az őt \n            ért bántásokból és figyelmetlenségekből. A létezés felületességéből. Viharoktól a \n            megnyugvásig - fenntartva a belenyugvás képtelenségét. Zárójelbe téve sikert, megítélést, \n            érzelmeket és értékeket, ihletet és stúdiumokat, hazát és önkéntes száműzetést - a \n            legszemélyesebb dolgok sűrű sötétjéből indulva az általános igazságok derengése \n            felé. És amikor háborog és bánt, azt is mindig érted, sohasem ellened teszi.', NULL, NULL),
(4, 'Stonehenge, Az idő katedrálisa', 'Ken Folett', 2025, 632, 9, 'kepek/stonehenge.jpg', 11, 'Seft, a bányászfiú a Nagy Síkságon járja útját a nyári hőségben, hogy ott legyen a szertartáson, mely az új év kezdetét jelzi. Azért tart az ünnepre, hogy elcserélje kovaköveit egyéb hasznos dolgokra, és megkeresse Neent, a pásztorlányt, akit szeret. Joia, Neen húga elbűvölve figyeli a nyárközepi szertartást. Minden vágya, hogy ő is a papnők egyike lehessen, és részt vehessen különleges rituális táncaikon, amelyeket egy nagy, fából készült kör körül járnak el. Ám a dombokon és az erdők lombjai alatt már feszültség gyülemlik. Aszály pusztítja a földeket, egyre nő a bizalmatlanság a pásztorok, a földművesek és az erdőlakók között - mígnem egy kegyetlen tett nyílt háborúhoz vezet... \n            Joia a békésebb jövő lehetőségét látja meg egy olyan, hatalmas kőkörökből álló szentélyben, amelyet a síkság megosztott népei együtt hoznak létre. Ennek az elképzelésnek a megvalósítása lassan élete céljává válik, melynek elérésében Seft nyújt neki segítő kezet. \n            A Stonehenge nem csupán történelmi regény - magával ragadó történetmesélés arról, hogy elhivatottsággal, kitartással, az összefogás erejével hogyan születik meg egy új civilizáció.', NULL, NULL),
(5, 'Az ég minden kékje', 'Mélissa Da Costa', 2025, 654, 11, 'kepek/egmindenkekje.jpg', 11, 'A huszonhat éves Émile fiatalkori Alzheimer-kórban szenved. Az orvosok mindössze két évet jósolnak neki, ő pedig úgy dönt, lemond a kísérleti terápiáról és odahagyja a kórházat, hogy hátat fordítva az aggódó, előre gyászoló és folyamatosan együttérző családnak, barátoknak megszökjön, és egy lakóautóval utazgatva töltse el a hátralévő kevés idejét. \n            Felad egy őszinte és lényegretörő hirdetést, és legnagyobb meglepetésére akad is egy jelentkező. A fekete ruhában, hatalmas kalapban és még nagyobb hátizsákkal felbukkanó Joanne titokzatos és hallgatag, nem kérdez és nem beszél, mégis szinte magától értetődő természetességgel ül be az autóba és szegődik Émile mellé.', NULL, NULL),
(6, 'Dimenzió kapu', 'Zecharia Sitchin', 2004, 350, 8, 'kepek/dimenziokapu.jpg', 9, 'A Földkrónikák sorozat azokon a feltevéseken nyugszik, hogy a mitológia nem más, mint őseink emlékezetének kincsestára. A Biblia szó szerint, történeti-tudományos dokumentumként olvasandó, és hogy az emberi civilizáció gyökerei az űrből érkeztek és szuperintelligens lények közösségében keresendők. A könyv a többi között rávilágít a piramisépítés kapcsán született elméletek tévedéseire, illetve arra, hogy a ma kutatói bizony néha szándékos megtévesztés áldozatai lettek. A kötet gazdagon illusztrált, ábrák és térképek segítik a megértést. A szerző a danikeni hagyományokat folytatja, de egyéni szempontjain keresztül új nézőpontból kaphatunk választ a már ismert kérdésekre.', NULL, NULL),
(7, 'Fehér mágia', 'Matthias Mala', 1998, 134, 7, 'kepek/fehermagia.jpg', 8, 'Kedves Olvasó! Vannak-e olyan napjaid, amikor úgy érzed, minden összeesküdött ellened? Tapasztalod-e néha, hogy egyes helyek hangulata mázsás súlyként telepszik rád? Találkozol-e olyan emberekkel, akik mintha megcsapolnák életerőd? Ha e kérdések egyikére is igennel válaszolsz, könyvünk a Te számodra íródott. Matthias Mala, a Fehér mágia szerzője megtanít olyan eljárásokra, amelyek felvérteznek az ártó hatásokkal szemben. Nem, nincs szükség gyíkszívre, fekete macska májára! A fehér mágia effélékkel nem él. Hiszen ez a mágia szelíd eszközökkel, jótékonyan használja fel a természet titkos erőit, az események befolyásolása céljából.', NULL, NULL),
(8, 'Önmagad forrása', 'Lisa Lister', 2023, 311, 11, 'kepek/onmagadforrasa.jpg', 12, 'Képes vagy arra, hogy elengedd magad, nyitottá válj az új befogadására? Hogy újonnan bízni tudj a megérzéseidben? Hogy emlékezz a benned rejlő gyógyító varázslatra?\n\nLisa Lister felébreszti a testtudatosságot, segít felelősséget vállalni saját fizikai, mentális, érzelmi és spirituális szükségleteidért, valamint hozzáférni az energiádhoz, a kreativitásodhoz, az egyedi frekvenciádhoz és a mágiádhoz, hogy képes legyél kiállni magadért és másokért a káosz, a bizonytalanság és az átmenet idején.', NULL, NULL),
(9, 'A kozmosz üzenete', 'Erich Von Däniken', 2025, 192, 4, 'kepek/kozmoszuzenete.jpg', 5, 'Ha voltak csaták a világűrben, akkor ezeknek voltak győztesei és vesztesei. A győztesek háboríthatatlanul maradtak a bolygójukon, a legyőzötteknek azonban menekülniük kellett. Földünk vajon menekülési hely volt egy űrbéli csata legyőzöttei számára? Hogyan keletkezhettek az alagútrendszerek Ecuadorban és Peruban és vajon mikor üthetett a Homo Sapiens számára a „születés órája”? A moszkvai Paleontológiai Múzeumban egy bölénykoponya látható, amely a korai kőkorszakból származik. A koponya lemezén olyan luk van, amelyet csak lőfegyver képes előidézni. Talányos kérdések: kinek volt i.e. 8000 évvel lőfegyvere? Ezekre, valamint hasonló rejtélyes kérdésekre keresi a választ Eich von Däniken ebben a könyvében.', NULL, NULL),
(10, 'A háború művészete', 'Szun-Ce', 2024, 192, 9, 'kepek/haborumuveszete.jpg', 9, 'Szun-ce műve nem csupán a klasszikus kínai műveltség egyik alapköve, hanem egyben a világ klasszikus hadtudományának egyik legkiemelkedőbb alkotása is. A mintegy ötezer írásjegyből álló mű érvényességét az évszázadok, évezredek sem koptatták el. Így a modern ember is hasznos kézikönyvként forgathatja, hogy megoldást találjon benne saját problémáira. A kötetben találhatunk még két másik, talán kevésbé ismert, ám nem kevésbé hasznos klasszikus kínai hadtudományi művet is.', NULL, NULL),
(11, 'Csak a baj', 'Rachel Gibson', 2017, 318, 8, 'kepek/csakabaj.jpg', 8, 'Baj van! Chelsea Ross színészi pályafutása egy kudarc: a Csini hulla 1 típusú szerepekben nyújtott briliáns alakítása révén került a legközelebb ahhoz, hogy filmcsillag legyen. De az, hogy otthagyja Hollywoodot, és egy híres jégkorongozó személyi asszisztense lesz, talán élete leghülyébb húzása karrierfronton. Megint baj van! Mark Bressler, a sérült szupersztár dicső napjai véget értek. De az egykori élsportoló és fenegyerek ettől még akár civilizáltan is viselkedhetne a mélynövésű, rózsaszín-szőke hajú bombázóval, akit a Seattle Chinooks fogadott fel az ő személyi asszisztensének. Ha Chelsea-nek nem kellene olyan nagyon a pénz, hanyatt-homlok menekülne a világ legnagyobb baromarca elől. Nagy baj van! Mark minősíthetetlen modorát és borongós kedélyét Chelsea tudja kezelni: problémát csak a férfi bicepsze okoz, meg az a követ is megolvasztó, hiper-szuper teste! Amikor a fenegyerek kezd rámozdulni, Chelsea jól tudja: itt az ideje, hogy kizavarja a büntetőpadra... Bárcsak ellen tudna állni annak, amit Mark forgat a fejében! Amiből csak baj lehet...', NULL, NULL),
(12, 'Kapj el, ha tudsz', 'Frank W. Abagnale', 2003, 266, 8, 'kepek/kapjel.jpg', 8, 'A világ legfiatalabb, legpofátlanabb szélhámosának elképesztő igaz kalandjai', NULL, NULL),
(13, 'A vak bérgyilkos', 'Margaret Atwood', 2003, 564, 10, 'kepek/vakbergyilkos.jpg', 10, 'Családi titok, testvérféltékenység, politikai fondorlat és társadalmi feszültség, megannyi ígéret és árulás, veszteség és fájdalom, emlékezés és sóvárgás kavarog Margaret Atwood Booker-díjas regényében. 1945-ben Laura Chase titokzatos körülmények között hal meg. Baleset vagy öngyilkosság? - találgatják azóta is. Évekkel később nővére, az élete alkonyán járó Iris Chase Griffen által ismerjük meg gyerekkorukat, a család drámai veszteségeit és a Laurának tulajdonított regényt, a posztumusz kiadott és rejtélyes remekműként ünnepelt A vak bérgyilkost. Margaret Atwood a tőle megszokott bravúros stílusban szövi össze a különböző történetszálakat, hogy újra elvarázsoljon minket.', NULL, NULL),
(14, 'Csokonai, az újrakezdések költője', 'Debreczeni Attila', 1993, 272, 12, 'kepek/csokonaiujrakezdes.jpg', 12, 'Az 1970-es évek első felében készült Csokonai-kismonográfiák, Julow Viktor és Vargha Balázs munkái óta több, új távlatokat nyitó dolgozat jelent meg a felvilágosodás nagy költőjének munkásságával kapcsolatban, s jelentősen előrehaladt összes műveinek kritikai kiadása is. Mindez mintegy kihívást jele...', NULL, NULL),
(15, 'Ez van', 'Vida Gusztáv', 2018, 314, 8, 'kepek/ezvan.jpg', 9, 'Ez van... Vagyis, hogy volt. Mára még színtelenebbé vált a világ - a vadászatban is. Szerencsémre még elcsíptem azt az utolsó öt-hat évet, amikor csak az ment, akit igazán érdekelt. Vagy, akinek kellett valami. Hazajövünk, nappal lesz. Megyünk dolgozni, kommunikálunk, a család. Folynak az évek... Mennyi titkot hordozunk magunkban! Mert, majd\' mindegyiknek nyoma van, hivatalosan. De ki tudja, hogy miként is volt valóján azon az éjszakán. Csak mi. Magunkban hordjuk. Elképedek tisztázva a régi szövegeket. Ez én voltam? Ötödét se vállalnám be már. Mások se. Változunk. A világ is. Denaturált lett. (Mint Afrika.) De még itt, az van. Azt mesélem... Nem viszem a sírba.', NULL, NULL),
(16, 'Winnetou kalandjai', 'Karl May', 1994, 434, 12, 'kepek/winnetou.jpg', 12, 'A híres vadász, Old Shatterhand saját maga beszéli el, hogyan nyeri el a legnemesebb apacs, Winnetou barátságát. A történetnek komor hangulatot kölcsönöz a vadon rózsája, a gyönyörű indián lány, Nsocsi tragikus sorsa, értelmetlen halála. Megismerkedünk a Vadnyugat híres hőseivel: Old Death nyomkeresővel, Old Firehand trapperrel, majd találkozunk régi ismerőseinkkel: Sam Hawkens, Dick Stone és Will Parker vadászokkal. A komancsok között és Kaliforniában átélt sok érdekfeszítő élmény után a szerző - a legnemesebb törzsfőnök élete és halála tükrében - maradandó emléket állít a pusztulásra ítélt rézbőrű fajnak. A tragikusan végződő regénytrilógiát az apacs-hagyatékról szóló beszámoló zárja.', NULL, NULL),
(17, 'Válogatott mesék', 'Viktor Alekszandrovics Krilov', 1959, 62, 9, 'kepek/valogatottmesek.jpg', 9, ' ', NULL, NULL),
(18, 'Pápaszemes Manolito', 'Elvira Lindo', 2010, 134, 10, 'kepek/papaszemmanolito.jpg', 10, 'Nálunk, Carabanchelben, ha esetleg még nem mondtam volna, engem mindenki Pápaszemes Manolitóként ismer. Persze csak azok, akik ismernek. Akik nem ismernek, azt se tudják, hogy ötéves korom óta szemüveges vagyok.` `Én bírom, ha Pápaszemesnek hívnak. A sulimban, a &lt;Diego Velázquezben&gt; mindenkinek, aki egy kicsit is fontos, van beceneve. Mielőtt még lett volna becenevem, elég sokat sírtam. Ha valamelyik nagymenő belém kötött a szünetben, mindig az lett a vége, hogy négyszeműnek vagy pápaszemesnek csúfolt. Mióta viszont Pápaszemes Manolito vagyok, tiszta időpocsékolás engem csúfolni. Jó, hívhatnának mondjuk Nagyfejűnek is, de ez eddig még senkinek se jutott eszébe, én meg persze nem akarok ötleteket adni. Ugyanez történt a barátommal, Lapátfülű Lópezzel is. Mióta van beceneve, már senki sem csúfolja a füle miatt.', NULL, NULL),
(19, 'Betyár becsület', 'Cserni András', 2023, 516, 8, 'kepek/betyarbecsulet.jpg', 8, 'Árnyak gyülekeznek Mistaria és az Evilág felett. Aggasztó események zajlanak. Sötét erők mozgolódnak. A megsebzett vad visszatámad talán?Patrikot ismét rémálmok gyötrik, s egyre idegesebb lesz, mikor Kristóf nem ad életjelet magáról. Márk és Jani segítségével nyomozni kezd, s döbbenten fedezik fel: legjobb barátjukat elrabolták. Hagyományos úton nem lehet tenni semmit, így a három fiú Mogyoró, Vándor, Geze, valamint egy bujkáló sámán, Harald segítségével felkerekednek az Avilágba, hogy megkeressék a titokzatos Hollós Embert, aki talán tudja, hol lehet Kristóf.Az Avilág nyugati felén elterülő Fort-hegységben egy ifjú betyár, Alex cselszövés áldozatává válik: egy rablógyilkosság első számú gyanúsítottja lesz, holott nem ő követte el. Vérdíjat tűznek ki a fejére, így menekülnie kell. Egy biztonságos hely marad számára: a Holló Királyság területén fekvő Ezüsterdő, a törvény elől menekülők mentsvára.', NULL, NULL),
(20, 'A szekrény', 'Nemes István', 1995, 24, 11, 'kepek/aszekreny.jpg', 11, 'Ez a különleges leporelló olyan alakú, mint egy szép, régi \n            szekrény, és úgy lapozhatjuk, mintha egy szekrény két ajtaját nyitnánk ki. \n            A lapok visszafelé visznek az időben, és előtűnnek egymás után a szekrény \n            korábbi tulajdonosai holmijaikkal, amiket a polcokon, rekeszekben, akasztókon \n            tartottak. A könyv tehát egy tárgy kalandos története.', NULL, NULL),
(21, 'Nők könyve', 'OSHO', 2016, 269, 10, 'kepek/nokkonyve.jpg', 10, 'A legtöbb dolog, amiben a férfi és a nő különböznek, csak viszonylagos. A különbségeket éppen hogy meg kellene becsülni, fenn kellene tartani, mert ezek teszik vonzóvá a két nemet egymás számára. Nem egymás elítélésére kellene használni őket. Én azt szeretném, ha a két nem egy szerves egységgé válna, megtartva közben önnön szabadságukat, mert a szeretet szabaddá tesz. És akkor egy szebb világot hozhatnánk létre. Az emberiség egyik fele most meg van fosztva attól a lehetőségtől, hogy ebben közreműködhessen, pedig ez a fél, a nő, nagyszerű adottságokkal rendelkezik ahhoz, hogy egy szebb világ jöhessen létre. Az ő közreműködésével egy gyönyörű paradicsom lehetne a világ...', NULL, NULL),
(22, 'Tanár úr kérem', 'Karinthy Frigyes', 2010, 86, 14, 'kepek/tanarurkerem.jpg', 15, 'A tízéves gyermek Karinthy bölcs szemlélődéssel, érett humorral veszi tudomásul a felnőttek, a tanárok, sőt a többiek hibáit, erényeit is. Szívvel-lélekkel él az iskolában, az osztályban, s bár mulat mindenen, mégis nagyon komolyan, halálosan komolyan veszi az egészet. Ez derül ki a naplójából, amely igazolja a Tanár úr kéremnek, ennek az örökérvényű írásnak érzelmi keletkezését. Az osztály a legfőbb jó, soha annyit nem lehet nevetni, soha annyira nem lehet félni, mint ahogy azt az ember az osztályban tette. Az ember egy életen át nosztalgiával gondol vissza a hajdani örömökre, szorongásokra. S hogy mennyire hiteles élmény Karinthyé, bizonyítja az, hogy az emberek változnak, az iskolák, a diákok cserélődnek, de ez az élmény a ma gyereke, felnőttje számára ugyanolyan friss erővel hat, éppolyan aktuális, mintha mostanában történt volna meg, s éppen vele.', NULL, NULL),
(23, 'A kőszívű ember fiai', 'Jókai Mór', 2022, 531, 13, 'kepek/koszivuemberfiai.jpg', 13, 'A kiegyezés után két évvel írta Jókai e regényt. Életének legfőbb élményforrását képező forradalom és szabadságharc mitológiai fenségű ábrázolását sikerült összeegyeztetnie a kor társadalmi életének fő ellentmondásait szerencsésen sűrítő családi bonyodalomrajzában. A kőszívű ember fiai műfajánál fogva a rossz bukását hirdeti. Az isteni igazság győzelmét. Azt, hogy a sors alakítható. Azt, hogy az ember jó, illetve azzá tehető. A szíve ugyan megkövülhet, de ha e férfi-princípiummal szemben a kő, azaz a föld szíve anyagilag meglágyul, még e kőszív is kiengesztelhető.', NULL, NULL),
(24, 'A Pál utcai fiúk', 'Molnár Ferenc', 2010, 158, 14, 'kepek/palutcaifiuk.jpg', 15, 'A grund... A pesti gyereknek ez az alföldje, a rónája, a síksága. Ez jelenti számára a végtelenséget és a szabadságot. Egy darabka föld, melyet egyik oldalról düledező palánk határol, s melynek többi oldalain nagy házfalak merednek az ég felé. Most már a Pál utcai grundon is nagy, négyemeletes ház szomorkodik, tele lakóval, akik közül talán egy se tudja, hogy ez a darabka föld néhány szegény pesti kisdiáknak a fiatalságát jelentette.', NULL, NULL),
(25, 'Az ember tragédiája', 'Madách Imre', 2006, 191, 15, 'kepek/azembertragediaja.jpg', 16, 'Csalóka mű Madách Tragédiája, mert a felszínen a cselekmény jól követhető: Lucifer pimaszsága, a rabszolga halála, Keplerné hűtlensége, az Eszkimó félelme. Az alapkérdés, a mélység is érthető: ha nem tudjuk, miért létezünk, akkor legalább küszködjünk derekasan. De a kettőt összefűző gondolatszövet már nehezen érthető, könnyen elsiklik fölötte olvasó is, rendező is. Mit mond pontosan az ironikus Lucifer, a hímsoviniszta Ádám, és végül az Úr, aki mellébeszél? Ezt kívánjuk kibogozni, az eddigi kiadásoknál jóval alaposabban. E célból Madách eredeti szövegével párhuzamosan, a szemközti könyvoldalon prózai fordítást adunk mai magyar nyelven.', NULL, NULL),
(26, 'Légy jó mindhalálig', 'Móricz Zsigmond', 2008, 317, 15, 'kepek/legyjomindhalalig.jpg', 15, 'Nyilas Misi szorongó kiskamasz, aki nem találja a helyét a debreceni kollégium falai között. Szerencsétlen véletlenek folytán a felnőttek olykor kegyetlen világával is kénytelen idejekorán szembesülni. A nyakába szakadt felelősség súlyát addig-addig hordozza magában, míg végül rá kell jönnie: Én nem akarok debreceni diák lenni tovább! \n            Móricz Zsigmond társadalomkritikájával ugyan elsősorban a felnőtteket akarta megszólítani, pontos gyerekkarakterei és az egész könyvből áradó humanizmus miatt azonban máig az egyik legfontosabb magyar ifjúsági regényként olvassuk és szeretjük Misi történetét.', NULL, NULL),
(27, 'Tom Sawyer kalandjai', 'Mark Twain', 2011, 238, 10, 'kepek/tomsawyer.jpg', 10, 'A Mark Twain néven világhírű íróvá lett Samuel Langhorne Clemens javarészt \n            saját gyermekkori élményei alapján írta meg legsikeresebb regényét, a Tom Sawyer kalandjait (1876). A címszereplőt három hajdani cimboráját eggyé gyúrva formázta meg, és Tom Sawyer - Huckleberry Finn-nel együtt - a világirodalom egyik legismertebb gyerekhőse lett, akivel azóta minden ifjú generáció szívesen azonosul, hiszen a legtöbb fiú - éljen bármely korban - szeretne kalóz, kincskereső, ártatlanokat megmentő hős, illetve a kedvesét megmentő hősszerelmes lenni. Szerb Antal a könyv szerzőjét a gyerekirodalom Shakespeare-jének nevezte (teljes joggal, hiszen Mark Twain e regénye valóban éppúgy kötelező olvasmány, mint az avoni hattyú drámái), és hozzátette: Tom Sawyer és barátja, a javíthatatlanul bohém Huckleberry Finn mindnyájunk életének része, akár Robinson vagy Gulliver, de sokkal melegebben, sokkal bensőségesebben, hiszen együtt voltunk velük gyerekek', NULL, NULL),
(28, 'Huckleberry Finn kalandjai', 'Mark Twain', 2011, 157, 11, 'kepek/huckleberryfinn.jpg', 11, 'Fogtam a fejszét és bezúztam vele az ajtót... aztán fogtam a disznót, bevittem a szobába..., ott átvágtam a torkát a fejszével és ledobtam a földre, hadd vérezzen... Aztán egy ócska zsákot megraktam kővel..., végighurcoltam a fák közt, le a folyóig, és ott bedobtam a vízbe... Végre kitéptem egy csomót a hajamból, jól bevéreztem a fejszét, a hajfürtöt ráragasztottam és a fejszét a sarokba dobtam. A disznót meg a kabátomhoz szorítottam, hogy a vére ne csöpögjön, lecipeltem a ház alá és a folyóba süllyesztettem. Miféle merénylet készül itt? Végezheti-e jól, aki így kezdi? Mert így veszi kezdetét Huckleberry Finn kalandokban gazdag utazása a Mississippin - s hogy tragikus vagy szerencsés véget ér-e? Te is megtudod, ha e könyvet végigolvasod.', NULL, NULL),
(29, 'Egri csillagok', 'Gárdonyi Géza', 2006, 612, 13, 'kepek/egricsillagok.jpg', 13, 'Aki már járt Egerben, tudhatja, hogy minden út a várba vezet. Ha a vaskos, meredek falak beszélni tudnának, török és magyar fegyverek csörgéséről, ágyúdörrenésekről – az 1552-es ostrom élethalálharcáról – regélhetnének. A néma kövek helyett megtette ezt a vár remetéje, Gárdonyi Géza, s halhatatlan művet alkotott. Két főalakjával, Bornemissza Gergellyel és Cecey Évával pár éves korukban találkozunk először, s nyomon követhetjük életük romantikus fordulatait: török fogságból szabadulást, lányszöktetést, rabszöktetési kísérletet. Már-már révbe ért hőseink Eger vár ostrománál találják újra szembe magukat gyerekkori ellenségükkel, a kegyetlen Jumurdzsákkal…', NULL, NULL),
(30, 'Nemo kapitány', 'Verne Gyula', 2009, 455, 10, 'kepek/nemokapitany.jpg', 10, 'Egy óriási narvál veszélyezteti a hajókat a tengereken. Néhány bátor férfi ki akarja deríteni az igazságot, közben azonban olyan tapasztalatokra tesznek szert, amely egész életüket megváltoztatja...\n            A Nemo kapitányban számos, meghökkentően valós leírással találkozunk a tengeri élővilágról, és olyan találmányokról olvashatunk, amelyek Verne idejében még nem is léteztek, vagy léteztek, csak az író képzeletében már továbbfejlesztette őket. Ilyen a regény elektromos tengeralattjárója vagy a búvárruha...', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_02_13_130332_create_konyvs_table', 1),
(6, '2026_02_13_130351_create_dolgozos_table', 1),
(7, '2026_02_13_130404_create_foglalas_table', 1),
(8, '2026_02_13_130415_create_kolcsonzes_table', 1),
(9, '2026_02_17_110847_create_foglalas_trigger', 1),
(10, '2026_02_17_111031_create_kolcsonzes_trigger', 1),
(11, '2026_03_12_122950_create_adatmodositas_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 4, 'userToken', '535074192e98e3b4d442d249aa939be255137a62ff5ef6839cef17e4c249546f', '[\"*\"]', '2026-03-17 09:55:19', NULL, '2026-03-17 09:44:27', '2026-03-17 09:55:19'),
(7, 'App\\Models\\User', 4, 'userToken', '02678f4c2847f6e00d2fe5e909cc3a05d3f4745941555effeef1f037803b8a3f', '[\"*\"]', '2026-03-17 17:28:16', NULL, '2026-03-17 17:26:54', '2026-03-17 17:28:16'),
(12, 'App\\Models\\User', 1, 'userToken', '4b0d7e52ca83a4c5bb370e953bc0b72db0842cc509cf716ea490226790f5b2b1', '[\"*\"]', NULL, NULL, '2026-03-17 18:54:33', '2026-03-17 18:54:33'),
(13, 'App\\Models\\User', 1, 'userToken', 'bb00f2012d3d3a14c442591afe8cf4e6c19a1181f99e124fbfb4c2de61084027', '[\"*\"]', NULL, NULL, '2026-03-17 18:55:19', '2026-03-17 18:55:19'),
(14, 'App\\Models\\User', 1, 'userToken', '6c04fe5e756dc1b11d9964211199d99dbd0e931aa8a96f82a73d5e42a3ffcfd1', '[\"*\"]', NULL, NULL, '2026-03-17 18:56:17', '2026-03-17 18:56:17'),
(17, 'App\\Models\\User', 1, 'userToken', '9953f68eb69847fd30ec7e8c541deee4160c5fdd7ad922ace099fbfa71597688', '[\"*\"]', '2026-03-17 19:00:51', NULL, '2026-03-17 19:00:50', '2026-03-17 19:00:51'),
(25, 'App\\Models\\Dolgozo', 1, 'dolgozoToken', '40ce48f595550409a5abe42948feafb9522c2b3df24b11e97b609913173b4663', '[\"*\"]', '2026-03-19 10:41:20', NULL, '2026-03-19 09:04:11', '2026-03-19 10:41:20'),
(27, 'App\\Models\\Dolgozo', 5, 'dolgozoToken', 'a16c1d77f5a3a90471eb3fdb4fc968de5efa422380ad21dda5ad35beb5a7ab49', '[\"*\"]', NULL, NULL, '2026-03-19 11:51:19', '2026-03-19 11:51:19'),
(28, 'App\\Models\\Dolgozo', 5, 'dolgozoToken', '8e4c63306d5be4c7d06d29c78adfcaeea7d0322ef4e5a81c32e3af5c25f08df2', '[\"*\"]', '2026-03-19 12:59:48', NULL, '2026-03-19 11:51:28', '2026-03-19 12:59:48'),
(29, 'App\\Models\\Dolgozo', 1, 'dolgozoToken', 'b46bf66ede155086bacf14f33cbca461d1ca49ef148b39ed871d69ed085c8d7b', '[\"*\"]', '2026-03-19 13:12:47', NULL, '2026-03-19 13:00:04', '2026-03-19 13:12:47'),
(31, 'App\\Models\\Dolgozo', 1, 'dolgozoToken', '64dc402222ec626bf2986efbad2192a2d04701fe0f0e2960119c180077fa53cd', '[\"*\"]', '2026-03-19 17:41:56', NULL, '2026-03-19 17:31:28', '2026-03-19 17:41:56'),
(35, 'App\\Models\\User', 1, 'userToken', 'f4c2c3c175fbe643633d23a8e9d814d1e3d92d3a9e8c536b5cbe662a95002ef6', '[\"*\"]', '2026-04-09 12:56:22', NULL, '2026-04-09 12:32:30', '2026-04-09 12:56:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_nev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_cim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lakcim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefonszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nev`, `user_nev`, `jelszo`, `email_cim`, `lakcim`, `telefonszam`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Horváth János', 'jani458', '$2y$10$M4PFBDTMVo68HbXncnbcKeyfWzX34iQGD.VLl89vQcdOOOeBnGif6', 'jani458@gmail.com', '2016.Leányfalu.Szarvas utca 3.', '06205987464', NULL, NULL, NULL, NULL),
(2, 'Nagy Ágnes', 'agika74', '$2y$10$4nz3VBD4mjepmRFw5.A2p.SkR3YIsasxCnRPAMDwgTV1T/ZuD0Lb.', 'agika74@freemail.hu', '2200.Monor.Radnóti Miklós utca 6.', '06705841258', NULL, NULL, NULL, NULL),
(3, 'Török Krisztián', 'krissz5', '$2y$10$fPo2jDBGFozldf1TG9U9eOfBHGOtyzTdHct4OtXJ90KKBPIuPZt/m', 'krissz5@citromail.hu', '2120.Dunakeszi.Puskás Ferenc utca 11.', '06304526587', NULL, NULL, NULL, NULL),
(4, 'Papp Krisztián', 'pappk', '$2y$10$LpYX73e7IOlgswDTHr6Ncuxyf1/Mnr6O62WphCevnaH68SLXcztD2', 'pappk@t-online.hu', '2112.Veresegyház.Pöltenberg Ernő utca 83.', '06206859874', NULL, NULL, NULL, NULL),
(5, 'Fekete Tamás', 'fekete23', '$2y$10$ObiibpYFcgIwc3z.mXel4e47jl54zs09PGoTFqEHKB0gkZWg8ABfW', 'fekete23@freemail.hu', '2220.Vecsés.Blaha Lujza utca 59.', '06705842569', NULL, NULL, NULL, NULL),
(6, 'Kovács János', 'kovijani', '$2y$10$KFSsZtCRU1ifytMqbd0Ncuxerph.OD0ZhVw.6SrPtnJ7FIYo0cNL6', 'kovijani@gmail.com', '2013.Pomáz.Pöltenberg Ernő utca 78.', '06206549874', NULL, NULL, NULL, NULL),
(7, 'Tóth Anna', 'ancsika', '$2y$10$UhFrotXMPYeKf/.JjItiR.VZ5RzIgtPHMLW/3.HzGSqHiFLSUzC2O', 'ancsika@gmail.com', '1111.Budapest.Budafoki út 32.', '06706584124', NULL, NULL, NULL, NULL),
(8, 'Antal Edit', 'aeditke', '$2y$10$dnFQCfKHjZK7nTpPDVZkcOKgKVK2wI5lnbWb1rddSPXzmzHF5Onhu', 'editke2@freemail.hu', '2000.Szentendre.Kassák Lajos utca 62.', '06706589521', NULL, NULL, NULL, NULL),
(9, 'Török Judit', 'torokj', '$2y$10$.0iq4QjdgkVsMyhDZFdQtuHN/CQ2N1E9j.N81kbn2N0UL49WTwahq', 'torokj@freemail.hu', '2112.Veresegyház.Radnóti Miklós utca 6.', '06305874125', NULL, NULL, NULL, NULL),
(10, 'Deák János', 'deakjani', '$2y$10$muYWFXv26d0jJA8AvyZrVO.s7UX0pG1PtQzagI9/JOm/WaKjmHaTu', 'deakjani@t-online.hu', '2119.Pécel.Jedlik Ányos utca 58.', '06305841987', NULL, NULL, NULL, NULL),
(11, 'Nagy Ágnes', 'agi1970', '$2y$10$RgUyTOG9qFeYhYdsg37rtOTXfIilz1Lf9kZM5QESRE8nXGnfGabNe', 'agi1970@gmail.com', '2200.Monor.Radnóti Miklós utca 6.', '06206587451', NULL, NULL, NULL, NULL),
(12, 'Bíró Tibor', 'btibike', '$2y$10$Lz7.E7xo4XyHma6tdczQuuQhwARH4EYENp5WVfLfgqeSHMkh2dhUa', 'btibike@gmail.com', '2030.Érd.Kandó Kálmán utca 88.', '06205874987', NULL, NULL, NULL, NULL),
(13, 'Hegedűs Viktória', 'ahegedus', '$2y$10$4MWfVQrm3TTVKujq.p3.rOLBQxXIzlZBLGXE1U3H01Ave1Y6f34cu', 'ahegedus@freemail.hu', '2230.Gyömrő.Pázmány Péter utca 49.', '06703259841', NULL, NULL, NULL, NULL),
(14, 'Molnár Mária', 'marcsi83', '$2y$10$VpGcnR/w60.uhoMtYXjoDe/HQF3Kl/lIX0nZefWUihO4hLQ5r94Ce', 'marcsi83@yahoo.com', '1183.Budapest.Úz utca 3.', '06206549874', NULL, NULL, NULL, NULL),
(15, 'Balogh Éva', 'evike99', '$2y$10$LoG72SFKfOGYl22qxXLLKucarpBiKFNFAfHMl.D2F6MZruvXmk6YO', 'evike99@yahoo.com', '2119.Pécel.Dobos István utca 28.', '06702581479', NULL, NULL, NULL, NULL),
(16, 'Nagy Edit', 'editnagy20', '$2y$10$t.butx9kw1u.YEUNOkYJVuLoAnOmdVZ1UP7rqrUSqHcNLN.OZtVKy', 'editnagy2002@gmail.com', '2000.Szentendre.Tóth Árpád utca 27.', '06305649871', NULL, NULL, NULL, NULL),
(17, 'Gál Andrea', 'galandaaa', '$2y$10$eQsJGz75febRYhNHh2X3fe2SVaTk6gBHoRKgE/E.6JVK63CHSphoa', 'galandaaa@gmail.com', '2230.Gyömrő.Karinthy Frigyes utca 13.', '06706532487', NULL, NULL, NULL, NULL),
(18, 'Fazekas Krisztina', 'afazekas', '$2y$10$Yr.Eo2UQrz/9D81b4EIKau8gHZqWGRzM0tMjjyGTgNuL4Pv.IimNC', 'afazekas@freemail.hu', '2600.Vác.Blaha Lujza utca 72.', '06203126847', NULL, NULL, NULL, NULL),
(19, 'Sándor András', 'sandora', '$2y$10$9Y0qa4np1nvzS9zA7kQ6JOP8ZfAyyRpI6Ufd73TU0y/1hp8Lwv9M2', 'sandora@freemail.hu', '1112.Budapest.Örkény István utca 3.', '06303508547', NULL, NULL, NULL, NULL),
(20, 'Szalai Mónika', 'mszalai', '$2y$10$qYk3bD.ktnop9QbY3WtjRu0W9eVcw9kAe7dVOzb4/6PhbbiH0kpuW', 'mszalai@gmail.com', '1039.Budapest.Berzsenyi Dániel utca 86.', '06309898521', NULL, NULL, NULL, NULL),
(21, 'Fazekas Lajos', 'lalika14', '$2y$10$rm8sZ8n1tALz3RD19F3b3.F76vKShCBJunru1QXt28TaEhX9Hm2.6', 'lalika14@t-online.hu', '1183.Budapest.Kosztolányi Dezső utca 87.', '06705557474', NULL, NULL, NULL, NULL),
(22, 'Lukács Erzsébet', 'lukbozsi', '$2y$10$Xrz9C4PieCNM/ZVK/lJJ7Ov.kB1w0UqroPmsVeUiH1ZjVIwMGB8bK', 'lukacsbozsi@t-online.hu', '1077.Budapest.Rejtő Jenő utca 23.', '06308574125', NULL, NULL, NULL, NULL),
(23, 'Sipos Mária', 'smarcsi6', '$2y$10$lW8hjHVjStpI9VqsvFs6UOqLSB6FxMjULFNgIgu0ZYGEeatfU0DB2', 'smarcsi6@citromail.hu', '1183.Budapest.Széchenyi István utca 70.', '06705412874', NULL, NULL, NULL, NULL),
(24, 'Lakatos Mihály', 'misilakat', '$2y$10$mwX7QS4S16eBlh4ZqwfZted6V6DKYppNEl27mmGlxws3DM5YXKXyi', 'misilakat@freemail.hu', '1164.Budapest.Hét vezér utca 6.', '06303216598', NULL, NULL, NULL, NULL),
(25, 'Fodor Szilvia', 'szilva1998', '$2y$10$dp76T.W4UBAYhI7Aat74U.WRnEcYVHXiBTjTrs0wLIZSXiGh8Lj8q', 'szilva1998@gmail.com', '1026.Budapest.Gábor Áron utca 4.', '06703258741', NULL, NULL, NULL, NULL),
(26, 'Nagy Eszter', 'nagyesztii', '$2y$10$9SeLAjf16abhKwVay6cxauwIl4rKIlcDpM6mpEWfYRkv8FPptXxLy', 'nagyeszti12@freemail.hu', '1105.Budapest.Gergely utca 23.', '06204512784', NULL, NULL, NULL, NULL),
(27, 'Molnár Mária', 'mmarika', '$2y$10$4V6S9sgstNHuAnbdI0FNLubaOapc4tctGo8cjlLleyBFxiaVAktfS', 'mmarika@citromail.hu', '1183.Budapest.Úz utca 3.', '06305468748', NULL, NULL, NULL, NULL),
(28, 'Kovács Tihamér', 'ktihi', '$2y$10$7yOfgk0maxW6A0h7e8glEeYtUV32B/HSpsXYMAqNtMMPSLmLUvsge', 'tihamer.kovacs@citromail.hu', '2016. Leányfalu, Dózsa György út 22.', '06304568172', NULL, NULL, NULL, NULL),
(29, 'Tóth Tibor', 'tibike66', '$2y$10$P5CI0VdJ/DW7vzLSsdeCp.O7MrPJxtYnCDCY/sfpCetiEZY1/rE/m', 'ttibor66@freemail.hu', '2016. Leányfalu, Szarvas utca 11.', '06303459856', NULL, NULL, NULL, NULL),
(30, 'Vass Tamara', 'tami2002', '$2y$10$eB/M1i4ErYCnyKs8t3oUL.1Oyuvbys2drvc4aXd3ws4/xyMwKBInK', 'tamara.vass2002@citromail.hu', '1188.Budapest,Ráday Gedeon utca 33.', '06709102376', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adatmodositas`
--
ALTER TABLE `adatmodositas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adatmodositas_user_id_foreign` (`user_id`);

--
-- Indexes for table `dolgozos`
--
ALTER TABLE `dolgozos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dolgozos_user_nev_unique` (`user_nev`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `foglalas`
--
ALTER TABLE `foglalas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foglalas_user_id_konyv_id_unique` (`user_id`,`konyv_id`),
  ADD KEY `foglalas_konyv_id_foreign` (`konyv_id`);

--
-- Indexes for table `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kolcsonzes_user_id_foreign` (`user_id`),
  ADD KEY `kolcsonzes_konyv_id_foreign` (`konyv_id`),
  ADD KEY `kolcsonzes_dolg_id_foreign` (`dolg_id`);

--
-- Indexes for table `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `konyv_cim_szerzo_unique` (`cim`,`szerzo`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_nev_unique` (`user_nev`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adatmodositas`
--
ALTER TABLE `adatmodositas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dolgozos`
--
ALTER TABLE `dolgozos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foglalas`
--
ALTER TABLE `foglalas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adatmodositas`
--
ALTER TABLE `adatmodositas`
  ADD CONSTRAINT `adatmodositas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `foglalas`
--
ALTER TABLE `foglalas`
  ADD CONSTRAINT `foglalas_konyv_id_foreign` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`),
  ADD CONSTRAINT `foglalas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD CONSTRAINT `kolcsonzes_dolg_id_foreign` FOREIGN KEY (`dolg_id`) REFERENCES `dolgozos` (`id`),
  ADD CONSTRAINT `kolcsonzes_konyv_id_foreign` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`),
  ADD CONSTRAINT `kolcsonzes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
