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
            $table->text('leiras')->nullable();
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
            "leiras" => "ANDRÉ CALVI új feladatot kap: a Kínai Kommunista Párt egyik 
            kulcsfiguráját kell elrabolnia, de fogalma sincs, hogy valójában ki áll 
            a megbízás hátterében. Eszébe sem jut, hogy a küldetés Kína és Amerika 
            csatájának tűzvonalába sodorhatja. A szálak Budapestre vezetnek, a magyar 
            miniszterelnök dolgozószobájába... Közben egy gyönyörű, de titokzatos 
            francia nővel is találkozik, és ez mindent felkavar! Államfők, elnökök, 
            milliárdosok, hazardőrök és az árnyékvilág harcosai - kitalált és a 
            híradásokból,jól ismert valós szereplők sora. FREI TAMÁS új politikai 
            akcióthrillere a közeljövőben játszódik. A szerzőtől megszokott feszes 
            ütemű, letehetetlen könyv kíméletlenül lerántja a leplet a színfalak 
            mögött zajló gátlástalan alkukról, az országok sorsát meghatározó emberi 
            gyarlóságról és az elhibázott politikai döntésekről.",
        ]);

        Konyv::create([
            "cim" => "Sátántangó",
            "szerzo" => "Krasznahorkai László",
            "kiadas_eve" => 2025,
            "oldalak" => 322,
            "db_szam" => 12,
            "kep" => "kepek/satantango.jpg",
            "osszdb_szam" => 12,
            "leiras" => "Valamikor a nyolcvanas évek elején, valahol Délkelet-Magyarországon, 
            egy egykor volt mezőgazdasági telep eleven romjain bontakozik ki a Sátántangó különleges, 
            mai napig páratlan koreográfiája. Ebbe a zárt és mozdulatlan világba érkezik meg 
            Irimiás, az oldalán Petrinával, hogy új reményekkel és illúziókkal kápráztassa el a telepen élő, 
            leginkább túlélni próbáló helyieket.Krasznahorkai László 1985-ben megjelent első regénye mára a 
            modern magyar és világirodalom klasszikusa lett. A Sátántangó a maga szociografikus gyökereivel 
            így lesz örök érvényű példázat az ember törékeny mivoltáról, a menekülésről és a maradásról, a 
            kegyelemről és a könyörületről, a közelgő katasztrófákról - olyan eredeti hangon és elbeszélői nézőpontból, 
            ami a mai napig lenyűgözi a regény olvasóját. A regény az elmúlt négy évtizedben mit sem vesztett aktualitásából: 
            ezt bizonyítják újabb és újabb hazai kiadásai, megfilmesítése, sorjázó külföldi fordításai és a 2025-ös Irodalmi Nobel-díj.",
        ]);

        Konyv::create([
            "cim" => "Szerintem",
            "szerzo" => "Náray Tamás",
            "kiadas_eve" => 2025,
            "oldalak" => 425,
            "db_szam" => 9,
            "kep" => "kepek/szerintem.jpg",
            "osszdb_szam" => 9,
            "leiras" => "Semmiért sem kell - úgy érzem - bocsánatot kérnem. Mert ez van. 
            Náray Tamás eddigi legőszintébb és legszemélyesebb könyvének nemes egyszerűséggel 
            saját létezése a tárgya. Önmaga elől nincs mit lepleznie; nincs, akinek vagy akiért 
            szépítsen, maszatoljon. Az Anyám szerint és az Apám szerint című nagy sikerű kötetek 
            után most levonja a saját tanulságait. Az életéből, a munkásságából, a származásából 
            és a neveltetéséből, az őt övező szeretetből és figyelemből, de nem kevésbé az őt 
            ért bántásokból és figyelmetlenségekből. A létezés felületességéből. Viharoktól a 
            megnyugvásig - fenntartva a belenyugvás képtelenségét. Zárójelbe téve sikert, megítélést, 
            érzelmeket és értékeket, ihletet és stúdiumokat, hazát és önkéntes száműzetést - a 
            legszemélyesebb dolgok sűrű sötétjéből indulva az általános igazságok derengése 
            felé. És amikor háborog és bánt, azt is mindig érted, sohasem ellened teszi.",
        ]);

        Konyv::create([
            "cim" => "Stonehenge, Az idő katedrálisa",
            "szerzo" => "Ken Folett",
            "kiadas_eve" => 2025,
            "oldalak" => 632,
            "db_szam" => 11,
            "kep" => "kepek/stonehenge.jpg",
            "osszdb_szam" => 11,
            "leiras" => "Seft, a bányászfiú a Nagy Síkságon járja útját a nyári hőségben, hogy ott legyen a szertartáson, mely az új év kezdetét jelzi. Azért tart az ünnepre, hogy elcserélje kovaköveit egyéb hasznos dolgokra, és megkeresse Neent, a pásztorlányt, akit szeret. Joia, Neen húga elbűvölve figyeli a nyárközepi szertartást. Minden vágya, hogy ő is a papnők egyike lehessen, és részt vehessen különleges rituális táncaikon, amelyeket egy nagy, fából készült kör körül járnak el. Ám a dombokon és az erdők lombjai alatt már feszültség gyülemlik. Aszály pusztítja a földeket, egyre nő a bizalmatlanság a pásztorok, a földművesek és az erdőlakók között - mígnem egy kegyetlen tett nyílt háborúhoz vezet... 
            Joia a békésebb jövő lehetőségét látja meg egy olyan, hatalmas kőkörökből álló szentélyben, amelyet a síkság megosztott népei együtt hoznak létre. Ennek az elképzelésnek a megvalósítása lassan élete céljává válik, melynek elérésében Seft nyújt neki segítő kezet. 
            A Stonehenge nem csupán történelmi regény - magával ragadó történetmesélés arról, hogy elhivatottsággal, kitartással, az összefogás erejével hogyan születik meg egy új civilizáció.",
        ]);

        Konyv::create([
            "cim" => "Az ég minden kékje",
            "szerzo" => "Mélissa Da Costa",
            "kiadas_eve" => 2025,
            "oldalak" => 654,
            "db_szam" => 11,
            "kep" => "kepek/egmindenkekje.jpg",
            "osszdb_szam" => 11,
            "leiras" => "A huszonhat éves Émile fiatalkori Alzheimer-kórban szenved. Az orvosok mindössze két évet jósolnak neki, ő pedig úgy dönt, lemond a kísérleti terápiáról és odahagyja a kórházat, hogy hátat fordítva az aggódó, előre gyászoló és folyamatosan együttérző családnak, barátoknak megszökjön, és egy lakóautóval utazgatva töltse el a hátralévő kevés idejét. 
            Felad egy őszinte és lényegretörő hirdetést, és legnagyobb meglepetésére akad is egy jelentkező. A fekete ruhában, hatalmas kalapban és még nagyobb hátizsákkal felbukkanó Joanne titokzatos és hallgatag, nem kérdez és nem beszél, mégis szinte magától értetődő természetességgel ül be az autóba és szegődik Émile mellé.",
        ]);

        Konyv::create([
            "cim" => "Dimenzió kapu",
            "szerzo" => "Zecharia Sitchin",
            "kiadas_eve" => 2004,
            "oldalak" => 350,
            "db_szam" => 9,
            "kep" => "kepek/dimenziokapu.jpg",
            "osszdb_szam" => 9,
            "leiras" => "A Földkrónikák sorozat azokon a feltevéseken nyugszik, hogy a mitológia nem más, mint őseink emlékezetének kincsestára. A Biblia szó szerint, történeti-tudományos dokumentumként olvasandó, és hogy az emberi civilizáció gyökerei az űrből érkeztek és szuperintelligens lények közösségében keresendők. A könyv a többi között rávilágít a piramisépítés kapcsán született elméletek tévedéseire, illetve arra, hogy a ma kutatói bizony néha szándékos megtévesztés áldozatai lettek. A kötet gazdagon illusztrált, ábrák és térképek segítik a megértést. A szerző a danikeni hagyományokat folytatja, de egyéni szempontjain keresztül új nézőpontból kaphatunk választ a már ismert kérdésekre.",
        ]);

        Konyv::create([
            "cim" => "Fehér mágia",
            "szerzo" => "Matthias Mala",
            "kiadas_eve" => 1998,
            "oldalak" => 134,
            "db_szam" => 8,
            "kep" => "kepek/fehermagia.jpg",
            "osszdb_szam" => 8,
            "leiras" => "Kedves Olvasó! Vannak-e olyan napjaid, amikor úgy érzed, minden összeesküdött ellened? Tapasztalod-e néha, hogy egyes helyek hangulata mázsás súlyként telepszik rád? Találkozol-e olyan emberekkel, akik mintha megcsapolnák életerőd? Ha e kérdések egyikére is igennel válaszolsz, könyvünk a Te számodra íródott. Matthias Mala, a Fehér mágia szerzője megtanít olyan eljárásokra, amelyek felvérteznek az ártó hatásokkal szemben. Nem, nincs szükség gyíkszívre, fekete macska májára! A fehér mágia effélékkel nem él. Hiszen ez a mágia szelíd eszközökkel, jótékonyan használja fel a természet titkos erőit, az események befolyásolása céljából.",
        ]);

        Konyv::create([
            "cim" => "Önmagad forrása",
            "szerzo" => "Lisa Lister",
            "kiadas_eve" => 2023,
            "oldalak" => 311,
            "db_szam" => 12,
            "kep" => "kepek/onmagadforrasa.jpg",
            "osszdb_szam" => 12,
            "leiras" => "Képes vagy arra, hogy elengedd magad, nyitottá válj az új befogadására? Hogy újonnan bízni tudj a megérzéseidben? Hogy emlékezz a benned rejlő gyógyító varázslatra?

Lisa Lister felébreszti a testtudatosságot, segít felelősséget vállalni saját fizikai, mentális, érzelmi és spirituális szükségleteidért, valamint hozzáférni az energiádhoz, a kreativitásodhoz, az egyedi frekvenciádhoz és a mágiádhoz, hogy képes legyél kiállni magadért és másokért a káosz, a bizonytalanság és az átmenet idején.",
        ]);

        Konyv::create([
            "cim" => "A kozmosz üzenete",
            "szerzo" => "Erich Von Däniken",
            "kiadas_eve" => 2025,
            "oldalak" => 192,
            "db_szam" => 5,
            "kep" => "kepek/kozmoszuzenete.jpg",
            "osszdb_szam" => 5,
            "leiras" => "Ha voltak csaták a világűrben, akkor ezeknek voltak győztesei és vesztesei. A győztesek háboríthatatlanul maradtak a bolygójukon, a legyőzötteknek azonban menekülniük kellett. Földünk vajon menekülési hely volt egy űrbéli csata legyőzöttei számára? Hogyan keletkezhettek az alagútrendszerek Ecuadorban és Peruban és vajon mikor üthetett a Homo Sapiens számára a „születés órája”? A moszkvai Paleontológiai Múzeumban egy bölénykoponya látható, amely a korai kőkorszakból származik. A koponya lemezén olyan luk van, amelyet csak lőfegyver képes előidézni. Talányos kérdések: kinek volt i.e. 8000 évvel lőfegyvere? Ezekre, valamint hasonló rejtélyes kérdésekre keresi a választ Eich von Däniken ebben a könyvében.",
        ]);

        Konyv::create([
            "cim" => "A háború művészete",
            "szerzo" => "Szun-Ce",
            "kiadas_eve" => 2024,
            "oldalak" => 192,
            "db_szam" => 9,
            "kep" => "kepek/haborumuveszete.jpg",
            "osszdb_szam" => 9,
            "leiras" => "Szun-ce műve nem csupán a klasszikus kínai műveltség egyik alapköve, hanem egyben a világ klasszikus hadtudományának egyik legkiemelkedőbb alkotása is. A mintegy ötezer írásjegyből álló mű érvényességét az évszázadok, évezredek sem koptatták el. Így a modern ember is hasznos kézikönyvként forgathatja, hogy megoldást találjon benne saját problémáira. A kötetben találhatunk még két másik, talán kevésbé ismert, ám nem kevésbé hasznos klasszikus kínai hadtudományi művet is.",
        ]);

        Konyv::create([
            "cim" => "Csak a baj",
            "szerzo" => "Rachel Gibson",
            "kiadas_eve" => 2017,
            "oldalak" => 318,
            "db_szam" => 8,
            "kep" => "kepek/csakabaj.jpg",
            "osszdb_szam" => 8,
            "leiras" => "Baj van! Chelsea Ross színészi pályafutása egy kudarc: a Csini hulla 1 típusú szerepekben nyújtott briliáns alakítása révén került a legközelebb ahhoz, hogy filmcsillag legyen. De az, hogy otthagyja Hollywoodot, és egy híres jégkorongozó személyi asszisztense lesz, talán élete leghülyébb húzása karrierfronton. Megint baj van! Mark Bressler, a sérült szupersztár dicső napjai véget értek. De az egykori élsportoló és fenegyerek ettől még akár civilizáltan is viselkedhetne a mélynövésű, rózsaszín-szőke hajú bombázóval, akit a Seattle Chinooks fogadott fel az ő személyi asszisztensének. Ha Chelsea-nek nem kellene olyan nagyon a pénz, hanyatt-homlok menekülne a világ legnagyobb baromarca elől. Nagy baj van! Mark minősíthetetlen modorát és borongós kedélyét Chelsea tudja kezelni: problémát csak a férfi bicepsze okoz, meg az a követ is megolvasztó, hiper-szuper teste! Amikor a fenegyerek kezd rámozdulni, Chelsea jól tudja: itt az ideje, hogy kizavarja a büntetőpadra... Bárcsak ellen tudna állni annak, amit Mark forgat a fejében! Amiből csak baj lehet...",
        ]);

        Konyv::create([
            "cim" => "Kapj el, ha tudsz",
            "szerzo" => "Frank W. Abagnale",
            "kiadas_eve" => 2003,
            "oldalak" => 266,
            "db_szam" => 8,
            "kep" => "kepek/kapjel.jpg",
            "osszdb_szam" => 8,
            "leiras" => "A világ legfiatalabb, legpofátlanabb szélhámosának elképesztő igaz kalandjai",
        ]);

        Konyv::create([
            "cim" => "A vak bérgyilkos",
            "szerzo" => "Margaret Atwood",
            "kiadas_eve" => 2003,
            "oldalak" => 564,
            "db_szam" => 10,
            "kep" => "kepek/vakbergyilkos.jpg",
            "osszdb_szam" => 10,
            "leiras" => "Családi titok, testvérféltékenység, politikai fondorlat és társadalmi feszültség, megannyi ígéret és árulás, veszteség és fájdalom, emlékezés és sóvárgás kavarog Margaret Atwood Booker-díjas regényében. 1945-ben Laura Chase titokzatos körülmények között hal meg. Baleset vagy öngyilkosság? - találgatják azóta is. Évekkel később nővére, az élete alkonyán járó Iris Chase Griffen által ismerjük meg gyerekkorukat, a család drámai veszteségeit és a Laurának tulajdonított regényt, a posztumusz kiadott és rejtélyes remekműként ünnepelt A vak bérgyilkost. Margaret Atwood a tőle megszokott bravúros stílusban szövi össze a különböző történetszálakat, hogy újra elvarázsoljon minket.",
        ]);

        Konyv::create([
            "cim" => "Csokonai, az újrakezdések költője",
            "szerzo" => "Debreczeni Attila",
            "kiadas_eve" => 1993,
            "oldalak" => 272,
            "db_szam" => 12,
            "kep" => "kepek/csokonaiujrakezdes.jpg",
            "osszdb_szam" => 12,
            "leiras" => "Az 1970-es évek első felében készült Csokonai-kismonográfiák, Julow Viktor és Vargha Balázs munkái óta több, új távlatokat nyitó dolgozat jelent meg a felvilágosodás nagy költőjének munkásságával kapcsolatban, s jelentősen előrehaladt összes műveinek kritikai kiadása is. Mindez mintegy kihívást jele...",
        ]);

        Konyv::create([
            "cim" => "Ez van",
            "szerzo" => "Vida Gusztáv",
            "kiadas_eve" => 2018,
            "oldalak" => 314,
            "db_szam" => 9,
            "kep" => "kepek/ezvan.jpg",
            "osszdb_szam" => 9,
            "leiras" => "Ez van... Vagyis, hogy volt. Mára még színtelenebbé vált a világ - a vadászatban is. Szerencsémre még elcsíptem azt az utolsó öt-hat évet, amikor csak az ment, akit igazán érdekelt. Vagy, akinek kellett valami. Hazajövünk, nappal lesz. Megyünk dolgozni, kommunikálunk, a család. Folynak az évek... Mennyi titkot hordozunk magunkban! Mert, majd' mindegyiknek nyoma van, hivatalosan. De ki tudja, hogy miként is volt valóján azon az éjszakán. Csak mi. Magunkban hordjuk. Elképedek tisztázva a régi szövegeket. Ez én voltam? Ötödét se vállalnám be már. Mások se. Változunk. A világ is. Denaturált lett. (Mint Afrika.) De még itt, az van. Azt mesélem... Nem viszem a sírba.",
        ]);

        Konyv::create([
            "cim" => "Winnetou kalandjai",
            "szerzo" => "Karl May",
            "kiadas_eve" => 1994,
            "oldalak" => 434,
            "db_szam" => 12,
            "kep" => "kepek/winnetou.jpg",
            "osszdb_szam" => 12,
            "leiras" => "A híres vadász, Old Shatterhand saját maga beszéli el, hogyan nyeri el a legnemesebb apacs, Winnetou barátságát. A történetnek komor hangulatot kölcsönöz a vadon rózsája, a gyönyörű indián lány, Nsocsi tragikus sorsa, értelmetlen halála. Megismerkedünk a Vadnyugat híres hőseivel: Old Death nyomkeresővel, Old Firehand trapperrel, majd találkozunk régi ismerőseinkkel: Sam Hawkens, Dick Stone és Will Parker vadászokkal. A komancsok között és Kaliforniában átélt sok érdekfeszítő élmény után a szerző - a legnemesebb törzsfőnök élete és halála tükrében - maradandó emléket állít a pusztulásra ítélt rézbőrű fajnak. A tragikusan végződő regénytrilógiát az apacs-hagyatékról szóló beszámoló zárja.",
        ]);

        Konyv::create([
            "cim" => "Válogatott mesék",
            "szerzo" => "Viktor Alekszandrovics Krilov",
            "kiadas_eve" => 1959,
            "oldalak" => 62,
            "db_szam" => 9,
            "kep" => "kepek/valogatottmesek.jpg",
            "osszdb_szam" => 9,
            "leiras" => " ",
        ]);

        Konyv::create([
            "cim" => "Pápaszemes Manolito",
            "szerzo" => "Elvira Lindo",
            "kiadas_eve" => 2010,
            "oldalak" => 134,
            "db_szam" => 10,
            "kep" => "kepek/papaszemmanolito.jpg",
            "osszdb_szam" => 10,
            "leiras" => "Nálunk, Carabanchelben, ha esetleg még nem mondtam volna, engem mindenki Pápaszemes Manolitóként ismer. Persze csak azok, akik ismernek. Akik nem ismernek, azt se tudják, hogy ötéves korom óta szemüveges vagyok.` `Én bírom, ha Pápaszemesnek hívnak. A sulimban, a &lt;Diego Velázquezben&gt; mindenkinek, aki egy kicsit is fontos, van beceneve. Mielőtt még lett volna becenevem, elég sokat sírtam. Ha valamelyik nagymenő belém kötött a szünetben, mindig az lett a vége, hogy négyszeműnek vagy pápaszemesnek csúfolt. Mióta viszont Pápaszemes Manolito vagyok, tiszta időpocsékolás engem csúfolni. Jó, hívhatnának mondjuk Nagyfejűnek is, de ez eddig még senkinek se jutott eszébe, én meg persze nem akarok ötleteket adni. Ugyanez történt a barátommal, Lapátfülű Lópezzel is. Mióta van beceneve, már senki sem csúfolja a füle miatt.",
        ]);

        Konyv::create([
            "cim" => "Betyár becsület",
            "szerzo" => "Cserni András",
            "kiadas_eve" => 2023,
            "oldalak" => 516,
            "db_szam" => 8,
            "kep" => "kepek/betyarbecsulet.jpg",
            "osszdb_szam" => 8,
            "leiras" => "Árnyak gyülekeznek Mistaria és az Evilág felett. Aggasztó események zajlanak. Sötét erők mozgolódnak. A megsebzett vad visszatámad talán?Patrikot ismét rémálmok gyötrik, s egyre idegesebb lesz, mikor Kristóf nem ad életjelet magáról. Márk és Jani segítségével nyomozni kezd, s döbbenten fedezik fel: legjobb barátjukat elrabolták. Hagyományos úton nem lehet tenni semmit, így a három fiú Mogyoró, Vándor, Geze, valamint egy bujkáló sámán, Harald segítségével felkerekednek az Avilágba, hogy megkeressék a titokzatos Hollós Embert, aki talán tudja, hol lehet Kristóf.Az Avilág nyugati felén elterülő Fort-hegységben egy ifjú betyár, Alex cselszövés áldozatává válik: egy rablógyilkosság első számú gyanúsítottja lesz, holott nem ő követte el. Vérdíjat tűznek ki a fejére, így menekülnie kell. Egy biztonságos hely marad számára: a Holló Királyság területén fekvő Ezüsterdő, a törvény elől menekülők mentsvára.",
        ]);

        Konyv::create([
            "cim" => "A szekrény",
            "szerzo" => "Nemes István",
            "kiadas_eve" => 1995,
            "oldalak" => 24,
            "db_szam" => 11,
            "kep" => "kepek/aszekreny.jpg",
            "osszdb_szam" => 11,
            "leiras" => "Ez a különleges leporelló olyan alakú, mint egy szép, régi 
            szekrény, és úgy lapozhatjuk, mintha egy szekrény két ajtaját nyitnánk ki. 
            A lapok visszafelé visznek az időben, és előtűnnek egymás után a szekrény 
            korábbi tulajdonosai holmijaikkal, amiket a polcokon, rekeszekben, akasztókon 
            tartottak. A könyv tehát egy tárgy kalandos története.",
        ]);

        Konyv::create([
            "cim" => "Nők könyve",
            "szerzo" => "OSHO",
            "kiadas_eve" => 2016,
            "oldalak" => 269,
            "db_szam" => 10,
            "kep" => "kepek/nokkonyve.jpg",
            "osszdb_szam" => 10,
            "leiras" => "A legtöbb dolog, amiben a férfi és a nő különböznek, csak viszonylagos. A különbségeket éppen hogy meg kellene becsülni, fenn kellene tartani, mert ezek teszik vonzóvá a két nemet egymás számára. Nem egymás elítélésére kellene használni őket. Én azt szeretném, ha a két nem egy szerves egységgé válna, megtartva közben önnön szabadságukat, mert a szeretet szabaddá tesz. És akkor egy szebb világot hozhatnánk létre. Az emberiség egyik fele most meg van fosztva attól a lehetőségtől, hogy ebben közreműködhessen, pedig ez a fél, a nő, nagyszerű adottságokkal rendelkezik ahhoz, hogy egy szebb világ jöhessen létre. Az ő közreműködésével egy gyönyörű paradicsom lehetne a világ...",
        ]);

        Konyv::create([
            "cim" => "Tanár úr kérem",
            "szerzo" => "Karinthy Frigyes",
            "kiadas_eve" => 2010,
            "oldalak" => 86,
            "db_szam" => 15,
            "kep" => "kepek/tanarurkerem.jpg",
            "osszdb_szam" => 15,
            "leiras" => "A tízéves gyermek Karinthy bölcs szemlélődéssel, érett humorral veszi tudomásul a felnőttek, a tanárok, sőt a többiek hibáit, erényeit is. Szívvel-lélekkel él az iskolában, az osztályban, s bár mulat mindenen, mégis nagyon komolyan, halálosan komolyan veszi az egészet. Ez derül ki a naplójából, amely igazolja a Tanár úr kéremnek, ennek az örökérvényű írásnak érzelmi keletkezését. Az osztály a legfőbb jó, soha annyit nem lehet nevetni, soha annyira nem lehet félni, mint ahogy azt az ember az osztályban tette. Az ember egy életen át nosztalgiával gondol vissza a hajdani örömökre, szorongásokra. S hogy mennyire hiteles élmény Karinthyé, bizonyítja az, hogy az emberek változnak, az iskolák, a diákok cserélődnek, de ez az élmény a ma gyereke, felnőttje számára ugyanolyan friss erővel hat, éppolyan aktuális, mintha mostanában történt volna meg, s éppen vele.",
        ]);

        Konyv::create([
            "cim" => "A kőszívű ember fiai",
            "szerzo" => "Jókai Mór",
            "kiadas_eve" => 2022,
            "oldalak" => 531,
            "db_szam" => 13,
            "kep" => "kepek/koszivuemberfiai.jpg",
            "osszdb_szam" => 13,
            "leiras" => "A kiegyezés után két évvel írta Jókai e regényt. Életének legfőbb élményforrását képező forradalom és szabadságharc mitológiai fenségű ábrázolását sikerült összeegyeztetnie a kor társadalmi életének fő ellentmondásait szerencsésen sűrítő családi bonyodalomrajzában. A kőszívű ember fiai műfajánál fogva a rossz bukását hirdeti. Az isteni igazság győzelmét. Azt, hogy a sors alakítható. Azt, hogy az ember jó, illetve azzá tehető. A szíve ugyan megkövülhet, de ha e férfi-princípiummal szemben a kő, azaz a föld szíve anyagilag meglágyul, még e kőszív is kiengesztelhető.",
        ]);

        Konyv::create([
            "cim" => "A Pál utcai fiúk",
            "szerzo" => "Molnár Ferenc",
            "kiadas_eve" => 2010,
            "oldalak" => 158,
            "db_szam" => 15,
            "kep" => "kepek/palutcaifiuk.jpg",
            "osszdb_szam" => 15,
            "leiras" => "A grund... A pesti gyereknek ez az alföldje, a rónája, a síksága. Ez jelenti számára a végtelenséget és a szabadságot. Egy darabka föld, melyet egyik oldalról düledező palánk határol, s melynek többi oldalain nagy házfalak merednek az ég felé. Most már a Pál utcai grundon is nagy, négyemeletes ház szomorkodik, tele lakóval, akik közül talán egy se tudja, hogy ez a darabka föld néhány szegény pesti kisdiáknak a fiatalságát jelentette.",
        ]);

        Konyv::create([
            "cim" => "Az ember tragédiája",
            "szerzo" => "Madách Imre",
            "kiadas_eve" => 2006,
            "oldalak" => 191,
            "db_szam" => 16,
            "kep" => "kepek/azembertragediaja.jpg",
            "osszdb_szam" => 16,
            "leiras" => "Csalóka mű Madách Tragédiája, mert a felszínen a cselekmény jól követhető: Lucifer pimaszsága, a rabszolga halála, Keplerné hűtlensége, az Eszkimó félelme. Az alapkérdés, a mélység is érthető: ha nem tudjuk, miért létezünk, akkor legalább küszködjünk derekasan. De a kettőt összefűző gondolatszövet már nehezen érthető, könnyen elsiklik fölötte olvasó is, rendező is. Mit mond pontosan az ironikus Lucifer, a hímsoviniszta Ádám, és végül az Úr, aki mellébeszél? Ezt kívánjuk kibogozni, az eddigi kiadásoknál jóval alaposabban. E célból Madách eredeti szövegével párhuzamosan, a szemközti könyvoldalon prózai fordítást adunk mai magyar nyelven.",
        ]);

        Konyv::create([
            "cim" => "Légy jó mindhalálig",
            "szerzo" => "Móricz Zsigmond",
            "kiadas_eve" => 2008,
            "oldalak" => 317,
            "db_szam" => 15,
            "kep" => "kepek/legyjomindhalalig.jpg",
            "osszdb_szam" => 15,
            "leiras" => "Nyilas Misi szorongó kiskamasz, aki nem találja a helyét a debreceni kollégium falai között. Szerencsétlen véletlenek folytán a felnőttek olykor kegyetlen világával is kénytelen idejekorán szembesülni. A nyakába szakadt felelősség súlyát addig-addig hordozza magában, míg végül rá kell jönnie: Én nem akarok debreceni diák lenni tovább! 
            Móricz Zsigmond társadalomkritikájával ugyan elsősorban a felnőtteket akarta megszólítani, pontos gyerekkarakterei és az egész könyvből áradó humanizmus miatt azonban máig az egyik legfontosabb magyar ifjúsági regényként olvassuk és szeretjük Misi történetét.",
        ]);

        Konyv::create([
            "cim" => "Tom Sawyer kalandjai",
            "szerzo" => "Mark Twain",
            "kiadas_eve" => 2011,
            "oldalak" => 238,
            "db_szam" => 10,
            "kep" => "kepek/tomsawyer.jpg",
            "osszdb_szam" => 10,
            "leiras" => "A Mark Twain néven világhírű íróvá lett Samuel Langhorne Clemens javarészt 
            saját gyermekkori élményei alapján írta meg legsikeresebb regényét, a Tom Sawyer kalandjait (1876). A címszereplőt három hajdani cimboráját eggyé gyúrva formázta meg, és Tom Sawyer - Huckleberry Finn-nel együtt - a világirodalom egyik legismertebb gyerekhőse lett, akivel azóta minden ifjú generáció szívesen azonosul, hiszen a legtöbb fiú - éljen bármely korban - szeretne kalóz, kincskereső, ártatlanokat megmentő hős, illetve a kedvesét megmentő hősszerelmes lenni. Szerb Antal a könyv szerzőjét a gyerekirodalom Shakespeare-jének nevezte (teljes joggal, hiszen Mark Twain e regénye valóban éppúgy kötelező olvasmány, mint az avoni hattyú drámái), és hozzátette: Tom Sawyer és barátja, a javíthatatlanul bohém Huckleberry Finn mindnyájunk életének része, akár Robinson vagy Gulliver, de sokkal melegebben, sokkal bensőségesebben, hiszen együtt voltunk velük gyerekek",
        ]);

        Konyv::create([
            "cim" => "Huckleberry Finn kalandjai",
            "szerzo" => "Mark Twain",
            "kiadas_eve" => 2011,
            "oldalak" => 157,
            "db_szam" => 11,
            "kep" => "kepek/huckleberryfinn.jpg",
            "osszdb_szam" => 11,
            "leiras" => "Fogtam a fejszét és bezúztam vele az ajtót... aztán fogtam a disznót, bevittem a szobába..., ott átvágtam a torkát a fejszével és ledobtam a földre, hadd vérezzen... Aztán egy ócska zsákot megraktam kővel..., végighurcoltam a fák közt, le a folyóig, és ott bedobtam a vízbe... Végre kitéptem egy csomót a hajamból, jól bevéreztem a fejszét, a hajfürtöt ráragasztottam és a fejszét a sarokba dobtam. A disznót meg a kabátomhoz szorítottam, hogy a vére ne csöpögjön, lecipeltem a ház alá és a folyóba süllyesztettem. Miféle merénylet készül itt? Végezheti-e jól, aki így kezdi? Mert így veszi kezdetét Huckleberry Finn kalandokban gazdag utazása a Mississippin - s hogy tragikus vagy szerencsés véget ér-e? Te is megtudod, ha e könyvet végigolvasod.",
        ]);

        Konyv::create([
            "cim" => "Egri csillagok",
            "szerzo" => "Gárdonyi Géza",
            "kiadas_eve" => 2006,
            "oldalak" => 612,
            "db_szam" => 13,
            "kep" => "kepek/egricsillagok.jpg",
            "osszdb_szam" => 13,
            "leiras" => "Aki már járt Egerben, tudhatja, hogy minden út a várba vezet. Ha a vaskos, meredek falak beszélni tudnának, török és magyar fegyverek csörgéséről, ágyúdörrenésekről – az 1552-es ostrom élethalálharcáról – regélhetnének. A néma kövek helyett megtette ezt a vár remetéje, Gárdonyi Géza, s halhatatlan művet alkotott. Két főalakjával, Bornemissza Gergellyel és Cecey Évával pár éves korukban találkozunk először, s nyomon követhetjük életük romantikus fordulatait: török fogságból szabadulást, lányszöktetést, rabszöktetési kísérletet. Már-már révbe ért hőseink Eger vár ostrománál találják újra szembe magukat gyerekkori ellenségükkel, a kegyetlen Jumurdzsákkal…",
        ]);

        Konyv::create([
            "cim" => "Nemo kapitány",
            "szerzo" => "Verne Gyula",
            "kiadas_eve" => 2009,
            "oldalak" => 455,
            "db_szam" => 10,
            "kep" => "kepek/nemokapitany.jpg",
            "osszdb_szam" => 10,
            "leiras" => "Egy óriási narvál veszélyezteti a hajókat a tengereken. Néhány bátor férfi ki akarja deríteni az igazságot, közben azonban olyan tapasztalatokra tesznek szert, amely egész életüket megváltoztatja...
            A Nemo kapitányban számos, meghökkentően valós leírással találkozunk a tengeri élővilágról, és olyan találmányokról olvashatunk, amelyek Verne idejében még nem is léteztek, vagy léteztek, csak az író képzeletében már továbbfejlesztette őket. Ilyen a regény elektromos tengeralattjárója vagy a búvárruha...",
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
