# Døde Duer - Lotteriplatform

Et moderne lotteri-system bygget med React, TypeScript og .NET backend.

## Om Projektet

Døde Duer er en webbaseret lotteri-platform hvor brugere kan:
- Vælge numre og købe spillebrætter
- Se deres aktive og tidligere spil
- Indbetale penge via MobilePay
- Se transaktionshistorik
- Følge vindere og spilhistorik

Administratorer kan:
- Oprette og administrere brugere
- Se alle spillere og deres plader
- Godkende indbetalinger
- Indtaste vindernumre
- Se spil- og betalingshistorik

## Status

**Nuværende version:** Frontend (beta-version)

### Færdige Features
- **Brugersystem:**
  - Login/logout funktionalitet
  - Brugerpanel med sidebar navigation
  - Profilside med brugeroplysninger
  - Responsive design (desktop & mobil)
  - Opdatering af bruger oplysninger (navn, email og mobilnummer)
  - Ændre password (semi)

- **Spillefunktioner:**
  - Nummervælger (vælg 5-8 numre fra 1-16)
  - Køb spillebræt for 1-10 uger
  - Se aktive og afsluttede brætter
  - Annuller fremtidige uger

- **Betalinger:**
  - Indbetal penge via MobilePay ID
  - Transaktionshistorik (pending/godkendt/afvist)
  - Validering af beløb og ID

- **Admin Panel:**
  - Opret nye brugere
  - Se alle spillere
  - Se alle plader for den nuværende uge
  - Godkend/afvis indbetalinger
  - Indtast vindernumre
  - Spilhistorik
  - Betalingshistorik
 
## Login til begge roller:

 ### Bruger Login
- **Email:** `Bruger@gmail.com`
- **Password:** `Password`

### Admin Login
- **Email:** `Admin@gmail.com`
- **Password:** `ErDetteEtSikkertPassword?`


## 🎮 Sådan Bruges Systemet

### Som Bruger:

1. **Log ind** med bruger credentials
2. **Vælg numre:**
   - Gå til "Ny Plade" 
   - Vælg 5-8 numre
   - Vælg antal uger (1-10)
   - Køb spillebræt
3. **Indbetal penge:**
   - Gå til "Indbetaling"
   - Overfør på MobilePay til: 28 44 29 23
   - Indtast beløb og MobilePay transaktions-ID
4. **Se dine brætter:**
   - "Mine Plader" viser aktive og afsluttede spil
   - Annuller fremtidige uger hvis nødvendigt
5. **Tjek transaktioner:**
   - Se status på dine indbetalinger (afventer/godkendt/afvist) i "Transaktionshistorik"

### Som Admin:

1. **Log ind** med admin credentials
2. **Administrer brugere:**
   - Opret nye brugere
   - Se liste over alle spillere
   - Aktiver/deaktiver brugere
3. **Godkend indbetalinger:**
   - Se afventende indbetalinger
   - Godkend eller afvis baseret på MobilePay verifikation
4. **Indtast vindernumre:**
   - Vælg 3 vindernumre
   - Gem for at afslutte ugens spil
5. **Se statistik:**
   - Spilhistorik viser tidligere spil
   - Betalingshistorik viser alle transaktioner

 ## Forbedringer:

   - Sørge for at det ikke er muligt at afslutte et igangværende spil når man vil - som admin.
   - Forbedring af ændring af password - dette kan kun gøre, lige nu, hvis du kender dit nuværende password - hvilket ikke er særlig godt, hvis man kommer til at glemme det.
   - Lave en reel knap som fører til login siden, da det nuværende godt kan virke forvirrende.
   - Ændre den måde som transaktionshistorikken er displayed på; den nuværende viser 00000000 som mobilepayid når man køber en plade; her kunne man ændre det til en enum kolonne i stedet / sætte den til null i databasen i stedet - da det så nemt ville kunne læses -> når man gør dette, så kan man f.eks. display overførsel hvis den har et mobileplayid og køb hvis man køber en plade osv.
   - (Kode) Lige nu er der nogle custom klasser til vores entities fra api'en - men de skal om-mappes i ui - da ui bruger en anden/sin egen entity (dog kunne det godt argumenteres at det sikre ui mod ændringer).
   - (Kode) Lige nu ligger der mange "use[noget].ts" i ui mappen, hvilket er lidt specielt, dog burde man flytte dem ud til hooks mappen i utils mappen, hvis nu man skal genbruge nogle af de fetchs som der er. Desuden, så kan disse filer også opdeles, da de indeholder normale fetch metoder/funktioner som klader på en api, disse kan også flyttes ud i en fil for sig; desuden bryder man en af SOLID principperne.
   - Derudover så kan Admin også selv navigere ind på deres bruger profil i søgebaren - dette burde man nok ikke kunne, eller så skal man gøre sådan at de kan - idk vi har diskuteret dette i lang tid, og vi har valgt at lade det ligge som det er.
   - (Kode) Desuden er der et par ting, som mangler ordenligt pagination - hvor alt hentes og web-appen sorterer/sideinddeler det.


## 📜 Environment, Configuration and Linting.

### Linting
Der bruges det standard linting systemt, esling. Herudover bruges en "custom" regel også; altså ingen use- state, effect, ref osv. i .tsx filer, dog er custom hooks undtaget. Dette er gjort for at holde business logic væk fra markup / ui - så man har en ren seperation.

### Configuration
For at køre applicationen skal man udfylde disse parameter i appsettings.json eller appsettings.Development.json filen (eller hvad man nu bruger).
#### For database forbindelse:
```
  "AppOptions": {
    "DbConnectionString" : "Din forbindelses streng"
  }
 ```
 Hvis man ønsker at oprette en lokal database, så er der lavet et lille shell-script ``localDB.sh`` som ligger i rodmappen. Den opretter en lokal database med docker, og den kan man så frit bruge. Hvis man bruger det script, som er angivet, så kan man frit også bruge ``appsettings.Development.json`` som allerede er konfigureret efter dette.
 *Desuden har den også allerede en jwt nøgle som man frit kan bruge*.
#### JWT
Dette skal også indsættes i appsettings.json eller appsettings.Development.json filen (eller hvad man nu bruger).
```
"JwtKey": "Din nøgle"
```
Her er et eksempel for hvordan den kan se ud (obs. den skal være minimum 320 bits lang (tror jeg; eller 520 idk)):
```
MTIzNDU2Nzg5MTAxMjM0NTY3ODkzNzEwMDk4NzY1NDM0NTY3ODk4NzY1NDM0NTY3MTIzNDU2Nzg5MDk4NzY1NDMyMzQ1Njc4OTA5ODc2NTQzMjEyMzQ1Njc4OTAyMzQ1Njc4OTg3NjU0NTY3NjU2Nzg5ODc2NTQzMjM0NTY3NjU0NTY0MzIyMzQ1Njc2NTQzMjM0NTY3ODk4NzY1NDMyMzQ1Njc4NjU0NTY3ODkwOTg3NjU0MzIyMTMyMzQ1Njc4OTg3NjU0NTY3ODkwOTg5MDk4NzY3NjU0MzQzMjEyMzQ1NDM0NTY3OA==
```


*Denne JWT nøgle bliver IKKE brugt af os - kun under udviklingsfasen - så du kan frit bruge den, hvis du vil.*



**Udviklet af:** [Casper, Mia, Lucas]  
**Sidste opdatering:** December 2025
