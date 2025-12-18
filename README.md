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
 
**Login til begge roller:**

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

   **Forbedringer:**

   - Sørge for at det ikke er muligt at afslutte et igangværende spil når man vil - som admin.
   - Forbedring af ændring af password - dette kan kun gøre, lige nu, hvis du kender dit nuværende password - hvilket ikke er særlig godt, hvis man kommer til at glemme det.
   - Lave en reel knap som fører til login siden, da det nuværende godt kan virke forvirrende.
   - Ændre den måde som transaktionshistorikken er displayed på; den nuværende viser 00000000 som mobilepayid når man køber en plade; her kunne man ændre det til en enum kolonne i stedet / sætte den til null i databasen i stedet - da det så nemt ville kunne læses -> når man gør dette, så kan man f.eks. display overførsel hvis den har et mobileplayid og køb hvis man køber en plade osv.
   - (Kode) Lige nu er der nogle custom klasser til vores entities fra api'en - men de skal om-mappes i ui - da ui bruger en anden/sin egen entity (dog kunne det godt argumenteres at det sikre ui mod ændringer).
   - (Kode) Lige nu ligger der mange "use[noget].ts" i ui mappen, hvilket er lidt specielt, dog burde man flytte dem ud til hooks mappen i utils mappen, hvis nu man skal genbruge nogle af de fetchs som der er. Desuden, så kan disse filer også opdeles, da de indeholder normale fetch metoder/funktioner som klader på en api, disse kan også flyttes ud i en fil for sig; desuden bryder man en af SOLID principperne.
   - Derudover så kan Admin også selv navigere ind på deres bruger profil i søgebaren - dette burde man nok ikke kunne, eller så skal man gøre sådan at de kan - idk vi har diskuteret dette i lang tid, og vi har valgt at lade det ligge som det er.


     **Udviklet af:** [Casper, Mia, Lucas]  
**Sidste opdatering:** December 2025
