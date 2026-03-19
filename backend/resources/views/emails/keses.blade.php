<!DOCTYPE html>
<html>
<head>
    <title>Késési értesítő</title>
</head>
<body>
    <h1>Kedves {{ $kolcsonzes->user->nev }}!</h1>
    <p>Értesítjük, hogy a(z) <strong>{{ $kolcsonzes->konyv->cim }}</strong> című könyv kölcsönzési határideje ({{ $kolcsonzes->hatarido }}) lejárt.</p>
    <p>Kérjük, mielőbb hozza vissza a könyvtárba!</p>
    <p>Üdvözlettel,<br>Könyvtár csapata</p>
</body>
</html>