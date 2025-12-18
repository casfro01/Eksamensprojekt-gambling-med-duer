# Døde Duer - Lotteri Platform

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
- Se alle spillere og deres brætter
- Godkende indbetalinger
- Indtaste vindernumre
- Se spil- og betalingshistorik

## Status

**Nuværende version:** Frontend prototype med dummy data

### Færdige Features
- **Bruger System:**
  - Login/logout funktionalitet
  - Brugerpanel med sidebar navigation
  - Profilside med brugeroplysninger
  - Responsive design (desktop & mobil)

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
  - Se alle spillere og brætter
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
- **Password:** `Password`


## 🎮 Sådan Bruges Systemet

### Som Bruger:

1. **Log ind** med bruger credentials
2. **Vælg numre:**
   - Gå til "Nyt Bræt"
   - Vælg 5-8 numre
   - Vælg antal uger (1-10)
   - Køb spillebræt
3. **Indbetal penge:**
   - Gå til "Indbetaling"
   - Overfør på MobilePay til: 28 44 29 23
   - Indtast beløb og MobilePay transaktions-ID
4. **Se dine brætter:**
   - "Mine Brætter" viser aktive og afsluttede spil
   - Annuller fremtidige uger hvis nødvendigt
5. **Tjek transaktioner:**
   - Se status på dine indbetalinger (afventer/godkendt/afvist)

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

   - Sørge for at det ikke er muligt at afslutte et igangværende spil når man vil - som admin


     **Udviklet af:** [Casper, Mia, Lucas]  
**Sidste opdatering:** December 2025
