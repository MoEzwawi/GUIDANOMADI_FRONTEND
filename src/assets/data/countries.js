const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua e Barbuda", code: "AG" },
    { name: "Arabia Saudita", code: "SA" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaigian", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrein", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belgio", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bielorussia", code: "BY" },
    { name: "Birmania (Myanmar)", code: "MM" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia ed Erzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brasile", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambogia", code: "KH" },
    { name: "Camerun", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Ciad", code: "TD" },
    { name: "Cile", code: "CL" },
    { name: "Cina", code: "CN" },
    { name: "Cipro", code: "CY" },
    { name: "Città del Vaticano", code: "VA" },
    { name: "Colombia", code: "CO" },
    { name: "Comore", code: "KM" },
    { name: "Congo, Repubblica del", code: "CG" },
    { name: "Congo, Repubblica Democratica del", code: "CD" },
    { name: "Corea del Nord", code: "KP" },
    { name: "Corea del Sud", code: "KR" },
    { name: "Costa d'Avorio", code: "CI" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croazia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Danimarca", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Repubblica Dominicana", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egitto", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Emirati Arabi Uniti", code: "AE" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Etiopia", code: "ET" },
    { name: "Figi", code: "FJ" },
    { name: "Filippine", code: "PH" },
    { name: "Finlandia", code: "FI" },
    { name: "Francia", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germania", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Giamaica", code: "JM" },
    { name: "Giappone", code: "JP" },
    { name: "Giordania", code: "JO" },
    { name: "Grecia", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Irlanda", code: "IE" },
    { name: "Islanda", code: "IS" },
    { name: "Isole Marshall", code: "MH" },
    { name: "Italia", code: "IT" },
    { name: "Kazakistan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kirghizistan", code: "KG" },
    { name: "Kiribati", code: "KI" },
    { name: "Kosovo", code: "XK" },
    { name: "Kuwait", code: "KW" },
    { name: "Laos", code: "LA" },
    { name: "Lesotho", code: "LS" },
    { name: "Lettonia", code: "LV" },
    { name: "Libano", code: "LB" },
    { name: "Liberia", code: "LR" },
    { name: "Libia", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lituania", code: "LT" },
    { name: "Lussemburgo", code: "LU" },
    { name: "Macedonia del Nord", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Maldive", code: "MV" },
    { name: "Malesia", code: "MY" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marocco", code: "MA" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Messico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldavia", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Mozambico", code: "MZ" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Norvegia", code: "NO" },
    { name: "Nuova Zelanda", code: "NZ" },
    { name: "Oman", code: "OM" },
    { name: "Paesi Bassi", code: "NL" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Panama", code: "PA" },
    { name: "Papua Nuova Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Perù", code: "PE" },
    { name: "Polonia", code: "PL" },
    { name: "Portogallo", code: "PT" },
    { name: "Porto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Regno Unito", code: "GB" },
    { name: "Repubblica Ceca", code: "CZ" },
    { name: "Repubblica Centrafricana", code: "CF" },
    { name: "Repubblica Dominicana", code: "DO" },
    { name: "Repubblica Sudafricana", code: "ZA" },
    { name: "Romania", code: "RO" },
    { name: "Ruanda", code: "RW" },
    { name: "Russia", code: "RU" },
    { name: "Saint Kitts e Nevis", code: "KN" },
    { name: "Santa Lucia", code: "LC" },
    { name: "Saint Vincent e Grenadine", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tomé e Principe", code: "ST" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Siria", code: "SY" },
    { name: "Slovacchia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Somalia", code: "SO" },
    { name: "Spagna", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Stati Uniti d'America", code: "US" },
    { name: "Sud Sudan", code: "SS" },
    { name: "Sudan", code: "SD" },
    { name: "Svezia", code: "SE" },
    { name: "Svizzera", code: "CH" },
    { name: "Suriname", code: "SR" },
    { name: "Swaziland (Eswatini)", code: "SZ" },
    { name: "Tagikistan", code: "TJ" },
    { name: "Tailandia", code: "TH" },
    { name: "Taiwan", code: "TW" },
    { name: "Tanzania", code: "TZ" },
    { name: "Timor Est", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad e Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turchia", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Ucraina", code: "UA" },
    { name: "Uganda", code: "UG" },
    { name: "Ungheria", code: "HU" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" }
];


export default countries