// shop.js - FULL CODE (Updated for Poster Packs integration, focusing only on Framed Posters, with Custom Product always on top)
document.addEventListener('DOMContentLoaded', () => {
    console.log("shop.js: DOMContentLoaded fired. Initializing shop (Framed Posters) page.");

    // IMPORTANT: allProducts is LOCALIZED to this file, containing ONLY Framed Posters
    const allProducts = [
        // --- CUSTOM FRAMED POSTER (TOP PRODUCT) ---
        { id: 'fp_custom', name: "CUSTOM FRAMED POSTER", image: "images/frame_custom.jpg", category: "Framed Poster", subcategory: "Custom", basePrice: 250, isCustomizable: true },

        // Framed Posters (expanded with more examples for different subcategories)
        { id: 'F1', name: "Pulp Fiction", image: "images/M1.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F2', name: "Fight Club1", image: "images/M2.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F4', name: "Fight Club2", image: "images/M3.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F5', name: "Al HARIF", image: "images/M4.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F6', name: "SICKO SICKO", image: "images/M5.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F7', name: "MA WRA2 AL TABI3A", image: "images/M6.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F8', name: "SCARFACE1", image: "images/M7.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F9', name: "SCARFACE2", image: "images/M8.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F10',name: "INTERSTELLAR1", image: "images/M9.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F11',name: "INTERSTELLAR2", image: "images/M10.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F12',name: "INTERSTELLAR3", image: "images/M11.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F13',name: "INTERSTELLAR4", image: "images/M12.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F14',name: "TAXI DRIVER 1", image: "images/M13.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F15',name: "TAXI DRIVER 2", image: "images/M14.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F16',name: "TAXI DRIVER 3", image: "images/M15.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F17',name: "SHUTTER ISLAND 1", image: "images/M16.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F18',name: "SHUTTER ISLAND 2", image: "images/M17.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F19',name: "SHUTTER ISLAND 3", image: "images/M18.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F20',name: "LIGHTHOUSE 1", image: "images/M19.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F21',name: "LIGHTHOUSE 2", image: "images/M20.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F22',name: "BLADE RUNNER 1", image: "images/M21.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F23',name: "BLADE RUNNER 2", image: "images/M22.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F24',name: "THE IRISHMAN 1", image: "images/M23.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F25',name: "THE IRISH MAN 2", image: "images/M24.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F26',name: "NO COUNTRY FOR OLD MEN 1", image: "images/M25.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F27',name: "NO COUNTRY FOR OLD MEN 2", image: "images/M26.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F28',name: "12 ANGRY MEN", image: "images/M27.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F29',name: "INCEPTION 1", image: "images/M28.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F30',name: "INCEPTION 2", image: "images/M28.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F31',name: "MATRIX 1", image: "images/M30.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F32',name: "MATRIX 2", image: "images/M31.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F33',name: "THE SHINING 1", image: "images/M32.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F34',name: "THE SHINING 2", image: "images/M33.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F35',name: "THE PRESTIGE", image: "images/M34.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F36',name: "DJANGO", image: "images/M35.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F37',name: "THE WOLF OF WALL STREET 1", image: "images/M36.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F38',name: "THE WOLF OF WALL STREET 2", image: "images/M37.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F39',name: "ONCE UPON A TIME IN HOLLYWOOD", image: "images/M38.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F40',name: "SEVEN 1", image: "images/M39.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F41',name: "SEVEN 2", image: "images/M40.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F42',name: "WHIPLASH 1", image: "images/M41.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F43',name: "WHIPLASH 2", image: "images/M42.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F44',name: "THE DARK KNIGHT 1", image: "images/M43.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F45',name: "THE DARK KNIGHT 2", image: "images/M44.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F46',name: "AMERICAN PSYCHO 1", image: "images/M45.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F47',name: "AMERICAN PSYCHO 2", image: "images/M46.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F48',name: "GOODFELLAS 1", image: "images/M47.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F49',name: "GOODFELLAS 2", image: "images/M48.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F50',name: "THE GODFATHER 1", image: "images/M49.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F51',name: "THE GODFATHER 2", image: "images/M50.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F52',name: "INVINCIBLE", image: "images/M51.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F53',name: "THE WALKING DEAD", image: "images/M52.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F54',name: "MR ROBOT 1", image: "images/M53.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F55',name: "MR ROBOT 2", image: "images/M54.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F56',name: "THE BOYS", image: "images/M55.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F57',name: "BOJACK HORSEMAN 1", image: "images/M56.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F58',name: "BOJACK HORSEMAN 2", image: "images/M57.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F59',name: "PRISONBREAK", image: "images/M58.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F60',name: "GAME OF THRONES 1", image: "images/M59.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F61',name: "GAME OF THRONES 2", image: "images/M60.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F62',name: "STRANGER THINGS", image: "images/M61.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F63',name: "SOPRANOS 1", image: "images/M62.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F64',name: "SOPRANOS 2", image: "images/M63.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F65',name: "YOU 1", image: "images/M64.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F66',name: "YOU 2", image: "images/M65.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F67',name: "DEXTER 1", image: "images/M66.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F68',name: "DEXTER 2", image: "images/M67.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id:'F69',name: "BREAKING BAD 1", image: "images/M68.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F70',name: "BREAKING BAD 2", image: "images/M69.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F71',name: "BETTER CALL SAUL 1", image: "images/M70.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F3',name: "BETTER CALL SAUL 2", image: "images/M71.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F72',name: "SHAMS ELZNATY", image: "images/M72.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },
        { id: 'F73',name: "TERRIFIER", image: "images/M73.jpg", category: "Framed Poster", subcategory: "Movies & Series", basePrice: 250 },

         { id: 'FC1',name: "PORSCHE 911 GT3 RS 1", image: "images/C1.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC2',name: "MERCEDES AMG GT", image: "images/C2.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC3',name: "PORSHCE 911 GT3 RS 2", image: "images/C3.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC4',name: "BMW M4 CL", image: "images/C4.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC5',name: "FERRARI F40 1987", image: "images/C5.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC6',name: "MAZDA RX-7", image: "images/C6.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC7',name: "E30 BMW M3 1", image: "images/C7.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC8',name: "PORSCHE 911 GT3 RS 3", image: "images/C8.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC9',name: "PORSCHE 911 GT3 RS 4", image: "images/C9.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC10',name: "TOYOTA AE86", image: "images/C10.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC11',name: "PORSCHE 911 GT3 RS 5", image: "images/C11.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC12',name: "PORSCHE BRABUS 911", image: "images/C12.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC13',name: "MACLAREN F1 GTR", image: "images/C13.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC14',name: "E30 BMW M3 2", image: "images/C14.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC15',name: "PORSCHE 918", image: "images/C15.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC16',name: "MCLAREN P1 GTR 1", image: "images/C16.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC17',name: "MCLAREN P1 GTR 2", image: "images/C17.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC18',name: "BMW M8", image: "images/C18.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC19',name: "COUNTACH LAMBO", image: "images/C19.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC20',name: "SHELBY GT500 1967", image: "images/C20.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC21',name: "BMW CAR", image: "images/C21.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC22',name: "TOYOTA SUPRA MK4", image: "images/C22.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC23',name: "NISSAN SKYLINE", image: "images/C23.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC24',name: "PORSCHE 911 GT3 RS 6", image: "images/C24.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC25',name: "BMW E30 M3 3", image: "images/C25.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },
         { id: 'FC26',name: "MCLAREN 7207", image: "images/C26.jpg", category: "Framed Poster", subcategory: "Cars", basePrice: 250 },

        { id: 'FR1',name: "TV GIRL 1", image: "images/R1.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR2',name: "TV GIRL 2", image: "images/R2.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR3',name: "EMINEM 1", image: "images/R3.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR4',name: "EMINEM 2", image: "images/R4.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR5',name: "SZA 1", image: "images/R5.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR6',name: "CAIROKEE 1", image: "images/R6.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR7',name: "CAIROKEE 2", image: "images/R7.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR8',name: "SZA 2", image: "images/R8.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR9',name: "KENDRICK LAMAR 1", image: "images/R9.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR10',name: "KENDRICK LAMAR 2", image: "images/R10.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR11',name: "DRAKE 1", image: "images/R11.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR12',name: "THE WEEKEND 1", image: "images/R12.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR13',name: "THE WEEKEND 2", image: "images/R13.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR14',name: "DRAKE 2", image: "images/R14.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR15',name: "ADELE 1", image: "images/R15.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR16',name: "ADELE 2", image: "images/R16.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR17',name: "SELENA GOMEZ 1", image: "images/R17.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR18',name: "SELENA GOMEZ 2", image: "images/R18.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR19',name: "LANA DEL RAY 1", image: "images/R19.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR20',name: "LANA DEL RAY 2", image: "images/R20.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR21',name: "MICHEAL JACKSON", image: "images/R21.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR22',name: "BILLIE EILLISH1", image: "images/R22.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR23',name: "BILLIE EILLISH 2", image: "images/R23.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR24',name: "FAIROUZ", image: "images/R24.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR25',name: "TRAVIS SCOTT 1", image: "images/R25.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR26',name: "TRAVIS SCOTT 2", image: "images/R26.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR27',name: "2 PAC", image: "images/R27.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR28',name: "ABD ALHELIM", image: "images/R28.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR29',name: "AARCTIC MONKEYS", image: "images/R29.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },
        { id: 'FR30',name: "OM KALTHOUM", image: "images/R30.jpg", category: "Framed Poster", subcategory: "Musicians", basePrice: 250 },

        { id: 'FF1',name: "KYLIAN MBAPPE 1", image: "images/F1.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF2',name: "MESSI 1", image: "images/F2.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF3',name: "CR7 1", image: "images/F3.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF4',name: "CR7 2", image: "images/F4.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF5',name: "CR7 3", image: "images/F5.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF6',name: "REAL MADRID", image: "images/F6.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF7',name: "KYLIAN MBAPPE 2", image: "images/F7.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF8',name: "BARCELONA", image: "images/F8.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF9',name: "LAMINE YAMAL", image: "images/F9.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF10',name: "MESSI 1", image: "images/F10.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF11',name: "RONALDINHO", image: "images/F11.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF12',name: "MESSI 1", image: "images/F12.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF13',name: "NEYMAR", image: "images/F13.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF14',name: "MANCHESTER UNITED", image: "images/F14.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF15',name: "ZIDAN", image: "images/F15.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF16',name: "CR7 4", image: "images/F16.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF17',name: "CR7 5", image: "images/F17.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF18',name: "PALMAR 1", image: "images/F18.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF19',name: "PIRLO", image: "images/F19.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF20',name: "PALMAR 2", image: "images/F20.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF21',name: "CR7 6", image: "images/F21.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },
        { id: 'FF22',name: "KYLIAN MBAPPE 3", image: "images/F22.jpg", category: "Framed Poster", subcategory: "Quotes", basePrice: 250 },

        { id: 'FQ1',name: "QUOTE 1", image: "images/Q1.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ2',name: "QUOTE 2", image: "images/Q2.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ3',name: "QUOTE 3", image: "images/Q3.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ4',name: "QUOTE 4", image: "images/Q4.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ5',name: "QUOTE 5", image: "images/Q5.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ6',name: "QUOTE6", image: "images/Q6.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ7',name: "QUOTE 7", image: "images/Q7.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ8',name: "QUOTE 8", image: "images/Q8.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ9',name: "QUOTE9", image: "images/Q9.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ10',name: "QUOTE 10", image: "images/Q10.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ11',name: "QUOTE 11", image: "images/Q11.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ12',name: "QUOTE 12", image: "images/Q12.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ13',name: "SATURN", image: "images/Q13.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ14',name: "MIKE TYSON", image: "images/Q14.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ15',name: "MIKE TYSON 2", image: "images/Q15.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ16',name: "ILIA TOPURIA", image: "images/Q16.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ17',name: "ART 1", image: "images/Q17.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ18',name: "ROME", image: "images/Q18.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ19',name: "PARIS", image: "images/Q19.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ20',name: "8 BALL", image: "images/Q20.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ21',name: "NIKE 1", image: "images/Q21.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ22',name: "NIKE 2", image: "images/Q22.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ23',name: "8 BALL X STUSSY", image: "images/Q23.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ24',name: "QUOTE 13", image: "images/Q24.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ25',name: "ART 2", image: "images/Q25.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ26',name: "ART 3", image: "images/Q26.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ27',name: "COASTAAL LIFE", image: "images/Q27.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
        { id: 'FQ28',name: "MOHAMED ALI", image: "images/Q28.jpg", category: "Framed Poster", subcategory: "Other", basePrice: 250 },
    ];


    // Sort initially with custom product on top
    const initialProductsDataFiltered = allProducts
        .filter(p => p.category === "Framed Poster")
        .sort((a, b) => (b.isCustomizable || false) - (a.isCustomizable || false));

    let currentFilteredProducts = [...initialProductsDataFiltered]; // This will hold the products displayed after filtering/sorting

    const container = document.getElementById("productsContainer");
    const productCountSpan = document.getElementById("productCount");
    const notificationContainer = document.getElementById('notificationContainer'); // Get the global notification container

    const filterIcon = document.getElementById('filterIcon');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    const minPriceOutput = document.getElementById('minPrice');
    const maxPriceOutput = document.getElementById('maxPrice');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Subcategory filter elements
    const subMoviesSeriesCheckbox = document.getElementById('subMoviesSeries');
    const subCarsCheckbox = document.getElementById('subCars');
    const subMusiciansCheckbox = document.getElementById('subMusicians');
    const subQuotesCheckbox = document.getElementById('subQuotes'); // Corresponds to 'Football'
    const subOtherFramedCheckbox = document.getElementById('subOtherFramed'); // Corresponds to 'Quotes & Other'
    const subCustomFramedCheckbox = document.getElementById('subCustomFramed');

    const sortLowToHighRadio = document.getElementById('sortLowToHigh');
    const sortHighToLowRadio = document.getElementById('sortHighToLow');
    const sortDefaultRadio = document.getElementById('sortDefault');

    let currentMinPrice = 0;
    let currentMaxPrice = parseInt(priceRangeSlider ? priceRangeSlider.max : 500);
    // selectedSubcategories will be populated by filterProducts() based on UI state
    let currentSortOrder = 'default';

    const CUSTOM_DESIGN_FEE = 20; // Reverted to 20 L.E.

    if (!container || !productCountSpan || !notificationContainer) { // Check for notificationContainer
        console.error("shop.js: CRITICAL ERROR: Essential DOM elements not found. Page might not render correctly.");
        return;
    }
    console.log("shop.js: All major DOM elements identified.");


    /**
     * Helper function to get the correct base price of a product.
     */
    function getProductBasePrice(product) {
        return product.category === "Framed Poster" ? product.basePrice : product.price;
    }

    /**
     * Renders products to the page.
     */
    function renderProducts(productsToRender) {
        console.log(`renderProducts() called. Rendering ${productsToRender.length} products.`);
        container.innerHTML = '';
        if (productsToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 50px;">No products found matching your criteria.</p>';
        } else {
            productsToRender.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                let priceHtml = '';
                // Only Framed Posters have size options on this page
                if (product.category === "Framed Poster") {
                    priceHtml = `
                        <label class="price">Size:
                            <select id="size-${product.id}">
                                <option value="${product.basePrice}">Small - ${product.basePrice} L.E</option>
                                <option value="${product.basePrice + 50}">Medium - ${product.basePrice + 50} L.E</option>
                            </select>
                        </label>
                    `;
                } else {
                    // This block should theoretically not be hit if filter is correct, but safe fallback
                    priceHtml = `<p class="price">${product.price} L.E</p>`;
                }

                const customDesignHtml = product.isCustomizable ? `
                    <div class="custom-design-option">
                        <label>
                            <input type="checkbox" id="custom-${product.id}" class="custom-design-checkbox">
                            Custom Design (+${CUSTOM_DESIGN_FEE} L.E)
                        </label>
                        <div class="custom-image-upload" id="upload-section-${product.id}" style="display:none;">
                            <input type="file" id="image-${product.id}" accept="image/*">
                            <p class="custom-design-info">
                                After ordering, please send your image via WhatsApp to **01285272577**, including your **full name from the order** and **shipment number**.
                            </p>
                        </div>
                    </div>
                ` : '';

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
                    <div class="product-name">${product.name}</div>
                    ${priceHtml}
                    <label class="quantity-label">Qty:
                        <input type="number" min="1" value="1" id="qty-${product.id}">
                    </label>
                    ${customDesignHtml}
                    <button class="add-btn" data-id="${product.id}">Add to Basket</button>
                `;
                container.appendChild(productDiv);

                if (product.isCustomizable) {
                    const customCheckbox = productDiv.querySelector(`#custom-${product.id}`);
                    const uploadSection = productDiv.querySelector(`#upload-section-${product.id}`);
                    const imageInput = productDiv.querySelector(`#image-${product.id}`);
                    const addBtn = productDiv.querySelector('.add-btn');

                    if (customCheckbox && uploadSection && imageInput && addBtn) {
                        addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;

                        customCheckbox.addEventListener('change', () => {
                            uploadSection.style.display = customCheckbox.checked ? 'block' : 'none';
                            addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;
                            console.log(`Custom checkbox for ${product.name} changed to: ${customCheckbox.checked}. Button disabled: ${addBtn.disabled}`);
                        });

                        imageInput.addEventListener('change', () => {
                            addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;
                            console.log(`Image input for ${product.name} changed. File selected: ${imageInput.files.length > 0}. Button disabled: ${addBtn.disabled}`);
                        });
                    }
                }
            });
        }
        updateProductCount(productsToRender.length);
    }

    /**
     * Updates the displayed number of products.
     */
    function updateProductCount(count) {
        if (productCountSpan) {
            productCountSpan.innerText = `${count} Products`;
            console.log(`Product count updated to: ${count}`);
        }
    }

    /**
     * Filters and sorts products based on current filter criteria.
     */
    function filterProducts() {
        console.log("filterProducts() called.");

        // Read current filter states from UI (checkboxes, slider)
        currentMinPrice = 0;
        currentMaxPrice = parseInt(priceRangeSlider.value);
        console.log(`Filter price range: ${currentMinPrice} to ${currentMaxPrice} L.E.`);

        // Read selected subcategories from filter checkboxes
        selectedSubcategories = []; // Reset selected subcategories
        if (subMoviesSeriesCheckbox && subMoviesSeriesCheckbox.checked) selectedSubcategories.push('Movies & Series');
        if (subCarsCheckbox && subCarsCheckbox.checked) selectedSubcategories.push('Cars');
        if (subMusiciansCheckbox && subMusiciansCheckbox.checked) selectedSubcategories.push('Musicians');
        if (subQuotesCheckbox) { // Check for existence before accessing
            if (subQuotesCheckbox.checked) selectedSubcategories.push('Quotes'); // Corresponds to 'Football'
        }
        if (subOtherFramedCheckbox && subOtherFramedCheckbox.checked) selectedSubcategories.push('Other');
        if (subCustomFramedCheckbox && subCustomFramedCheckbox.checked) selectedSubcategories.push('Custom');


        if (selectedSubcategories.length === 0 && (subMoviesSeriesCheckbox || subCarsCheckbox || subMusiciansCheckbox || subQuotesCheckbox || subOtherFramedCheckbox || subCustomFramedCheckbox)) {
             console.warn("DEBUG: No subcategories selected FROM UI. This might result in 0 products for subcategory filter.");
        }
        console.log("DEBUG: Selected subcategories for filtering:", selectedSubcategories);


        // Determine current sort order
        if (sortLowToHighRadio && sortLowToHighRadio.checked) {
            currentSortOrder = 'lowToHigh';
        } else if (sortHighToLowRadio && sortHighToLowRadio.checked) {
            currentSortOrder = 'highToLow';
        } else {
            currentSortOrder = 'default';
        }
        console.log("Current sort order:", currentSortOrder);


        // Apply filtering
        let filtered = initialProductsDataFiltered.filter(product => { // Use initialProductsDataFiltered as base
            const productPrice = getProductBasePrice(product);
            const matchesPrice = productPrice >= currentMinPrice && productPrice <= currentMaxPrice;
            const matchesSubcategory = selectedSubcategories.includes(product.subcategory);

            return matchesPrice && matchesSubcategory;
        });

        console.log(`After initial filtering (price & subcategory): ${filtered.length} products.`);


        // Apply sorting: Custom product always first
        filtered.sort((a, b) => {
            if (a.isCustomizable && !b.isCustomizable) return -1; // Custom comes before non-custom
            if (!a.isCustomizable && b.isCustomizable) return 1; // Non-custom comes after custom

            // If both are custom or both are not custom, apply selected sort order
            if (currentSortOrder === 'lowToHigh') {
                return a.basePrice - b.basePrice;
            } else if (currentSortOrder === 'highToLow') {
                return b.basePrice - a.basePrice;
            } else {
                // Default sort (original order, but keeping custom on top)
                return initialProductsDataFiltered.indexOf(a) - initialProductsDataFiltered.indexOf(b);
            }
        });


        currentFilteredProducts = filtered;
        renderProducts(currentFilteredProducts);
        console.log("filterProducts() finished. renderProducts() called.");
    }

    /**
     * Resets all filters to their default state.
     */
    function clearFilters() {
        console.log("clearFilters() called. Resetting filter state.");

        // Reset Price Range Slider to max and update state
        if (priceRangeSlider) {
            priceRangeSlider.value = priceRangeSlider.max;
            currentMaxPrice = parseInt(priceRangeSlider.max);
            minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
            maxPriceOutput.innerText = `${priceRangeSlider.max} L.E`;
            console.log("Price slider reset to max.");
        }

        // Reset Subcategory Checkboxes to all checked
        if (subMoviesSeriesCheckbox) subMoviesSeriesCheckbox.checked = true;
        if (subCarsCheckbox) subCarsCheckbox.checked = true;
        if (subMusiciansCheckbox) subMusiciansCheckbox.checked = true;
        if (subQuotesCheckbox) subQuotesCheckbox.checked = true;
        if (subOtherFramedCheckbox) subOtherFramedCheckbox.checked = true;
        if (subCustomFramedCheckbox) subCustomFramedCheckbox.checked = true;
        console.log("Subcategory checkboxes reset to all checked.");


        // Reset Sort Order to Default
        if (sortDefaultRadio) sortDefaultRadio.checked = true;
        currentSortOrder = 'default';
        console.log("Sort order reset to 'default'.");

        filterProducts(); // Re-apply filters with cleared state
        console.log("filterProducts() called from clearFilters().");
    }

    // --- Add to Basket Event Listener ---
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;
        if (e.target.disabled) {
            console.log("Add to Basket button is disabled. Preventing action.");
            const productId = e.target.getAttribute('data-id');
            const product = initialProductsDataFiltered.find(p => p.id === productId); // Find in filtered list
            if (product && product.isCustomizable) {
                const customCheckbox = document.getElementById(`custom-${productId}`);
                if (customCheckbox && !customCheckbox.checked) {
                    window.showNotification('You must select "Custom Design" for this product.', 'warning');
                } else {
                    window.showNotification('Please select your custom image file first.', 'warning');
                }
            } else {
                 window.showNotification('Item cannot be added to cart.', 'warning');
            }
            return;
        }
        console.log("Add to Basket button CLICKED!");

        const productId = e.target.getAttribute('data-id');
        const product = initialProductsDataFiltered.find(p => p.id === productId); // Find in filtered list

        if (!product) {
            console.error("shop.js: Product not found in initialProductsDataFiltered for ID:", productId);
            return;
        }

        const sizeSelect = document.getElementById(`size-${productId}`);
        // For Framed Posters, size is the selected option's value (which is its price)
        const selectedSizeValue = sizeSelect ? sizeSelect.value : product.basePrice.toString(); // Fallback
        const sizeText = sizeSelect ? sizeSelect.options[sizeSelect.selectedIndex].text : 'N/A'; // e.g. "Small - 250 L.E"

        const qtyInput = document.getElementById(`qty-${productId}`);
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;

        let isCustomDesign = false;
        let customImageFileName = 'N/A';

        if (product.isCustomizable) {
            const customCheckbox = document.getElementById(`custom-${productId}`);
            isCustomDesign = customCheckbox ? customCheckbox.checked : false;

            if (isCustomDesign) {
                const imageInput = document.getElementById(`image-${productId}`);
                customImageFileName = (imageInput && imageInput.files.length > 0) ?
                                      imageInput.files[0].name : 'Image not provided on order, client must send via WhatsApp.';
            }
        }

        let pricePerUnit = parseInt(selectedSizeValue); // Price is based on selected size value
        if (isCustomDesign) { // Add fee only if custom option selected for a customizable product
            pricePerUnit += CUSTOM_DESIGN_FEE;
        }

        const totalItemPrice = pricePerUnit * qty;

        let basket = window.basket;

        const existingIndex = basket.findIndex(item =>
            item.id === product.id &&
            item.size === selectedSizeValue && // Include size in uniqueness check for Framed Posters
            item.isCustomDesign === isCustomDesign &&
            item.category === "Framed Poster"
        );

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
            console.log(`Updated existing item in basket: ${product.name}. New Qty: ${basket[existingIndex].qty}`);
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                image: product.image,
                size: sizeText, // Store the descriptive size text
                originalPrice: product.basePrice, // Store original base price for custom fee calculation in basket display
                price: pricePerUnit, // This is the final price per unit including custom fee and size
                qty: qty,
                total: totalItemPrice,
                category: "Framed Poster",
                isCustomDesign: isCustomDesign,
                customImageFileName: customImageFileName,
                subcategory: product.subcategory // Pass subcategory to basket item
            });
            console.log(`Added new item to basket: ${product.name}.`);
        }

        window.basket = basket;
        window.updateBasketDisplay();
        console.log("Basket display updated globally.");

        window.showNotification(`${product.name} added to cart!`);

        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            window.toggleMenuWithAnimation(basketMenu, true);
            if (window.settingsMenu && window.settingsMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(window.settingsMenu, false);
                window.toggleMenuWithAnimation(window.categorySubMenu, false);
                window.settingsIcon && window.settingsIcon.classList.remove('rotated');
            }
            if (window.searchOverlay && window.searchOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(window.searchOverlay, false);
                window.searchInput.value = '';
                window.searchResults.innerHTML = '';
            }
            if (filterOverlay && filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            }
        }
    });

    // --- Filter Event Listeners ---
    if (filterIcon && filterOverlay && filterCloseBtn && priceRangeSlider && applyFiltersBtn && clearFiltersBtn &&
        subMoviesSeriesCheckbox && subCarsCheckbox && subMusiciansCheckbox && subQuotesCheckbox && subOtherFramedCheckbox && subCustomFramedCheckbox &&
        sortLowToHighRadio && sortHighToLowRadio && sortDefaultRadio) {

        console.log("Filter elements found. Attaching filter event listeners.");

        filterIcon.onclick = (e) => {
            e.stopPropagation();
            console.log("Filter icon CLICKED!");
            if (filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            } else {
                window.toggleMenuWithAnimation(filterOverlay, true);
                window.toggleMenuWithAnimation(window.settingsMenu, false);
                window.toggleMenuWithAnimation(window.basketMenu, false);
                window.toggleMenuWithAnimation(window.searchOverlay, false);
                window.settingsIcon && window.settingsIcon.classList.remove('rotated');
            }
        };

        filterCloseBtn.onclick = () => {
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter close button CLICKED. Filter overlay closing.");
        };

        minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
        maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
        priceRangeSlider.oninput = () => {
            currentMaxPrice = parseInt(priceRangeSlider.value);
            maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
            // Call filterProducts immediately on slider change for better UX
            filterProducts(); // Applying filters directly on slider change
        };

        // Subcategory checkbox listeners (these will trigger filterProducts directly)
        if (subMoviesSeriesCheckbox) subMoviesSeriesCheckbox.addEventListener('change', filterProducts);
        if (subCarsCheckbox) subCarsCheckbox.addEventListener('change', filterProducts);
        if (subMusiciansCheckbox) subMusiciansCheckbox.addEventListener('change', filterProducts);
        if (subQuotesCheckbox) subQuotesCheckbox.addEventListener('change', filterProducts);
        if (subOtherFramedCheckbox) subOtherFramedCheckbox.addEventListener('change', filterProducts);
        if (subCustomFramedCheckbox) subCustomFramedCheckbox.addEventListener('change', filterProducts);
        console.log("Subcategory checkbox listeners attached.");


        // Sort By Radio Buttons (these will trigger filterProducts directly)
        if (sortLowToHighRadio) sortLowToHighRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
        if (sortHighToLowRadio) sortHighToLowRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
        if (sortDefaultRadio) sortDefaultRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
        console.log("Sort By radio button listeners attached.");


        applyFiltersBtn.onclick = () => {
            console.log("Apply Filters button CLICKED! Initiating filtering process...");
            filterProducts();
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter overlay closed after applying filters.");
        };

        clearFiltersBtn.onclick = () => {
            console.log("Clear Filters button CLICKED! Resetting filters...");
            clearFilters();
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter overlay closed after clearing filters.");
        };

        filterOverlay.addEventListener('click', (e) => e.stopPropagation());
        console.log("Event listeners attached for filter overlay controls.");

    } else {
        console.warn("shop.js: One or more filter elements not found. Filtering functionality might be disabled.");
    }

    // --- CRITICAL INITIALIZATION FIX ---
    // Read subcategory from URL first
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryFromURL = urlParams.get('sub');
    console.log(`shop.js: URL Subcategory parameter: '${subcategoryFromURL}'`);

    // Ensure all filter checkboxes are unchecked first, then check based on URL or default
    const allSubcategoryCheckboxes = [subMoviesSeriesCheckbox, subCarsCheckbox, subMusiciansCheckbox, subQuotesCheckbox, subOtherFramedCheckbox, subCustomFramedCheckbox];

    // Clear all checkboxes
    allSubcategoryCheckboxes.forEach(checkbox => {
        if (checkbox) checkbox.checked = false;
    });

    if (subcategoryFromURL) {
        const targetCheckbox = document.querySelector(`#filterOverlay input[type="checkbox"][value="${subcategoryFromURL}"]`);
        if (targetCheckbox) {
            targetCheckbox.checked = true;
            console.log(`shop.js: Successfully set checkbox for '${subcategoryFromURL}'.`);
        } else {
            console.warn(`shop.js: Subcategory checkbox for URL parameter '${subcategoryFromURL}' NOT FOUND IN FILTER OPTIONS. Defaulting to all checked.`);
            // Fallback: If URL subcategory not found in UI, check all.
            allSubcategoryCheckboxes.forEach(checkbox => {
                if (checkbox) checkbox.checked = true;
            });
        }
    } else {
        // No subcategory in URL, so default to all checked
        allSubcategoryCheckboxes.forEach(checkbox => {
            if (checkbox) checkbox.checked = true;
        });
        console.log("shop.js: No URL subcategory. Defaulting all subcategory checkboxes to checked.");
    }

    // Call filterProducts initially to apply any default filters and render products based on initial UI state
    filterProducts();
    window.updateBasketDisplay();
    console.log("shop.js: Initial product render and basket update complete.");
});