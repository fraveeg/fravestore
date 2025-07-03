// poster_selection.js - Handles the selection of individual posters for a pack (allowing multiple selections of same design)
document.addEventListener('DOMContentLoaded', () => {
    console.log("poster_selection.js: DOMContentLoaded fired. Initializing poster selection page.");

    // Retrieve the selected pack details from sessionStorage
    const currentPackSelectionJSON = sessionStorage.getItem('currentPosterPackSelection');
    let currentPackSelection = null;

    if (currentPackSelectionJSON) {
        currentPackSelection = JSON.parse(currentPackSelectionJSON);
        console.log("Loaded current pack selection:", currentPackSelection);
    } else {
        console.error("No pack details found in sessionStorage. Redirecting to poster_packs.html");
        window.location.href = 'poster_packs.html'; // Redirect if no pack was selected
        return;
    }

    // Individual poster data - These are the designs available for selection
    const allIndividualPosters = [
        // Include a placeholder for a custom individual poster design if you offer one for selection in packs.
        { id: 'p_custom_ind_design', name: "YOUR CUSTOM DESIGN", image: "images/poster_custom.jpg", category: "Poster", subcategory: "Custom", price: 100, isCustomizable: true },

        // Existing individual poster designs:
        { id: 'p1', name: "Pulp Fiction", image: "images/PM1.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p2', name: "Fight Club1", image: "images/PM2.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p4', name: "Fight Club2", image: "images/PM3.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p5', name: "Al HARIF", image: "images/PM4.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p6', name: "SICKO SICKO", image: "images/PM5.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p7', name: "MA WRA2 AL TABI3A", image: "images/PM6.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p8', name: "SCARFACE1", image: "images/PM7.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p9', name: "SCARFACE2", image: "images/PM8.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p10',name: "INTERSTELLAR1", image: "images/PM9.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p11',name: "INTERSTELLAR2", image: "images/PM10.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p12',name: "INTERSTELLAR3", image: "images/PM11.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p13',name: "INTERSTELLAR4", image: "images/PM12.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p14',name: "TAXI DRIVER 1", image: "images/PM13.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p15',name: "TAXI DRIVER 2", image: "images/PM14.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p16',name: "TAXI DRIVER 3", image: "images/PM15.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p17',name: "SHUTTER ISLAND 1", image: "images/PM16.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p18',name: "SHUTTER ISLAND 2", image: "images/PM17.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p19',name: "SHUTTER ISLAND 3", image: "images/PM18.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p20',name: "LIGHTHOUSE 1", image: "images/PM19.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p21',name: "LIGHTHOUSE 2", image: "images/PM20.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p22',name: "BLADE RUNNER 1", image: "images/PM21.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p23',name: "BLADE RUNNER 2", image: "images/PM22.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p24',name: "THE IRISHMAN 1", image: "images/PM23.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p25',name: "THE IRISH MAN 2", image: "images/PM24.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p26',name: "NO COUNTRY FOR OLD MEN 1", image: "images/PM25.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p27',name: "NO COUNTRY FOR OLD MEN 2", image: "images/PM26.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p28',name: "12 ANGRY MEN", image: "images/PM27.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p29',name: "INCEPTION 1", image: "images/PM28.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p30',name: "INCEPTION 2", image: "images/PM28.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p31',name: "MATRIX 1", image: "images/PM30.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p32',name: "MATRIX 2", image: "images/PM31.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p33',name: "THE SHINING 1", image: "images/PM32.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p34',name: "THE SHINING 2", image: "images/PM33.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p35',name: "THE PRESTIGE", image: "images/PM34.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p36',name: "DJANGO", image: "images/PM35.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p37',name: "THE WOLF OF WALL STREET 1", image: "images/PM36.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p38',name: "THE WOLF OF WALL STREET 2", image: "images/PM37.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p39',name: "ONCE UPON A TIME IN HOLLYWOOD", image: "images/PM38.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p40',name: "SEVEN 1", image: "images/PM39.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p41',name: "SEVEN 2", image: "images/PM40.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p42',name: "WHIPLASH 1", image: "images/PM41.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p43',name: "WHIPLASH 2", image: "images/PM42.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p44',name: "THE DARK KNIGHT 1", image: "images/PM43.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p45',name: "THE DARK KNIGHT 2", image: "images/PM44.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p46',name: "AMERICAN PSYCHO 1", image: "images/PM45.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p47',name: "AMERICAN PSYCHO 2", image: "images/PM46.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p48',name: "GOODFELLAS 1", image: "images/PM47.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p49',name: "GOODFELLAS 2", image: "images/PM48.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p50',name: "THE GODFATHER 1", image: "images/PM49.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p51',name: "THE GODFATHER 2", image: "images/PM50.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p52',name: "INVINCIBLE", image: "images/PM51.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p53',name: "THE WALKING DEAD", image: "images/PM52.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p54',name: "MR ROBOT 1", image: "images/PM53.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p55',name: "MR ROBOT 2", image: "images/PM54.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p56',name: "THE BOYS", image: "images/PM55.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p57',name: "BOJACK HORSEMAN 1", image: "images/PM56.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p58',name: "BOJACK HORSEMAN 2", image: "images/PM57.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p59',name: "PRISONBREAK", image: "images/PM58.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p60',name: "GAME OF THRONES 1", image: "images/PM59.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p61',name: "GAME OF THRONES 2", image: "images/PM60.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p62',name: "STRANGER THINGS", image: "images/PM61.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p63',name: "SOPRANOS 1", image: "images/PM62.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p64',name: "SOPRANOS 2", image: "images/PM63.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p65',name: "YOU 1", image: "images/PM64.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p66',name: "YOU 2", image: "images/PM65.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p67',name: "DEXTER 1", image: "images/PM66.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p68',name: "DEXTER 2", image: "images/PM67.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id:'p69',name: "BREAKING BAD 1", image: "images/PM68.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p70',name: "BREAKING BAD 2", image: "images/PM69.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p71',name: "BETTER CALL SAUL 1", image: "images/PM70.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p3', name: "BETTER CALL SAUL 2", image: "images/PM71.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p72',name: "TERRIFIER", image: "images/PM73.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },
        { id: 'p73',name: "SHAMS EL ZNATY", image: "images/PM72.jpg", category: "Poster", subcategory: "Movies & Series", price: 100 },

        {id: 'PC1',name: "COUNTACH LAMBO POSTER", image: "images/PC1.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC2',name: "SHELBY GT500 1967 POSTER", image: "images/PC2.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC3',name: "BMW M8 POSTER", image: "images/PC3.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC4',name: "MCLAAREN P1 GTR POSTER", image: "images/PC4.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC5',name: "MCLAAREN P1 GTR POSTER", image: "images/PC5.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC6',name: "MCLAREN F1 GTR POSTER", image: "images/PC6.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC7',name: "PORSCHE BRABUS 911 POSTER", image: "images/PC7.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC8',name: "PORSCHE 918 POSTER", image: "images/PC8.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC9',name: "BMW E30 M3 1 POSTER", image: "images/PC9.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC10',name: "PORSCHE 911 GT3 RS 1 POSTER", image: "images/PC10.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC11',name: "TOYOTA AE86 POSTER", image: "images/PC11.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC12',name: "MAZDA RX-7 POSTER", image: "images/PC12.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC13',name: "PORSCHE 911 GT3 RS 2 POSTER", image: "images/PC13.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC14',name: "BMW E30 M3 2 POSTER", image: "images/PC14.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC15',name: "FERRARI F40 1987 POSTER", image: "images/PC15.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC16',name: "PORSCHE 911 GT3 RS 3 POSTER", image: "images/PC16.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC17',name: "PORSCHE 911 GT3 RS 4 POSTER", image: "images/PC17.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC18',name: "BMW M4 CSL POSTER", image: "images/PC18.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC19',name: "PORSCHE 911 GT3 RS 5 POSTER", image: "images/PC19.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC20',name: "BMW E30 M3 3 POSTER", image: "images/PC20.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        {id: 'PC21',name: "PORSCHE 911 GT3 RS 6", image: "images/PC21.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC22',name: "TOYOTA SUPRA MK4 POSTER", image: "images/PC22.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC23',name: "MCLAREN 7205 POSTER", image: "images/PC23.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC24',name: "MERCEDES AMG GT POSTER", image: "images/PC24.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC25',name: "NISSAN SKYLINE POSTER", image: "images/PC25.jpg", category: "Poster", subcategory: "Cars", price: 100 },
        { id: 'PC26',name: "BMW CAR POSTER", image: "images/PC26.jpg", category: "Poster", subcategory: "Cars", price: 100 },

         { id: 'PR1',name: "TRAVIS SCOTT 1 POSTER", image: "images/PR1.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR2',name: "2 PAC POSTER", image: "images/PR2.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR3',name: "TRAVIS SCOTT 2 POSTER", image: "images/PR3.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR4',name: "BILLIE EILISH 1 POSTER", image: "images/PR4.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR5',name: "BILLIE EILISH 2 POSTER", image: "images/PR5.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR6',name: "FAIROUZ POSTER", image: "images/PR6.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR7',name: "MICHEAL JAACKSON POSTER", image: "images/PR7.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR8',name: "LANA DEL RAY 1 POSTER", image: "images/PR8.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR9',name: "LANA DEL RAY 2 POSTER", image: "images/PR9.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR10',name: "SELENA GOMEZ 1 POSTER", image: "images/PR10.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR11',name: "SELENA GOMEZ 2 POSTER", image: "images/PR11.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR12',name: "ADELE 1 POSTER", image: "images/PR12.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR13',name: "ADELE 2 POSTER", image: "images/PR13.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR14',name: "DRAKE 1 POSTER", image: "images/PR14.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR15',name: "DRAKE 2 POSTER", image: "images/PR15.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR16',name: "THE WEEKEND 1 POSTER", image: "images/PR16.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR17',name: "THE WEEKEND 2 POSTER", image: "images/PR17.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR18',name: "KENDRICK LAMAR 1 POSTER", image: "images/PR18.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR19',name: "SZA 1 POSTER", image: "images/PR19.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR20',name: "SZA 2 POSTER", image: "images/PR20.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR21',name: "KENDRICK LAMAR 2 POSTER", image: "images/PR21.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR22',name: "CAIROKEE 1 POSTER", image: "images/PR22.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR23',name: "CAAIROKEE 2 POSTER", image: "images/PR23.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR24',name: "EMINEM 1 POSTER", image: "images/PR24.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR25',name: "EMINEM 2 POSTER", image: "images/PR25.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR26',name: "TV GIRL 1 POSTER", image: "images/PR26.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR27',name: "TV GIRL 2 POSTER", image: "images/PR27.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR28',name: "ABD AL HELIM POSTER", image: "images/PR28.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR29',name: "OM KALTHOUM POSTER", image: "images/PR29.jpg", category: "Poster", subcategory: "Musicians", price: 100 },
         { id: 'PR30',name: "ARCTIC MONKEYS POSTER", image: "images/PR30.jpg", category: "Poster", subcategory: "Musicians", price: 100 },


        { id: 'PF1',name: "KYLIAAN MBAPPE 1 POSTER", image: "images/PF1.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF2',name: "CR7 1 POSTER", image: "images/PF2.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF3',name: "PALMAR 1 POSTER", image: "images/PF3.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF4',name: "CR7 2 POSTER", image: "images/PF4.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF5',name: "PALMAR 2 POSTER", image: "images/PF5.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF6',name: "PIRLO POSTER", image: "images/PF6.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF7',name: "MANCHESTER UNITED POSTER", image: "images/PF7.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF8',name: "ZIDAN POSTER", image: "images/PF8.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF9',name: "CR7 3 POSTER", image: "images/PF9.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF10',name: "MESSI 1 POSTER", image: "images/PF10.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF11',name: "RONALDINHO POSTER", image: "images/PF11.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF12',name: "NEYMAR POSTER", image: "images/PF12.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF13',name: "KYLIAN MBAPPE 2 POSTER", image: "images/PF13.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF14',name: "MESSI 2 POSTER", image: "images/PF14.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF15',name: "MESSI 3 POSTER", image: "images/PF15.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF16',name: "LAMINE YAMAL  POSTER", image: "images/PF16.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF17',name: "KYLIAN MBAPPE 3 POSTER", image: "images/PF17.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF18',name: "CR7 4 POSTER", image: "images/PF18.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF19',name: "REAL MADRID POSTER", image: "images/PF19.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF20',name: "BARCELONA POSTER", image: "images/PF20.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF21',name: "CR7 5 POSTER", image: "images/PF21.jpg", category: "Poster", subcategory: "Quotes", price: 100 },
        { id: 'PF22',name: "CR7 6 POSTER", image: "images/PF22.jpg", category: "Poster", subcategory: "Quotes", price: 100 },

       { id: 'PQ1',name: "COASTEL LIFE", image: "images/PQ1.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ2',name: "NIKE 1 POSTER", image: "images/PQ2.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ3',name: "8 BALL POSTER", image: "images/PQ3.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ4',name: "ART 1 POSTER", image: "images/PQ4.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ5',name: "8 BALL X STUSSY POSTER", image: "images/PQ5.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ6',name: "PARIS POSTER", image: "images/PQ6.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ7',name: "ROME POSTER", image: "images/PQ7.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ8',name: "ART 2 POSTER", image: "images/PQ8.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ9',name: "ART 3 POSTER", image: "images/PQ9.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ10',name: "ILIA TOPURIA POSTER", image: "images/PQ10.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ11',name: "MIKE TYSON POSTER", image: "images/PQ11.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ12',name: "MIKE TYSON 2 POSTER", image: "images/PQ12.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ13',name: "SATURN POSTER", image: "images/PQ13.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ14',name: "QUOTE 1 POSTER", image: "images/PQ14.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ15',name: "QUOTE 2 POSTER", image: "images/PQ15.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ16',name: "QUOTE 3 POSTER", image: "images/PQ16.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ17',name: "QUOTE 4 POSTER", image: "images/PQ17.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ18',name: "QUOTE 5 POSTER", image: "images/PQ18.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ19',name: "QUOTE 6 POSTER", image: "images/PQ19.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ20',name: "QUOTE 7 POSTER", image: "images/PQ20.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ21',name: "QUOTE 8 POSTER", image: "images/PQ21.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ22',name: "QUOTE 9 POSTER", image: "images/PQ22.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ23',name: "QUOTE 10 POSTER", image: "images/PQ23.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ24',name: "QUOTE 11 POSTER", image: "images/PQ24.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ25',name: "QUOTE 12 POSTER", image: "images/PQ25.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ26',name: "QUOTE 13 POSTER", image: "images/PQ26.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ27',name: "MOHAMED ALI POSTER", image: "images/PQ27.jpg", category: "Poster", subcategory: "Other", price: 100 },
       { id: 'PQ28',name: "NIKE 2 POSTER", image: "images/PQ28.jpg", category: "Poster", subcategory: "Other", price: 100 },
    ];

    // Filter to get only individual posters and sort custom to top
    const initialProductsDataFiltered = allIndividualPosters
        .filter(p => p.category === "Poster")
        .sort((a, b) => (b.isCustomizable || false) - (a.isCustomizable || false));

    let currentFilteredIndividualPosters = [...initialProductsDataFiltered]; // This will hold filtered designs
    let selectedDesigns = currentPackSelection.selectedDesigns || []; // Designs chosen for the current pack

    const requiredPosterCount = currentPackSelection.posterCount;
    const CUSTOM_DESIGN_FEE_PER_POSTER = 20; // Define custom fee for individual posters

    const container = document.getElementById("productsContainer");
    const packNameDisplay = document.getElementById("packNameDisplay");
    const requiredSelectionsSpan = document.getElementById("requiredSelections");
    const currentSelectionsSpan = document.getElementById("currentSelections");
    const maxSelectionsSpan = document.getElementById("maxSelections");
    const selectionProgressBar = document.getElementById("selectionProgressBar");
    const addPackToBasketBtn = document.getElementById("addPackToBasketBtn");
    const filterIcon = document.getElementById('filterIcon'); // Filter icon now relevant
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const priceRangeSlider = document.getElementById('priceRangeSlider'); // Will be disabled on this page
    const minPriceOutput = document.getElementById('minPrice');
    const maxPriceOutput = document.getElementById('maxPrice');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Subcategory filter elements (relevant for individual posters)
    const subMoviesSeriesCheckbox = document.getElementById('subMoviesSeries');
    const subCarsCheckbox = document.getElementById('subCars');
    const subMusiciansCheckbox = document.getElementById('subMusicians');
    const subQuotesCheckbox = document.getElementById('subQuotes');
    const subOtherPostersCheckbox = document.getElementById('subOtherPosters');
    const subCustomPostersCheckbox = document.getElementById('subCustomPosters'); // Get the Custom checkbox

    const sortLowToHighRadio = document.getElementById('sortLowToHigh');
    const sortHighToLowRadio = document.getElementById('sortHighToLow');
    const sortDefaultRadio = document.getElementById('sortDefault');

    let currentMinPrice = 0; // Not actively used for filtering price, but for range display
    let currentMaxPrice = parseInt(priceRangeSlider ? priceRangeSlider.max : 150);
    let currentSortOrder = 'default';


    // Update header with pack details
    if (packNameDisplay) packNameDisplay.innerText = `Select Posters for Your ${currentPackSelection.packName}`;
    if (requiredSelectionsSpan) requiredSelectionsSpan.innerText = requiredPosterCount;
    if (maxSelectionsSpan) maxSelectionsSpan.innerText = requiredPosterCount;

    // Function to update the selection count and button state
    function updateSelectionStatus() {
        currentSelectionsSpan.innerText = selectedDesigns.length;
        const progressPercentage = (selectedDesigns.length / requiredPosterCount) * 100;
        selectionProgressBar.style.width = `${progressPercentage}%`;
        selectionProgressBar.innerText = `${selectedDesigns.length}/${requiredPosterCount}`;

        if (selectedDesigns.length === requiredPosterCount) {
            addPackToBasketBtn.disabled = false;
            window.showNotification(`You have selected ${requiredPosterCount} posters. Ready to add to basket!`);
        } else {
            addPackToBasketBtn.disabled = true;
        }
        console.log(`Selected designs: ${selectedDesigns.length}/${requiredPosterCount}. Button enabled: ${!addPackToBasketBtn.disabled}`);
        // Save current selections to sessionStorage
        currentPackSelection.selectedDesigns = selectedDesigns;
        sessionStorage.setItem('currentPosterPackSelection', JSON.stringify(currentPackSelection));
    }

    /**
     * Renders individual posters to the page.
     */
    function renderIndividualPosters(postersToRender) {
        console.log(`renderIndividualPosters() called. Rendering ${postersToRender.length} posters.`);
        container.innerHTML = '';
        if (postersToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 50px;">No individual poster designs found matching your criteria.</p>';
        }

        postersToRender.forEach((poster) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            // Check if this particular design (poster.id) is present AT ALL in selectedDesigns.
            // This is for visual 'selected' class, not for unique selection enforcement.
            const isAnyInstanceSelected = selectedDesigns.some(design => design.id === poster.id);
            if (isAnyInstanceSelected) {
                productDiv.classList.add('selected');
            } else {
                productDiv.classList.remove('selected');
            }

            // Custom Design Options HTML (similar to Framed Posters)
            // The checkbox and its section should reflect the state of the *current product listing*
            // not a specific instance in selectedDesigns for multiple selections.
            const customDesignHtml = poster.isCustomizable ? `
                <div class="custom-design-option">
                    <label>
                        <input type="checkbox" id="custom-${poster.id}" class="custom-design-checkbox">
                        Custom Design (+${CUSTOM_DESIGN_FEE_PER_POSTER} L.E)
                    </label>
                    <div class="custom-image-upload" id="upload-section-${poster.id}" style="display:none;">
                        <input type="file" id="image-${poster.id}" accept="image/*">
                        <p class="custom-design-info">
                            After ordering, please send your image via WhatsApp to **01285272577**, including your **full name from the order** and **shipment number**.
                        </p>
                    </div>
                </div>
            ` : '';

            productDiv.innerHTML = `
                <img src="${poster.image}" alt="${poster.name}" class="product-img">
                <div class="product-name">${poster.name}</div>
                <p class="poster-price" style="display:none;">${poster.price} L.E</p> ${customDesignHtml}
                <button class="select-btn" data-id="${poster.id}" data-name="${poster.name}">Select Design</button>
                <div class="checkmark-overlay"><i class="fas fa-check-circle"></i></div>
            `;
            container.appendChild(productDiv);

            // Add event listeners for custom design checkbox and file input
            if (poster.isCustomizable) {
                const customCheckbox = productDiv.querySelector(`#custom-${poster.id}`);
                const uploadSection = productDiv.querySelector(`#upload-section-${poster.id}`);
                const imageInput = productDiv.querySelector(`#image-${poster.id}`);
                const selectBtn = productDiv.querySelector(`.select-btn[data-id="${poster.id}"]`);

                // Restore custom state from selectedDesigns if this exact product+custom combo was picked
                const existingInstance = selectedDesigns.find(d => d.id === poster.id && d.isCustomDesign);
                if (existingInstance) {
                    if (customCheckbox) customCheckbox.checked = true;
                    if (uploadSection) uploadSection.style.display = 'block';
                    // Note: Cannot re-populate file input for security reasons. User would re-select.
                    // This is why customImageFileName is important for confirmation page.
                }

                // Manage disabled state of 'Select Design' button based on custom choice and file upload
                if (selectBtn) { // Ensure button exists
                    selectBtn.disabled = (customCheckbox && customCheckbox.checked && (!imageInput || imageInput.files.length === 0));

                    customCheckbox && customCheckbox.addEventListener('change', () => {
                        uploadSection && (uploadSection.style.display = customCheckbox.checked ? 'block' : 'none');
                        selectBtn.disabled = customCheckbox.checked && (!imageInput || imageInput.files.length === 0);
                    });

                    imageInput && imageInput.addEventListener('change', () => {
                        selectBtn.disabled = customCheckbox.checked && (!imageInput || imageInput.files.length === 0);
                    });
                }
            }
        });
        document.getElementById("productCount").innerText = `${postersToRender.length} Individual Designs Available`;
        updateSelectionStatus(); // Re-evaluate selection status after re-rendering
    }

    /**
     * Filters and sorts individual posters based on current filter criteria.
     */
    function filterIndividualPosters() {
        console.log("filterIndividualPosters() called.");

        // Read selected subcategories
        selectedSubcategories = [];
        if (subMoviesSeriesCheckbox && subMoviesSeriesCheckbox.checked) selectedSubcategories.push('Movies & Series');
        if (subCarsCheckbox && subCarsCheckbox.checked) selectedSubcategories.push('Cars');
        if (subMusiciansCheckbox && subMusiciansCheckbox.checked) selectedSubcategories.push('Musicians');
        if (subQuotesCheckbox && subQuotesCheckbox.checked) selectedSubcategories.push('Quotes');
        if (subOtherPostersCheckbox && subOtherPostersCheckbox.checked) selectedSubcategories.push('Other');
        if (subCustomPostersCheckbox && subCustomPostersCheckbox.checked) selectedSubcategories.push('Custom');


        if (selectedSubcategories.length === 0) {
             console.warn("DEBUG: No subcategories selected. This will result in 0 products for subcategory filter.");
        }
        console.log("DEBUG: Selected subcategories for filtering:", selectedSubcategories);


        let filtered = initialProductsDataFiltered.filter(poster => { // Use initialProductsDataFiltered as base
            // No price filtering for individual posters on this page
            const matchesSubcategory = selectedSubcategories.includes(poster.subcategory);
            return matchesSubcategory;
        });

        console.log(`After subcategory filtering: ${filtered.length} posters.`);

        // Apply sorting: Custom product always first
        filtered.sort((a, b) => {
            if (a.isCustomizable && !b.isCustomizable) return -1; // Custom comes before non-custom
            if (!a.isCustomizable && b.isCustomizable) return 1; // Non-custom comes after custom

            // If both are custom or both are not custom, apply selected sort order
            if (currentSortOrder === 'lowToHigh') {
                return (a.price || 0) - (b.price || 0); // Use price for sorting, fallback to 0
            } else if (currentSortOrder === 'highToLow') {
                return (b.price || 0) - (a.price || 0);
            } else {
                // Default sort (original order, but keeping custom on top)
                return initialProductsDataFiltered.indexOf(a) - initialProductsDataFiltered.indexOf(b);
            }
        });

        currentFilteredIndividualPosters = filtered;
        renderIndividualPosters(currentFilteredIndividualPosters);
        console.log("filterIndividualPosters() finished. renderIndividualPosters() called.");
    }

    /**
     * Resets filters for individual posters.
     */
    function clearIndividualPosterFilters() {
        console.log("clearIndividualPosterFilters() called. Resetting filter state.");

        // Reset Subcategory Checkboxes to all checked
        if (subMoviesSeriesCheckbox) subMoviesSeriesCheckbox.checked = true;
        if (subCarsCheckbox) subCarsCheckbox.checked = true;
        if (subMusiciansCheckbox) subMusiciansCheckbox.checked = true;
        if (subQuotesCheckbox) subQuotesCheckbox.checked = true;
        if (subOtherPostersCheckbox) subOtherPostersCheckbox.checked = true;
        if (subCustomPostersCheckbox) subCustomPostersCheckbox.checked = true; // Reset Custom checkbox
        console.log("Subcategory checkboxes reset to all checked.");

        if (sortDefaultRadio) sortDefaultRadio.checked = true;
        currentSortOrder = 'default';
        console.log("Sort order reset to 'default'.");

        filterIndividualPosters();
        console.log("filterIndividualPosters() called from clearIndividualPosterFilters().");
    }

    // --- Event Listeners ---

    // Click handler for individual poster "Select Design" buttons AND custom options
    container.addEventListener('click', e => {
        const productDiv = e.target.closest('.product');
        if (!productDiv) return; // Ensure click is within a product div

        const posterId = productDiv.querySelector('.select-btn').getAttribute('data-id');
        const posterName = productDiv.querySelector('.product-name').innerText;
        const posterImage = productDiv.querySelector('.product-img').src;

        // Get custom design elements for this product (always retrieve fresh from DOM)
        const customCheckbox = productDiv.querySelector(`#custom-${posterId}`);
        const imageInput = productDiv.querySelector(`#image-${posterId}`);
        const selectBtn = productDiv.querySelector(`.select-btn[data-id="${posterId}"]`);

        let isCustomDesign = false;
        let customImageFileName = 'N/A';

        // Update custom status if checkbox is present and checked
        if (customCheckbox && customCheckbox.checked) {
            isCustomDesign = true;
            customImageFileName = (imageInput && imageInput.files.length > 0) ?
                                  imageInput.files[0].name : 'Image not provided on order, client must send via WhatsApp.';
        }

        // --- Handle clicks on custom checkbox or file input specifically ---
        if (e.target.classList.contains('custom-design-checkbox')) {
            // The change listener on the checkbox handles internal logic (display, button disabled state)
            // and updates selectedDesigns if this design is already selected.
            // We just need to re-render to reflect potentially new disabled state on other buttons
            // or re-evaluate selections if adding/removing custom.
            // No direct selection/deselection of the *poster* happens from this click.
            console.log(`Custom checkbox for ${posterName} toggled.`);
            updateSelectionStatus(); // Important to update counts and save state
            return; // Exit, don't proceed with poster selection/deselection logic
        }

        if (e.target.closest('.custom-image-upload')) {
            // The change listener on the file input handles its logic.
            // No direct selection/deselection of the *poster* happens from this click.
            console.log(`Custom image input for ${posterName} interacted with.`);
            updateSelectionStatus(); // Important to update counts and save state
            return; // Exit
        }

        // --- Now handle clicks that are meant to select/deselect the *poster* itself ---
        // This includes clicks on the 'Select Design' button or general product area (excluding custom options)

        // Prevent selection if the 'Select Design' button is disabled (e.g., custom chosen but no file)
        if (selectBtn && selectBtn.disabled) {
            window.showNotification('Please provide the custom image file first or uncheck "Custom Design".', 'warning');
            return;
        }

        // We need to check the current state of this specific design in selectedDesigns.
        // For allowing multiple selections, we'll check if the *number* of this design currently selected
        // allows for another selection, or if we need to remove one.

        // Find ALL currently selected instances of this specific design (posterId)
        const existingInstancesOfThisDesign = selectedDesigns.filter(design =>
            design.id === posterId &&
            design.isCustomDesign === isCustomDesign &&
            design.customImageFileName === customImageFileName
        );

        if (existingInstancesOfThisDesign.length > 0 && selectedDesigns.length === requiredPosterCount) {
             // If we've already selected max posters AND this specific design is already picked,
             // then this click means we want to UNSELECT one instance of it.
             // This is a common UX for toggling selection when max is reached.
             const indexToRemove = selectedDesigns.findIndex(design =>
                 design.id === posterId &&
                 design.isCustomDesign === isCustomDesign &&
                 design.customImageFileName === customImageFileName
             );
             if (indexToRemove !== -1) {
                 selectedDesigns.splice(indexToRemove, 1);
                 window.showNotification(`"${posterName}" unselected.`, 'warning');
             }
        } else if (selectedDesigns.length < requiredPosterCount) {
            // We can still add more designs
            const fullPosterDetails = allIndividualPosters.find(p => p.id === posterId);
            if (!fullPosterDetails) {
                console.error("Selected poster details not found in allIndividualPosters for ID:", posterId);
                return;
            }
            selectedDesigns.push({
                id: posterId,
                name: posterName,
                image: posterImage,
                category: fullPosterDetails.category,
                subcategory: fullPosterDetails.subcategory,
                isCustomDesign: isCustomDesign,
                customImageFileName: customImageFileName
            });
            window.showNotification(`"${posterName}" selected!`);
        } else {
            // Max selections reached, and this specific design is not being unselected.
            window.showNotification(`You have already selected ${requiredPosterCount} posters. Please unselect one first to choose another.`, 'warning');
        }

        // After modification of selectedDesigns array, ensure visual 'selected' class is correct.
        // A product is 'selected' if ANY instance of it exists in the selectedDesigns array.
        const isCurrentlySelectedVisually = selectedDesigns.some(design => design.id === posterId);
        if (isCurrentlySelectedVisually) {
            productDiv.classList.add('selected');
        } else {
            productDiv.classList.remove('selected');
        }

        updateSelectionStatus(); // Always update status after attempted selection/deselection
    });


    // Add Pack to Basket button click handler
    if (addPackToBasketBtn) {
        addPackToBasketBtn.addEventListener('click', () => {
            if (selectedDesigns.length !== requiredPosterCount) {
                window.showNotification(`Please select exactly ${requiredPosterCount} posters before adding the pack to basket.`, 'warning');
                return;
            }

            // Before adding to basket, check if any selected custom designs are missing files
            const missingCustomFiles = selectedDesigns.some(design =>
                design.isCustomDesign && design.customImageFileName === 'Image not provided on order, client must send via WhatsApp.'
            );

            if (missingCustomFiles) {
                window.showNotification('Some selected custom designs are missing image files. Please upload them or unselect the custom option.', 'warning');
                return;
            }


            let basket = window.basket;

            // Prepare the pack item for the basket
            const packItem = {
                id: currentPackSelection.packId,
                name: currentPackSelection.packName,
                image: currentPackSelection.packImage,
                originalPrice: currentPackSelection.selectedSizePrice, // Store the calculated price for this size
                price: currentPackSelection.selectedSizePrice, // Price per pack (not per individual poster)
                qty: currentPackSelection.qtyOfPacks,
                total: currentPackSelection.selectedSizePrice * currentPackSelection.qtyOfPacks,
                category: "Poster Pack",
                size: currentPackSelection.selectedSize,
                packPosterCount: currentPackSelection.posterCount, // Add this for clarity in checkout/order confirmation
                selectedDesigns: selectedDesigns.map(d => ({ // Map to ensure only necessary data is stored for each design
                    id: d.id,
                    name: d.name,
                    image: d.image,
                    category: d.category,
                    subcategory: d.subcategory,
                    isCustomDesign: d.isCustomDesign || false, // Ensure this property exists
                    customImageFileName: d.customImageFileName || 'N/A' // Ensure this property exists
                }))
            };

            // Add to basket (can handle multiple packs of the same type and size, but different designs)
            // For simplicity, for poster packs, we'll always add as a new item,
            // as the selected designs make each "pack" unique even if the pack type/size is the same.
            basket.push(packItem);
            window.basket = basket;
            window.updateBasketDisplay();
            console.log("Pack added to basket:", packItem);

            window.showNotification(`${packItem.name} (${packItem.selectedDesigns.length} designs) added to cart!`);

            // Clear sessionStorage after successful addition to basket
            sessionStorage.removeItem('currentPosterPackSelection');

            // Redirect back to poster_packs.html or checkout.html as desired
            window.location.href = 'poster_packs.html'; // Or 'checkout.html'
        });
    }

    // Filter Overlay and related event listeners (similar to other product pages)
    if (filterIcon && filterOverlay && filterCloseBtn && priceRangeSlider && applyFiltersBtn && clearFiltersBtn &&
        subMoviesSeriesCheckbox && subCarsCheckbox && subMusiciansCheckbox && subQuotesCheckbox && subOtherPostersCheckbox && subCustomPostersCheckbox &&
        sortLowToHighRadio && sortHighToLowRadio && sortDefaultRadio) {

        console.log("Filter elements found. Attaching filter event listeners for poster selection.");

        // Disable price range slider on this page as prices are not relevant for individual selections
        if (priceRangeSlider) priceRangeSlider.disabled = true;
        if (minPriceOutput) minPriceOutput.style.color = '#777'; // Gray out price display
        if (maxPriceOutput) maxPriceOutput.style.color = '#777';

        filterIcon.onclick = (e) => {
            e.stopPropagation();
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
        };

        // Subcategory checkbox listeners
        if (subMoviesSeriesCheckbox) subMoviesSeriesCheckbox.addEventListener('change', filterIndividualPosters);
        if (subCarsCheckbox) subCarsCheckbox.addEventListener('change', filterIndividualPosters);
        if (subMusiciansCheckbox) subMusiciansCheckbox.addEventListener('change', filterIndividualPosters);
        if (subQuotesCheckbox) subQuotesCheckbox.addEventListener('change', filterIndividualPosters);
        if (subOtherPostersCheckbox) subOtherPostersCheckbox.addEventListener('change', filterIndividualPosters);
        if (subCustomPostersCheckbox) subCustomPostersCheckbox.addEventListener('change', filterIndividualPosters);
        console.log("Subcategory checkbox listeners attached for individual posters.");


        // Sort By Radio Buttons
        if (sortLowToHighRadio) sortLowToHighRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterIndividualPosters(); });
        if (sortHighToLowRadio) sortHighToLowRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterIndividualPosters(); });
        if (sortDefaultRadio) sortDefaultRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterIndividualPosters(); });
        console.log("Sort By radio button listeners attached for individual posters.");


        applyFiltersBtn.onclick = () => {
            filterIndividualPosters();
            window.toggleMenuWithAnimation(filterOverlay, false);
        };

        clearFiltersBtn.onclick = () => {
            clearIndividualPosterFilters();
            window.toggleMenuWithAnimation(filterOverlay, false);
        };

        filterOverlay.addEventListener('click', (e) => e.stopPropagation());

    } else {
        console.warn("poster_selection.js: One or more filter elements not found. Filtering functionality might be disabled on this page.");
    }

    // CRITICAL INITIALIZATION FIX for default filter state
    // This runs once when DOMContentLoaded fires.
    const allSubcategoryCheckboxes = [subMoviesSeriesCheckbox, subCarsCheckbox, subMusiciansCheckbox, subQuotesCheckbox, subOtherPostersCheckbox, subCustomPostersCheckbox];
    
    // Set all subcategory checkboxes to checked by default on load
    allSubcategoryCheckboxes.forEach(checkbox => {
        if (checkbox) checkbox.checked = true;
    });
    console.log("poster_selection.js: All subcategory checkboxes defaulted to checked.");


    // Initial render and status update
    filterIndividualPosters(); // Render initial posters with any default filters
    updateSelectionStatus(); // Update initial selection count and button state
    window.updateBasketDisplay();
    console.log("poster_selection.js: Initial render and status update complete.");
});
