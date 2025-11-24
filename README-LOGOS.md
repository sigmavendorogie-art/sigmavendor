# Logo Setup Instructions

## Kako dodati logotipe sa Flaticon

1. **Preuzmi logotipe sa Flaticon**
   - Idite na: https://www.flaticon.com/search?word=company%20logo
   - Preuzmite logotipe koji **NISU** popularnih kompanija (Meta, Google, Apple, itd.)
   - Preuzmite barem 20 logotipa za demo

2. **Postavi logotipe u folder**
   - Folder: `public/images/company-logos/`
   - Imenuj ih: `logo-1.png`, `logo-2.png`, `logo-3.png`, itd.
   - Podržani formati: `.png`, `.jpg`, `.jpeg`, `.svg`

3. **Pokreni skriptu za dodelu**
   ```bash
   node scripts/assign-logos.js
   ```

4. **Gotovo!** 
   - Skripta će automatski detektovati sve logotipe
   - Nasumično će ih dodeliti svim agencijama
   - Ažuriraće `vendors.json` automatski

## Napomena
- Možeš koristiti bilo koji broj logotipa (najmanje 1)
- Ako imaš manje logotipa nego agencija, logotipi će se ponavljati
- Skripta automatski detektuje format fajlova

