// script.js - FULL CODE (Updated for Poster Packs integration and syntax fix)
// Global product data - Centralize ALL product data for search functionality
// IMPORTANT: You MUST populate this array with your actual products, including correct image paths.
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

    // --- Individual Posters (For selection in packs, NOT for direct sale) ---
    // These are the designs that will be presented on poster_selection.html
    // Ensure all these image paths exist and match what's in poster_selection.js
    { id: 'p_ind1', name: "Pulp Fiction", image: "images/PM1.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind2', name: "Fight Club1", image: "images/PM2.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind3', name: "Fight Club2", image: "images/PM3.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind4', name: "Al HARIF", image: "images/PM4.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind5', name: "SICKO SICKO", image: "images/PM5.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind6', name: "MA WRA2 AL TABI3A", image: "images/PM6.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind7', name: "SCARFACE1", image: "images/PM7.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind8', name: "SCARFACE2", image: "images/PM8.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id:'p_ind9',name: "INTERSTELLAR1", image: "images/PM9.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind10',name: "INTERSTELLAR2", image: "images/PM10.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind11',name: "INTERSTELLAR3", image: "images/PM11.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind12',name: "INTERSTELLAR4", image: "images/PM12.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id:'p_ind13',name: "TAXI DRIVER 1", image: "images/PM13.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind14',name: "TAXI DRIVER 2", image: "images/PM14.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind15',name: "TAXI DRIVER 3", image: "images/PM15.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind16',name: "SHUTTER ISLAND 1", image: "images/PM16.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id:'p_ind17',name: "SHUTTER ISLAND 2", image: "images/PM17.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind18',name: "SHUTTER ISLAND 3", image: "images/PM18.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind19',name: "LIGHTHOUSE 1", image: "images/PM19.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind20',name: "LIGHTHOUSE 2", image: "images/PM20.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind21',name: "BLADE RUNNER 1", image: "images/PM21.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind22',name: "BLADE RUNNER 2", image: "images/PM22.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind23',name: "THE IRISHMAN 1", image: "images/PM23.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind24',name: "THE IRISH MAN 2", image: "images/PM24.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind25',name: "NO COUNTRY FOR OLD MEN 1", image: "images/PM25.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind26',name: "NO COUNTRY FOR OLD MEN 2", image: "images/PM26.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind27',name: "12 ANGRY MEN", image: "images/PM27.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind28',name: "INCEPTION 1", image: "images/PM28.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind29',name: "INCEPTION 2", image: "images/PM28.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind30',name: "MATRIX 1", image: "images/PM30.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind31',name: "MATRIX 2", image: "images/PM31.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind32',name: "THE SHINING 1", image: "images/PM32.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind33',name: "THE SHINING 2", image: "images/PM33.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind34',name: "THE PRESTIGE", image: "images/PM34.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind35',name: "DJANGO", image: "images/PM35.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind36',name: "THE WOLF OF WALL STREET 1", image: "images/PM36.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind37',name: "THE WOLF OF WALL STREET 2", image: "images/PM37.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind38',name: "ONCE UPON A TIME IN HOLLYWOOD", image: "images/PM38.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind39',name: "SEVEN 1", image: "images/PM39.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind40',name: "SEVEN 2", image: "images/PM40.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind41',name: "WHIPLASH 1", image: "images/PM41.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind42',name: "WHIPLASH 2", image: "images/PM42.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind43',name: "THE DARK KNIGHT 1", image: "images/PM43.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind44',name: "THE DARK KNIGHT 2", image: "images/PM44.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind45',name: "AMERICAN PSYCHO 1", image: "images/PM45.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind46',name: "AMERICAN PSYCHO 2", image: "images/PM46.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind47',name: "GOODFELLAS 1", image: "images/PM47.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind48',name: "GOODFELLAS 2", image: "images/PM48.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind49',name: "THE GODFATHER 1", image: "images/PM49.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind50',name: "THE GODFATHER 2", image: "images/PM50.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind51',name: "INVINCIBLE", image: "images/PM51.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind52',name: "THE WALKING DEAD", image: "images/PM52.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind53',name: "MR ROBOT 1", image: "images/PM53.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind54',name: "MR ROBOT 2", image: "images/PM54.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind55',name: "THE BOYS", image: "images/PM55.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind56',name: "BOJACK HORSEMAN 1", image: "images/PM56.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind57',name: "BOJACK HORSEMAN 2", image: "images/PM57.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind58',name: "PRISONBREAK", image: "images/PM58.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind59',name: "GAME OF THRONES 1", image: "images/PM59.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind60',name: "GAME OF THRONES 2", image: "images/PM60.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind61',name: "STRANGER THINGS", image: "images/PM61.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind62',name: "SOPRANOS 1", image: "images/PM62.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind63',name: "SOPRANOS 2", image: "images/PM63.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind64',name: "YOU 1", image: "images/PM64.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind65',name: "YOU 2", image: "images/PM65.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind66',name: "DEXTER 1", image: "images/PM66.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind67',name: "DEXTER 2", image: "images/PM67.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind68',name: "BREAKING BAD 1", image: "images/PM68.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind69',name: "BREAKING BAD 2", image: "images/PM69.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind70',name: "BETTER CALL SAUL 1", image: "images/PM70.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind71', name: "BETTER CALL SAUL 2", image: "images/PM71.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind72',name: "TERRIFIER", image: "images/PM73.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },
    { id: 'p_ind73',name: "SHAMS EL ZNATY", image: "images/PM72.jpg", category: "Individual Poster Design", subcategory: "Movies & Series" },

    {id: 'p_indC1',name: "COUNTACH LAMBO POSTER", image: "images/PC1.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC2',name: "SHELBY GT500 1967 POSTER", image: "images/PC2.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC3',name: "BMW M8 POSTER", image: "images/PC3.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC4',name: "MCLAAREN P1 GTR POSTER", image: "images/PC4.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC5',name: "MCLAAREN P1 GTR POSTER", image: "images/PC5.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC6',name: "MCLAREN F1 GTR POSTER", image: "images/PC6.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC7',name: "PORSCHE BRABUS 911 POSTER", image: "images/PC7.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC8',name: "PORSCHE 918 POSTER", image: "images/PC8.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC9',name: "BMW E30 M3 1 POSTER", image: "images/PC9.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC10',name: "PORSCHE 911 GT3 RS 1 POSTER", image: "images/PC10.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC11',name: "TOYOTA AE86 POSTER", image: "images/PC11.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC12',name: "MAZDA RX-7 POSTER", image: "images/PC12.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC13',name: "PORSCHE 911 GT3 RS 2 POSTER", image: "images/PC13.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC14',name: "BMW E30 M3 2 POSTER", image: "images/PC14.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC15',name: "FERRARI F40 1987 POSTER", image: "images/PC15.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC16',name: "PORSCHE 911 GT3 RS 3 POSTER", image: "images/PC16.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC17',name: "PORSCHE 911 GT3 RS 4 POSTER", image: "images/PC17.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC18',name: "BMW M4 CSL POSTER", image: "images/PC18.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC19',name: "PORSCHE 911 GT3 RS 5 POSTER", image: "images/PC19.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC20',name: "BMW E30 M3 3 POSTER", image: "images/PC20.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    {id: 'p_indC21',name: "PORSCHE 911 GT3 RS 6", image: "images/PC21.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC22',name: "TOYOTA SUPRA MK4 POSTER", image: "images/PC22.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC23',name: "MCLAREN 7205 POSTER", image: "images/PC23.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC24',name: "MERCEDES AMG GT POSTER", image: "images/PC24.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC25',name: "NISSAN SKYLINE POSTER", image: "images/PC25.jpg", category: "Individual Poster Design", subcategory: "Cars" },
    { id: 'p_indC26',name: "BMW CAR POSTER", image: "images/PC26.jpg", category: "Individual Poster Design", subcategory: "Cars" },

    { id: 'p_indR1',name: "TRAVIS SCOTT 1 POSTER", image: "images/PR1.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR2',name: "2 PAC POSTER", image: "images/PR2.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR3',name: "TRAVIS SCOTT 2 POSTER", image: "images/PR3.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR4',name: "BILLIE EILISH 1 POSTER", image: "images/PR4.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR5',name: "BILLIE EILISH 2 POSTER", image: "images/PR5.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR6',name: "FAIROUZ POSTER", image: "images/PR6.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR7',name: "MICHEAL JAACKSON POSTER", image: "images/PR7.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR8',name: "LANA DEL RAY 1 POSTER", image: "images/PR8.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR9',name: "LANA DEL RAY 2 POSTER", image: "images/PR9.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR10',name: "SELENA GOMEZ 1 POSTER", image: "images/PR10.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR11',name: "SELENA GOMEZ 2 POSTER", image: "images/PR11.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR12',name: "ADELE 1 POSTER", image: "images/PR12.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR13',name: "ADELE 2 POSTER", image: "images/PR13.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR14',name: "DRAKE 1 POSTER", image: "images/PR14.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR15',name: "DRAKE 2 POSTER", image: "images/PR15.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR16',name: "THE WEEKEND 1 POSTER", image: "images/PR16.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR17',name: "THE WEEKEND 2 POSTER", image: "images/PR17.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR18',name: "KENDRICK LAMAR 1 POSTER", image: "images/PR18.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR19',name: "SZA 1 POSTER", image: "images/PR19.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR20',name: "SZA 2 POSTER", image: "images/PR20.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR21',name: "KENDRICK LAMAR 2 POSTER", image: "images/PR21.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR22',name: "CAIROKEE 1 POSTER", image: "images/PR22.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR23',name: "CAAIROKEE 2 POSTER", image: "images/PR23.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR24',name: "EMINEM 1 POSTER", image: "images/PR24.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR25',name: "EMINEM 2 POSTER", image: "images/PR25.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR26',name: "TV GIRL 1 POSTER", image: "images/PR26.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR27',name: "TV GIRL 2 POSTER", image: "images/PR27.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR28',name: "ABD AL HELIM POSTER", image: "images/PR28.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR29',name: "OM KALTHOUM POSTER", image: "images/PR29.jpg", category: "Individual Poster Design", subcategory: "Musicians" },
    { id: 'p_indR30',name: "ARCTIC MONKEYS POSTER", image: "images/PR30.jpg", category: "Individual Poster Design", subcategory: "Musicians" },

    { id: 'p_indF1',name: "KYLIAAN MBAPPE 1 POSTER", image: "images/PF1.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF2',name: "CR7 1 POSTER", image: "images/PF2.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF3',name: "PALMAR 1 POSTER", image: "images/PF3.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF4',name: "CR7 2 POSTER", image: "images/PF4.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF5',name: "PALMAR 2 POSTER", image: "images/PF5.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF6',name: "PIRLO POSTER", image: "images/PF6.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF7',name: "MANCHESTER UNITED POSTER", image: "images/PF7.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF8',name: "ZIDAN POSTER", image: "images/PF8.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF9',name: "CR7 3 POSTER", image: "images/PF9.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF10',name: "MESSI 1 POSTER", image: "images/PF10.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF11',name: "RONALDINHO POSTER", image: "images/PF11.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF12',name: "NEYMAR POSTER", image: "images/PF12.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF13',name: "KYLIAN MBAPPE 2 POSTER", image: "images/PF13.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF14',name: "MESSI 2 POSTER", image: "images/PF14.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF15',name: "MESSI 3 POSTER", image: "images/PF15.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF16',name: "LAMINE YAMAL  POSTER", image: "images/PF16.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF17',name: "KYLIAN MBAPPE 3 POSTER", image: "images/PF17.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF18',name: "CR7 4 POSTER", image: "images/PF18.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF19',name: "REAL MADRID POSTER", image: "images/PF19.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF20',name: "BARCELONA POSTER", image: "images/PF20.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF21',name: "CR7 5 POSTER", image: "images/PF21.jpg", category: "Individual Poster Design", subcategory: "Quotes" },
    { id: 'p_indF22',name: "CR7 6 POSTER", image: "images/PF22.jpg", category: "Individual Poster Design", subcategory: "Quotes" },

    { id: 'p_indQ1',name: "COASTEL LIFE", image: "images/PQ1.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ2',name: "NIKE 1 POSTER", image: "images/PQ2.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ3',name: "8 BALL POSTER", image: "images/PQ3.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ4',name: "ART 1 POSTER", image: "images/PQ4.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ5',name: "8 BALL X STUSSY POSTER", image: "images/PQ5.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ6',name: "PARIS POSTER", image: "images/PQ6.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ7',name: "ROME POSTER", image: "images/PQ7.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ8',name: "ART 2 POSTER", image: "images/PQ8.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ9',name: "ART 3 POSTER", image: "images/PQ9.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ10',name: "ILIA TOPURIA POSTER", image: "images/PQ10.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ11',name: "MIKE TYSON POSTER", image: "images/PQ11.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ12',name: "MIKE TYSON 2 POSTER", image: "images/PQ12.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ13',name: "SATURN POSTER", image: "images/PQ13.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ14',name: "QUOTE 1 POSTER", image: "images/PQ14.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ15',name: "QUOTE 2 POSTER", image: "images/PQ15.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ16',name: "QUOTE 3 POSTER", image: "images/PQ16.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ17',name: "QUOTE 4 POSTER", image: "images/PQ17.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ18',name: "QUOTE 5 POSTER", image: "images/PQ18.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ19',name: "QUOTE 6 POSTER", image: "images/PQ19.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ20',name: "QUOTE 7 POSTER", image: "images/PQ20.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ21',name: "QUOTE 8 POSTER", image: "images/PQ21.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ22',name: "QUOTE 9 POSTER", image: "images/PQ22.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ23',name: "QUOTE 10 POSTER", image: "images/PQ23.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ24',name: "QUOTE 11 POSTER", image: "images/PQ24.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ25',name: "QUOTE 12 POSTER", image: "images/PQ25.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ26',name: "QUOTE 13 POSTER", image: "images/PQ26.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ27',name: "MOHAMED ALI POSTER", image: "images/PQ27.jpg", category: "Individual Poster Design", subcategory: "Other" },
    { id: 'p_indQ28',name: "NIKE 2 POSTER", image: "images/PQ28.jpg", category: "Individual Poster Design", subcategory: "Other" },
];


// Global element references (will be assigned inside DOMContentLoaded for safety)
let settingsIcon, basketIcon, settingsMenu, basketMenu, categoryLink, categorySubMenu, checkoutBtn;
let searchIcon, searchOverlay, searchCloseBtn, searchInput, searchResults;
let carouselSlide, carouselImages, carouselPrev, carouselNext;
let framedPostersCategoryLink, postersCategoryLink; // Updated for Poster Packs
let framedPostersSubMenu, postersSubMenu; // Updated for Poster Packs
let backToCategoryMenuFramed, backToCategoryMenuPosters; // Back buttons in sub-menus

let currentIndex = 0; // For carousel
let slideInterval; // For carousel auto-play


// --- Global Utility Functions (made available via window.functionName) ---

/**
 * Toggles the display and animation classes for a given HTML element.
 * @param {HTMLElement} el The element to toggle (e.g., settingsMenu, basketMenu, searchOverlay).
 * @param {boolean} show True to show the element, false to hide it.
 */
window.toggleMenuWithAnimation = function(el, show) {
    if (!el) {
        // console.warn("toggleMenuWithAnimation: Target element not found.", el);
        return; // Exit if the element doesn't exist on this page
    }

    try {
        if (show) {
            el.style.display = 'block'; // Make it visible for animation to start
            requestAnimationFrame(() => { // Use requestAnimationFrame to ensure CSS display property is applied
                el.classList.add('is-visible'); // Trigger CSS transition
            });
        } else {
            el.classList.remove('is-visible'); // Start reverse CSS transition
            el.addEventListener('transitionend', function handler() {
                el.style.display = 'none'; // Hide element completely after transition
                el.removeEventListener('transitionend', handler); // Remove listener to prevent memory leaks
            }, { once: true }); // { once: true } ensures the listener runs only once then removes itself
        }
    } catch (error) {
        console.error("Error in toggleMenuWithAnimation:", error);
        console.trace(); // Show call stack
    }
};

/**
 * Applies a subtle fade-in/slide-up animation to the main body content when the page loads.
 * Enhances the professional feel of page transitions.
 */
function initializePageAnimation() {
    const mainContent = document.body;
    if (!mainContent) return; // Safety check

    try {
        mainContent.style.opacity = '0'; // Initial state: invisible
        mainContent.style.transform = 'translateY(20px)'; // Initial state: slightly below final position
        // After a short delay, apply the final state which triggers the CSS transition
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100); // Small delay to ensure initial styles are painted
    } catch (error) {
        console.error("Error in initializePageAnimation:", error);
        console.trace();
    }
}

// Global basket array (data persists across pages using localStorage)
window.basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

// Define the custom design fee globally
const CUSTOM_DESIGN_FEE = 20; // This is the value requested for reversion.

/**
 * Updates the visual representation of the shopping basket in the basket menu.
 * This function is called on every page load and when items are added/removed.
 */
window.updateBasketDisplay = function() {
    const basketItemsContainer = document.getElementById("basketItems");
    const totalDisplay = document.getElementById("totalPrice");

    // Check if basket display elements exist on the current page before trying to update them
    if (!basketItemsContainer || !totalDisplay) {
        // console.warn("Basket display elements not found on this page (normal for checkout/confirmation).");
        return;
    }

    try {
        basketItemsContainer.innerHTML = ''; // Clear existing basket items
        let total = 0; // Reset total price

        // If basket is empty, show empty message and reset total
        if (window.basket.length === 0) {
            basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
            totalDisplay.innerText = 'Total: 0 L.E';
            return;
        }

        // Populate basket with current items
        window.basket.forEach((item, i) => {
            total += item.total; // Accumulate total price

            const itemDiv = document.createElement('div');
            itemDiv.className = 'basket-item'; // Apply CSS styling

            let itemDetailsHtml = '';

            // Handle display based on category
            if (item.category === "Poster Pack") {
                let designsList = '';
                if (item.selectedDesigns && item.selectedDesigns.length > 0) {
                    designsList = `<br><span style="font-size:0.8em; color:#bbb;">Designs: ${item.selectedDesigns.map(d => d.name).join(', ')}</span>`;
                } else {
                    designsList = `<br><span style="font-size:0.8em; color:#bbb;">Designs: Not yet selected</span>`;
                }
                itemDetailsHtml = `
                    <p class="basket-item-name">${item.name} (${item.posterCount || 'N/A'} posters)</p>
                    <p class="basket-item-price">Size: ${item.size} x ${item.qty} = ${item.total} L.E${designsList}</p>
                `;
            } else if (item.category === "Framed Poster") {
                let customText = '';
                if (item.isCustomDesign) {
                    const originalBasePrice = item.originalPrice;
                    const customFee = item.price - originalBasePrice;
                    customText = `<br><span style="font-size:0.8em; color:#bbb;">Custom (+${customFee} L.E) - Image: ${item.customImageFileName}</span>`;
                }
                itemDetailsHtml = `
                    <p class="basket-item-name">${item.name}</p>
                    <p class="basket-item-price">Size: ${item.size} L.E x ${item.qty} = ${item.total} L.E${customText}</p>
                `;
            } else { // For Stickers
                itemDetailsHtml = `
                    <p class="basket-item-name">${item.name}</p>
                    <p class="basket-item-price">Price: ${item.originalPrice} L.E x ${item.qty} = ${item.total} L.E</p>
                `;
            }

            itemDiv.innerHTML = `
                <div class="basket-item-details">
                    <img src="${item.image}" alt="${item.name}" class="basket-img">
                    <div>
                        ${itemDetailsHtml}
                    </div>
                </div>
                <button onclick="window.removeFromBasket(${i})" class="remove-btn">Remove</button>
            `;
            basketItemsContainer.appendChild(itemDiv);
        });

        totalDisplay.innerText = `Total: ${total} L.E`; // Update total display
        localStorage.setItem('fraveBasket', JSON.stringify(window.basket)); // Save updated basket to localStorage
    } catch (error) {
        console.error("Error in updateBasketDisplay:", error);
        console.trace();
    }
};

/**
 * Removes an item from the global basket array and updates the display.
 * Accessible from inline HTML 'onclick' attributes.
 * @param {number} i The index of the item to remove from the basket.
 */
window.removeFromBasket = function(i) {
    try {
        // console.log(`Removing item ${i} from basket.`);
        window.basket.splice(i, 1); // Remove item from array
        window.updateBasketDisplay(); // Update UI
    } catch (error) {
        console.error("Error in removeFromBasket:", error);
        console.trace();
    }
};


// --- Global Notification Function ---
// (Requires a <div id="notificationContainer"> in your HTML and a sounds/add-to-cart-sound.mp3 file)
function playSound(src = 'sounds/add-to-cart-sound.mp3') { // Default sound
    const audio = new Audio(src);
    audio.play().catch(e => console.warn("Audio play failed:", e)); // Catch errors if sound doesn't play
}

window.showNotification = function(message, type = 'success', playAudio = true) {
    const notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) {
        console.warn("Notification container not found. Cannot show notification.");
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    notificationContainer.appendChild(notification);

    if (playAudio) {
        playSound(); // Play default sound
    }

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Small delay to allow CSS transition

    // Animate out and remove
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        }, { once: true });
    }, 3000); // Show for 3 seconds
};


// --- Main DOMContentLoaded Listener ---
// Ensures all HTML elements are loaded before attempting to access them with JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    // console.log("script.js DOMContentLoaded fired. Attaching global event listeners.");

    // Assign global element references once DOM is ready
    settingsIcon = document.getElementById('settingsIcon');
    basketIcon = document.getElementById('basketIcon');
    settingsMenu = document.getElementById('settingsMenu');
    basketMenu = document.getElementById('basketMenu');
    categoryLink = document.querySelector('.category-link');
    categorySubMenu = document.getElementById('categorySubMenu');
    checkoutBtn = document.getElementById('checkoutBtn');

    searchIcon = document.getElementById('searchIcon');
    searchOverlay = document.getElementById('searchOverlay');
    searchCloseBtn = document.getElementById('searchCloseBtn');
    searchInput = document.getElementById('searchInput');
    searchResults = document.getElementById('searchResults');

    carouselSlide = document.getElementById('carouselSlide');
    carouselImages = carouselSlide ? carouselSlide.querySelectorAll('img') : []; // Check if carouselSlide exists
    carouselPrev = document.getElementById('carouselPrev');
    carouselNext = document.getElementById('carouselNext');

    // New menu triggers and sub-menu overlays
    framedPostersCategoryLink = document.getElementById('framedPostersCategoryLink');
    postersCategoryLink = document.getElementById('postersCategoryLink'); // Now for Poster Packs
    framedPostersSubMenu = document.getElementById('framedPostersSubMenu');
    postersSubMenu = document.getElementById('postersSubMenu'); // Now for Poster Packs
    backToCategoryMenuFramed = document.getElementById('backToCategoryMenuFramed');
    backToCategoryMenuPosters = document.getElementById('backToCategoryMenuPosters');


    initializePageAnimation(); // Apply page entry animation on load for all pages

    // --- Settings Menu Toggle Logic ---
    // Handles settings icon click (main menu toggle)
    if (settingsIcon && settingsMenu && categoryLink && categorySubMenu) {
        try {
            settingsIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing menu immediately
                if (settingsMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(categorySubMenu, false); // Also close category sub-menu if open
                    // Also close any specific sub-menus that might be open
                    window.toggleMenuWithAnimation(framedPostersSubMenu, false);
                    window.toggleMenuWithAnimation(postersSubMenu, false);
                    settingsIcon.classList.remove('rotated');
                } else {
                    window.toggleMenuWithAnimation(settingsMenu, true); // Open main settings menu
                    // Close other global overlays if open
                    window.toggleMenuWithAnimation(basketMenu, false);
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    settingsIcon.classList.add('rotated');
                    if (searchInput) { searchInput.value = ''; }
                    if (searchResults) { searchResults.innerHTML = ''; }
                }
            };
        } catch (error) { console.error("Error setting settingsIcon.onclick:", error); console.trace(); }

        // Handles "Category" link in main settings menu (to show Category Submenu)
        if (categoryLink) {
            try {
                categoryLink.onclick = (e) => {
                    e.preventDefault(); // Prevent default link navigation
                    e.stopPropagation(); // Prevent main menu from closing
                    if (categorySubMenu.classList.contains('is-visible')) {
                        window.toggleMenuWithAnimation(categorySubMenu, false);
                    } else {
                        window.toggleMenuWithAnimation(categorySubMenu, true);
                        // Make sure categorySubMenu starts from the same position as settingsMenu
                        if (settingsMenu) {
                            categorySubMenu.style.left = settingsMenu.offsetLeft + 'px';
                            categorySubMenu.style.top = settingsMenu.offsetTop + 'px';
                        }
                    }
                };
            } catch (error) { console.error("Error setting categoryLink.onclick:", error); console.trace(); }
        }
    }


    // --- Drill-down Category Menu Logic ---
    // Framed Posters Category Link (within categorySubMenu)
    if (framedPostersCategoryLink && framedPostersSubMenu) {
        try {
            framedPostersCategoryLink.onclick = (e) => {
                e.preventDefault(); // Prevent default link behavior if it's an <a> tag
                e.stopPropagation(); // Stop click from closing parent menus
                window.toggleMenuWithAnimation(settingsMenu, false); // Close main settings menu
                window.toggleMenuWithAnimation(categorySubMenu, false); // Close category sub-menu
                window.toggleMenuWithAnimation(framedPostersSubMenu, true); // Open Framed Posters subcategory menu
            };
        } catch (error) { console.error("Error setting framedPostersCategoryLink.onclick:", error); console.trace(); }
    }

    // Poster Packs Category Link (within categorySubMenu) - UPDATED
    if (postersCategoryLink && postersSubMenu) {
        try {
            postersCategoryLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(categorySubMenu, false);
                window.toggleMenuWithAnimation(postersSubMenu, true); // Open Poster Packs subcategory menu
            };
        } catch (error) { console.error("Error setting postersCategoryLink.onclick:", error); console.trace(); }
    }

    // Back Buttons in New Sub-Menus
    if (backToCategoryMenuFramed && framedPostersSubMenu && settingsMenu && categorySubMenu) {
        try {
            backToCategoryMenuFramed.onclick = (e) => {
                e.stopPropagation();
                window.toggleMenuWithAnimation(framedPostersSubMenu, false); // Close current sub-menu
                window.toggleMenuWithAnimation(settingsMenu, true); // Re-open main settings menu
                window.toggleMenuWithAnimation(categorySubMenu, true); // Re-open category sub-menu
            };
        } catch (error) { console.error("Error setting backToCategoryMenuFramed.onclick:", error); console.trace(); }
    }
    if (backToCategoryMenuPosters && postersSubMenu && settingsMenu && categorySubMenu) {
        try {
            backToCategoryMenuPosters.onclick = (e) => {
                e.stopPropagation();
                window.toggleMenuWithAnimation(postersSubMenu, false);
                window.toggleMenuWithAnimation(settingsMenu, true);
                window.toggleMenuWithAnimation(categorySubMenu, true);
            };
        } catch (error) { console.error("Error setting backToCategoryMenuPosters.onclick:", error); console.trace(); }
    }


    // --- Basket Menu Toggle Logic ---
    // Check if necessary elements exist on the page
    if (basketIcon && basketMenu) {
        try {
            basketIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing menu immediately
                if (basketMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(basketMenu, false);
                } else {
                    window.toggleMenuWithAnimation(basketMenu, true); // Open basket menu
                    // Close other global overlays if open
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(categorySubMenu, false);
                    window.toggleMenuWithAnimation(framedPostersSubMenu, false); // Close new sub-menus
                    window.toggleMenuWithAnimation(postersSubMenu, false); // Close new sub-menus
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    if (settingsIcon) { settingsIcon.classList.remove('rotated'); }
                    if (searchInput) { searchInput.value = ''; }
                    if (searchResults) { searchResults.innerHTML = ''; }
                }
            };
        } catch (error) { console.error("Error setting basketIcon.onclick:", error); console.trace(); }

        // Checkout Button in Basket Menu
        if (checkoutBtn) {
            try {
                checkoutBtn.onclick = () => {
                    if (window.basket.length > 0) {
                        window.location.href = 'checkout.html'; // Redirect to checkout page
                    } else {
                        alert('Your basket is empty. Please add items before checking out.');
                    }
                };
            } catch (error) { console.error("Error setting checkoutBtn.onclick:", error); console.trace(); }
        }
    }

    // --- Search Overlay Toggle Logic and Functionality ---
    // Check if necessary elements exist on the page
    if (searchIcon && searchOverlay && searchInput && searchResults && searchCloseBtn) {
        try {
            searchIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing overlay immediately
                if (searchOverlay.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    searchInput.value = '';
                    searchResults.innerHTML = '';
                } else {
                    window.toggleMenuWithAnimation(searchOverlay, true); // Open search overlay
                    searchInput.focus(); // Focus input for immediate typing
                    // Close other global overlays if open
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(categorySubMenu, false);
                    window.toggleMenuWithAnimation(framedPostersSubMenu, false); // Close new sub-menus
                    window.toggleMenuWithAnimation(postersSubMenu, false); // Close new sub-menus
                    window.toggleMenuWithAnimation(basketMenu, false);
                    if (settingsIcon) { settingsIcon.classList.remove('rotated'); }
                }
            };
        } catch (error) { console.error("Error setting searchIcon.onclick:", error); console.trace(); }

        // Close button for search overlay
        try {
            searchCloseBtn.onclick = () => {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = '';
                searchResults.innerHTML = '';
            };
        } catch (error) { console.error("Error setting searchCloseBtn.onclick:", error); console.trace(); }

        // Live search filtering as user types
        try {
            searchInput.oninput = () => {
                const query = searchInput.value.toLowerCase();
                searchResults.innerHTML = ''; // Clear previous results

                if (query.length < 2) { // Require at least 2 characters to start searching
                    searchResults.innerHTML = '<p class="search-tip">Type at least 2 characters to search.</p>';
                    return;
                }

                // Filter products based on name, category, or subcategory
                const filteredProducts = allProducts.filter(product =>
                    (product.name && product.name.toLowerCase().includes(query)) ||
                    (product.category && product.category.toLowerCase().includes(query)) ||
                    (product.subcategory && product.subcategory.toLowerCase().includes(query))
                );

                if (filteredProducts.length === 0) {
                    searchResults.innerHTML = '<p class="search-tip">No products found.</p>';
                } else {
                    // Display search results as clickable links to their respective product pages
                    filteredProducts.forEach(product => {
                        const productLink = document.createElement('a');
                        // Determine the correct href based on product category
                        if (product.category === "Framed Poster") {
                            productLink.href = "shop.html"; // Your existing framed poster page
                        } else if (product.category === "Poster Pack") { // Link to poster packs page
                            productLink.href = "poster_packs.html";
                        } else if (product.category === "Sticker") {
                            productLink.href = "stickers.html";
                        } else {
                            productLink.href = "javascript:void(0)"; // Fallback for uncategorized
                        }

                        productLink.className = 'search-result-item'; // Apply CSS styling
                        productLink.innerHTML = `
                            <img src="${product.image}" alt="${product.name}">
                            <div>
                                <p class="search-result-name">${product.name}</p>
                                <p class="search-result-category">${product.category}</p>
                            </div>
                        `;
                        searchResults.appendChild(productLink);
                    });
                }
            };
        } catch (error) { console.error("Error setting searchInput.oninput:", error); console.trace(); }
    }

    // --- Global Click Listener to Close Menus/Overlays When Clicking Outside ---
    // This listener manages closing menus if a click occurs outside of them or their direct toggling elements.
    try {
        document.addEventListener('click', (event) => {
            const clickedElement = event.target;

            // Settings menu close logic: close if settings menu is visible AND click is outside menu/its toggling icon/its sub-menu
            if (settingsMenu && settingsIcon && categorySubMenu && categoryLink &&
                settingsMenu.classList.contains('is-visible') &&
                !settingsMenu.contains(clickedElement) &&
                clickedElement !== settingsIcon &&
                !categorySubMenu.contains(clickedElement) &&
                clickedElement !== categoryLink &&
                !framedPostersSubMenu.contains(clickedElement) && // Add new sub-menus to conditions
                !postersSubMenu.contains(clickedElement) // Updated for Poster Packs sub-menu
            ) {
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(categorySubMenu, false);
                window.toggleMenuWithAnimation(framedPostersSubMenu, false); // Close new sub-menus
                window.toggleMenuWithAnimation(postersSubMenu, false); // Close new sub-menus
                settingsIcon.classList.remove('rotated');
            }

            // Basket menu close logic: close if basket menu is visible AND click is outside menu/its toggling icon/checkout button
            if (basketMenu && basketIcon && checkoutBtn &&
                basketMenu.classList.contains('is-visible') &&
                !basketMenu.contains(clickedElement) &&
                clickedElement !== basketIcon &&
                clickedElement !== checkoutBtn // Important: don't close if clicking checkout button
            ) {
                window.toggleMenuWithAnimation(basketMenu, false);
            }

            // Search overlay close logic: close if search overlay is visible AND click is outside overlay/its toggling icon/search input itself
            if (searchOverlay && searchIcon && searchInput && searchCloseBtn &&
                searchOverlay.classList.contains('is-visible') &&
                !searchOverlay.contains(clickedElement) &&
                clickedElement !== searchIcon &&
                clickedElement !== searchInput // Important: don't close if clicking inside search input
            ) {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = ''; // Clear input on close
                searchResults.innerHTML = ''; // Clear results on close
            }
        });
    } catch (error) { console.error("Error setting document.addEventListener('click'):", error); console.trace(); }

    // --- Stop Propagation for Clicks *Inside* Menus/Overlays ---
    // These listeners prevent clicks within the actual menu/overlay content from bubbling up
    // to the document and inadvertently triggering the "click outside to close" logic for *that same menu*.
    try {
        settingsMenu && settingsMenu.addEventListener('click', (e) => e.stopPropagation());
        basketMenu && basketMenu.addEventListener('click', (e) => e.stopPropagation());
        searchOverlay && searchOverlay.addEventListener('click', (e) => e.stopPropagation());
        framedPostersSubMenu && framedPostersSubMenu.addEventListener('click', (e) => e.stopPropagation()); // New menu
        postersSubMenu && postersSubMenu.addEventListener('click', (e) => e.stopPropagation()); // New menu
    } catch (error) { console.error("Error setting stopPropagation listeners:", error); console.trace(); }


    // --- Homepage Specific Logic (Shop Now button, Product Carousel) ---
    const shopButton = document.querySelector('.shop-button');
    if (shopButton) {
        // The 'Shop Now' button is a simple <a> tag; its navigation works by default.
        // If you intended custom JS behavior (e.g., smooth scroll), you'd add it here.
    }

    // Carousel Logic (only runs if carousel elements exist, typically only on index.html)
    if (carouselSlide && carouselImages.length > 0 && carouselPrev && carouselNext) {
        try {
            function updateCarousel() {
                carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
            }

            function startSlideShow() {
                clearInterval(slideInterval); // Clear any existing auto-play interval
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % carouselImages.length; // Move to next image
                    updateCarousel();
                }, 4000); // Change image every 4 seconds
            }

            // Manual navigation for carousel
            carouselPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset auto-play timer after manual interaction
            });

            carouselNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset auto-play timer after manual interaction
            });

            startSlideShow(); // Start the auto-play slideshow when on the homepage
        } catch (error) { console.error("Error in carousel logic:", error); console.trace(); }
    }

    // --- Initial Load of Basket Display ---
    // This ensures the basket icon shows correct item count/total when any page loads
    window.updateBasketDisplay();
});