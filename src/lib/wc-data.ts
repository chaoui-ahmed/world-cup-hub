// World Cup 2026 dataset.
// USA · Canada · Mexico · June 11 – July 19, 2026 · 48 teams, 12 groups.
// Team brand colors are official national palettes (hex). Match times stored in UTC,
// displayed in Europe/Paris by default per the editorial spec.

export type Team = {
  id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  confederation: string;
  fifaRank: number;
  primary: string;   // hex
  secondary: string; // hex
  accent: string;    // hex
  coach: string;
  captain: string;
  stadium: string;
  style: string;
  formation: string;
  recentForm: ("W" | "D" | "L")[];
  titles: number;
};

export type Player = {
  name: string;
  number: number;
  position: "GK" | "DF" | "MF" | "FW";
  age: number;
  club: string;
  caps: number;
  goals: number;
  assists?: number;
  rating: number;
  notes: string;
};

export type Match = {
  id: string;
  group: string | "R32" | "R16" | "QF" | "SF" | "3rd" | "F";
  stage: "Group" | "R32" | "R16" | "QF" | "SF" | "3rd" | "Final";
  homeId: string;
  awayId: string;
  kickoffUTC: string;
  venue: string;
  venueId: string;
  city: string;
  status: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
};

export type Injury = {
  player: string;
  teamId: string;
  injury: string;
  status: "Out" | "Doubtful" | "Returning";
  expected: string;
  updated: string;
};

// --- 48 Teams with official brand colors -----------------------------------

export const TEAMS: Team[] = [
  // Group A
  { id: "mex", name: "Mexico", code: "MEX", flag: "🇲🇽", group: "A", confederation: "CONCACAF", fifaRank: 14, primary: "#006847", secondary: "#FFFFFF", accent: "#CE1126", coach: "Javier Aguirre", captain: "Edson Álvarez", stadium: "Estadio Azteca", style: "High pressing, quick wing play, vertical transitions.", formation: "4-3-3", recentForm: ["W","W","D","L","W"], titles: 0 },
  { id: "uru", name: "Uruguay", code: "URU", flag: "🇺🇾", group: "A", confederation: "CONMEBOL", fifaRank: 11, primary: "#0093DD", secondary: "#FFFFFF", accent: "#000000", coach: "Marcelo Bielsa", captain: "Federico Valverde", stadium: "Estadio Centenario", style: "Aggressive man-marking, vertical attacks under Bielsa.", formation: "3-3-1-3", recentForm: ["W","W","W","D","W"], titles: 2 },
  { id: "ned", name: "Netherlands", code: "NED", flag: "🇳🇱", group: "A", confederation: "UEFA", fifaRank: 6, primary: "#FF6900", secondary: "#000000", accent: "#FFFFFF", coach: "Ronald Koeman", captain: "Virgil van Dijk", stadium: "Johan Cruyff Arena", style: "Possession-based, build-up from the back.", formation: "4-2-3-1", recentForm: ["W","D","W","W","L"], titles: 0 },
  { id: "iri", name: "Iran", code: "IRN", flag: "🇮🇷", group: "A", confederation: "AFC", fifaRank: 20, primary: "#239F40", secondary: "#FFFFFF", accent: "#DA0000", coach: "Amir Ghalenoei", captain: "Alireza Jahanbakhsh", stadium: "Azadi Stadium", style: "Compact low block, counter-attacks.", formation: "4-1-4-1", recentForm: ["W","L","W","D","W"], titles: 0 },

  // Group B
  { id: "can", name: "Canada", code: "CAN", flag: "🇨🇦", group: "B", confederation: "CONCACAF", fifaRank: 38, primary: "#FF0000", secondary: "#FFFFFF", accent: "#000000", coach: "Jesse Marsch", captain: "Alphonso Davies", stadium: "BMO Field", style: "Direct, energetic, exploits pace on the flanks.", formation: "4-2-3-1", recentForm: ["W","W","L","W","D"], titles: 0 },
  { id: "bel", name: "Belgium", code: "BEL", flag: "🇧🇪", group: "B", confederation: "UEFA", fifaRank: 8, primary: "#ED2939", secondary: "#FAE042", accent: "#000000", coach: "Domenico Tedesco", captain: "Kevin De Bruyne", stadium: "King Baudouin", style: "Creative midfield, technical build-up.", formation: "3-4-2-1", recentForm: ["W","D","W","W","W"], titles: 0 },
  { id: "jpn", name: "Japan", code: "JPN", flag: "🇯🇵", group: "B", confederation: "AFC", fifaRank: 17, primary: "#0033A0", secondary: "#FFFFFF", accent: "#BC002D", coach: "Hajime Moriyasu", captain: "Wataru Endo", stadium: "International Stadium Yokohama", style: "Quick combination play, intense pressing.", formation: "4-2-3-1", recentForm: ["W","W","W","D","W"], titles: 0 },
  { id: "mar", name: "Morocco", code: "MAR", flag: "🇲🇦", group: "B", confederation: "CAF", fifaRank: 13, primary: "#C1272D", secondary: "#006233", accent: "#FFFFFF", coach: "Walid Regragui", captain: "Hakim Ziyech", stadium: "Stade Mohammed V", style: "Disciplined defense, lethal on transitions.", formation: "4-3-3", recentForm: ["W","W","W","W","D"], titles: 0 },

  // Group C
  { id: "usa", name: "United States", code: "USA", flag: "🇺🇸", group: "C", confederation: "CONCACAF", fifaRank: 16, primary: "#0A2240", secondary: "#BF0A30", accent: "#FFFFFF", coach: "Mauricio Pochettino", captain: "Christian Pulisic", stadium: "MetLife Stadium", style: "Athletic, high-energy pressing, ball-playing fullbacks.", formation: "4-3-3", recentForm: ["W","W","D","W","L"], titles: 0 },
  { id: "ger", name: "Germany", code: "GER", flag: "🇩🇪", group: "C", confederation: "UEFA", fifaRank: 9, primary: "#000000", secondary: "#DD0000", accent: "#FFCE00", coach: "Julian Nagelsmann", captain: "Joshua Kimmich", stadium: "Allianz Arena", style: "Positional play, structured high press.", formation: "4-2-3-1", recentForm: ["W","W","W","D","W"], titles: 4 },
  { id: "kor", name: "South Korea", code: "KOR", flag: "🇰🇷", group: "C", confederation: "AFC", fifaRank: 22, primary: "#CD2E3A", secondary: "#003478", accent: "#FFFFFF", coach: "Hong Myung-bo", captain: "Son Heung-min", stadium: "Seoul World Cup Stadium", style: "Fast, vertical, technically sharp.", formation: "4-2-3-1", recentForm: ["W","D","W","W","L"], titles: 0 },
  { id: "ecu", name: "Ecuador", code: "ECU", flag: "🇪🇨", group: "C", confederation: "CONMEBOL", fifaRank: 31, primary: "#FFD100", secondary: "#034EA2", accent: "#ED1C24", coach: "Sebastián Beccacece", captain: "Enner Valencia", stadium: "Estadio Monumental", style: "Physical midfield, organized defense.", formation: "4-4-2", recentForm: ["D","W","W","D","W"], titles: 0 },

  // Group D
  { id: "fra", name: "France", code: "FRA", flag: "🇫🇷", group: "D", confederation: "UEFA", fifaRank: 2, primary: "#002654", secondary: "#FFFFFF", accent: "#ED2939", coach: "Didier Deschamps", captain: "Kylian Mbappé", stadium: "Stade de France", style: "Compact 4-3-3 with devastating counter-attacks.", formation: "4-3-3", recentForm: ["W","W","W","W","D"], titles: 2 },
  { id: "sen", name: "Senegal", code: "SEN", flag: "🇸🇳", group: "D", confederation: "CAF", fifaRank: 19, primary: "#00853F", secondary: "#FDEF42", accent: "#E31B23", coach: "Pape Thiaw", captain: "Kalidou Koulibaly", stadium: "Stade Abdoulaye Wade", style: "Power, pace, dominant in duels.", formation: "4-3-3", recentForm: ["W","W","D","W","W"], titles: 0 },
  { id: "aus", name: "Australia", code: "AUS", flag: "🇦🇺", group: "D", confederation: "AFC", fifaRank: 25, primary: "#00843D", secondary: "#FFCD00", accent: "#FFFFFF", coach: "Tony Popovic", captain: "Mathew Ryan", stadium: "Stadium Australia", style: "Organized, hard-working, set-piece threat.", formation: "4-2-3-1", recentForm: ["W","D","W","L","W"], titles: 0 },
  { id: "qat", name: "Qatar", code: "QAT", flag: "🇶🇦", group: "D", confederation: "AFC", fifaRank: 36, primary: "#8A1538", secondary: "#FFFFFF", accent: "#C49A6C", coach: "Tintín Márquez", captain: "Hassan Al-Haydos", stadium: "Lusail Stadium", style: "Possession, patient build-up.", formation: "5-3-2", recentForm: ["D","W","L","W","D"], titles: 0 },

  // Group E
  { id: "arg", name: "Argentina", code: "ARG", flag: "🇦🇷", group: "E", confederation: "CONMEBOL", fifaRank: 1, primary: "#75AADB", secondary: "#FFFFFF", accent: "#F6B40E", coach: "Lionel Scaloni", captain: "Lionel Messi", stadium: "Estadio Monumental", style: "Balanced, technical, ruthless transitions.", formation: "4-4-2", recentForm: ["W","W","W","D","W"], titles: 3 },
  { id: "ned2", name: "Norway", code: "NOR", flag: "🇳🇴", group: "E", confederation: "UEFA", fifaRank: 33, primary: "#BA0C2F", secondary: "#00205B", accent: "#FFFFFF", coach: "Ståle Solbakken", captain: "Martin Ødegaard", stadium: "Ullevaal Stadion", style: "Direct, Haaland-led vertical attacks.", formation: "4-3-3", recentForm: ["W","W","W","W","D"], titles: 0 },
  { id: "nzl", name: "New Zealand", code: "NZL", flag: "🇳🇿", group: "E", confederation: "OFC", fifaRank: 88, primary: "#000000", secondary: "#FFFFFF", accent: "#CC0000", coach: "Darren Bazeley", captain: "Chris Wood", stadium: "Eden Park", style: "Physical, defensively compact, aerial threat.", formation: "5-4-1", recentForm: ["W","L","W","D","L"], titles: 0 },
  { id: "tun", name: "Tunisia", code: "TUN", flag: "🇹🇳", group: "E", confederation: "CAF", fifaRank: 41, primary: "#E70013", secondary: "#FFFFFF", accent: "#000000", coach: "Sami Trabelsi", captain: "Youssef Msakni", stadium: "Stade Hammadi Agrebi", style: "Low block, set-piece reliant.", formation: "4-1-4-1", recentForm: ["D","W","L","D","W"], titles: 0 },

  // Group F
  { id: "esp", name: "Spain", code: "ESP", flag: "🇪🇸", group: "F", confederation: "UEFA", fifaRank: 3, primary: "#C60B1E", secondary: "#FFC400", accent: "#FFFFFF", coach: "Luis de la Fuente", captain: "Rodri", stadium: "Santiago Bernabéu", style: "Possession + vertical wingers, dynamic press.", formation: "4-3-3", recentForm: ["W","W","W","W","W"], titles: 1 },
  { id: "egy", name: "Egypt", code: "EGY", flag: "🇪🇬", group: "F", confederation: "CAF", fifaRank: 32, primary: "#C8102E", secondary: "#FFFFFF", accent: "#000000", coach: "Hossam Hassan", captain: "Mohamed Salah", stadium: "Cairo International Stadium", style: "Salah-centric, fast transitions.", formation: "4-2-3-1", recentForm: ["W","W","D","W","L"], titles: 0 },
  { id: "ksa", name: "Saudi Arabia", code: "KSA", flag: "🇸🇦", group: "F", confederation: "AFC", fifaRank: 56, primary: "#006C35", secondary: "#FFFFFF", accent: "#C5A572", coach: "Hervé Renard", captain: "Salem Al-Dawsari", stadium: "King Fahd Stadium", style: "Energetic press, technical wingers.", formation: "4-2-3-1", recentForm: ["D","W","L","W","D"], titles: 0 },
  { id: "cri", name: "Costa Rica", code: "CRC", flag: "🇨🇷", group: "F", confederation: "CONCACAF", fifaRank: 47, primary: "#002B7F", secondary: "#CE1126", accent: "#FFFFFF", coach: "Gustavo Alfaro", captain: "Keylor Navas", stadium: "Estadio Nacional", style: "Compact 5-4-1, Navas-anchored.", formation: "5-4-1", recentForm: ["L","D","W","D","W"], titles: 0 },

  // Group G
  { id: "bra", name: "Brazil", code: "BRA", flag: "🇧🇷", group: "G", confederation: "CONMEBOL", fifaRank: 5, primary: "#009C3B", secondary: "#FFDF00", accent: "#002776", coach: "Carlo Ancelotti", captain: "Vinicius Jr.", stadium: "Maracanã", style: "Skillful wingers, fluid attacking play.", formation: "4-2-3-1", recentForm: ["W","W","D","W","W"], titles: 5 },
  { id: "sui", name: "Switzerland", code: "SUI", flag: "🇨🇭", group: "G", confederation: "UEFA", fifaRank: 21, primary: "#DA291C", secondary: "#FFFFFF", accent: "#000000", coach: "Murat Yakin", captain: "Granit Xhaka", stadium: "St. Jakob-Park", style: "Disciplined, organized, set-piece strong.", formation: "3-4-2-1", recentForm: ["W","D","W","W","L"], titles: 0 },
  { id: "cmr", name: "Cameroon", code: "CMR", flag: "🇨🇲", group: "G", confederation: "CAF", fifaRank: 42, primary: "#007A5E", secondary: "#CE1126", accent: "#FCD116", coach: "Marc Brys", captain: "Vincent Aboubakar", stadium: "Olembe Stadium", style: "Physical, athletic, direct play.", formation: "4-3-3", recentForm: ["D","W","L","W","D"], titles: 0 },
  { id: "uzb", name: "Uzbekistan", code: "UZB", flag: "🇺🇿", group: "G", confederation: "AFC", fifaRank: 57, primary: "#1EB53A", secondary: "#FFFFFF", accent: "#0099B5", coach: "Timur Kapadze", captain: "Eldor Shomurodov", stadium: "Milliy Stadium", style: "Compact mid-block, quick counters.", formation: "4-2-3-1", recentForm: ["W","D","W","D","L"], titles: 0 },

  // Group H
  { id: "eng", name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "H", confederation: "UEFA", fifaRank: 4, primary: "#FFFFFF", secondary: "#C8102E", accent: "#00247D", coach: "Thomas Tuchel", captain: "Harry Kane", stadium: "Wembley Stadium", style: "Possession-oriented, dynamic wide forwards.", formation: "4-2-3-1", recentForm: ["W","W","W","D","W"], titles: 1 },
  { id: "civ", name: "Côte d'Ivoire", code: "CIV", flag: "🇨🇮", group: "H", confederation: "CAF", fifaRank: 39, primary: "#F77F00", secondary: "#009E60", accent: "#FFFFFF", coach: "Emerse Faé", captain: "Franck Kessié", stadium: "Stade Alassane Ouattara", style: "Power, fast transitions.", formation: "4-3-3", recentForm: ["W","W","D","W","L"], titles: 0 },
  { id: "pan", name: "Panama", code: "PAN", flag: "🇵🇦", group: "H", confederation: "CONCACAF", fifaRank: 35, primary: "#DA121A", secondary: "#005AA7", accent: "#FFFFFF", coach: "Thomas Christiansen", captain: "Aníbal Godoy", stadium: "Estadio Rommel Fernández", style: "Defensive resilience, counter-attacks.", formation: "4-4-2", recentForm: ["D","W","L","W","D"], titles: 0 },
  { id: "irq", name: "Iraq", code: "IRQ", flag: "🇮🇶", group: "H", confederation: "AFC", fifaRank: 58, primary: "#007A3D", secondary: "#CE1126", accent: "#FFFFFF", coach: "Graham Arnold", captain: "Aymen Hussein", stadium: "Basra International", style: "Industrious, defensive base.", formation: "4-1-4-1", recentForm: ["L","W","D","D","W"], titles: 0 },

  // Group I
  { id: "por", name: "Portugal", code: "POR", flag: "🇵🇹", group: "I", confederation: "UEFA", fifaRank: 7, primary: "#006600", secondary: "#FF0000", accent: "#FFE600", coach: "Roberto Martínez", captain: "Cristiano Ronaldo", stadium: "Estádio da Luz", style: "Technical possession, wing creativity.", formation: "4-3-3", recentForm: ["W","W","W","D","W"], titles: 0 },
  { id: "col", name: "Colombia", code: "COL", flag: "🇨🇴", group: "I", confederation: "CONMEBOL", fifaRank: 12, primary: "#FCD116", secondary: "#003893", accent: "#CE1126", coach: "Néstor Lorenzo", captain: "James Rodríguez", stadium: "Metropolitano", style: "Fluid midfield, James-orchestrated attacks.", formation: "4-2-3-1", recentForm: ["W","D","W","W","D"], titles: 0 },
  { id: "alg", name: "Algeria", code: "ALG", flag: "🇩🇿", group: "I", confederation: "CAF", fifaRank: 34, primary: "#006233", secondary: "#FFFFFF", accent: "#D21034", coach: "Vladimir Petković", captain: "Riyad Mahrez", stadium: "Stade du 5 Juillet", style: "Technical, possession-oriented.", formation: "4-3-3", recentForm: ["W","W","L","W","D"], titles: 0 },
  { id: "jor", name: "Jordan", code: "JOR", flag: "🇯🇴", group: "I", confederation: "AFC", fifaRank: 64, primary: "#007A3D", secondary: "#CE1126", accent: "#000000", coach: "Jamal Sellami", captain: "Mousa Al-Tamari", stadium: "Amman International", style: "Counter-attacking, hard-working.", formation: "4-2-3-1", recentForm: ["W","D","W","L","D"], titles: 0 },

  // Group J
  { id: "ita", name: "Italy", code: "ITA", flag: "🇮🇹", group: "J", confederation: "UEFA", fifaRank: 10, primary: "#008C45", secondary: "#FFFFFF", accent: "#CD212A", coach: "Luciano Spalletti", captain: "Gianluigi Donnarumma", stadium: "Stadio Olimpico", style: "Possession-based, structured pressing.", formation: "4-3-3", recentForm: ["W","D","W","W","W"], titles: 4 },
  { id: "chi", name: "Chile", code: "CHI", flag: "🇨🇱", group: "J", confederation: "CONMEBOL", fifaRank: 44, primary: "#D52B1E", secondary: "#0039A6", accent: "#FFFFFF", coach: "Ricardo Gareca", captain: "Arturo Vidal", stadium: "Estadio Nacional", style: "Intense pressing, technical midfield.", formation: "4-3-3", recentForm: ["D","W","L","D","W"], titles: 0 },
  { id: "rsa", name: "South Africa", code: "RSA", flag: "🇿🇦", group: "J", confederation: "CAF", fifaRank: 53, primary: "#007A4D", secondary: "#FFB81C", accent: "#001489", coach: "Hugo Broos", captain: "Ronwen Williams", stadium: "FNB Stadium", style: "Possession-oriented, organized defense.", formation: "4-2-3-1", recentForm: ["W","W","D","W","L"], titles: 0 },
  { id: "cub", name: "Curaçao", code: "CUW", flag: "🇨🇼", group: "J", confederation: "CONCACAF", fifaRank: 81, primary: "#002B7F", secondary: "#FCD116", accent: "#FFFFFF", coach: "Dick Advocaat", captain: "Leandro Bacuna", stadium: "Ergilio Hato Stadium", style: "Quick transitions, set-piece threat.", formation: "4-4-2", recentForm: ["W","D","L","W","D"], titles: 0 },

  // Group K
  { id: "cro", name: "Croatia", code: "CRO", flag: "🇭🇷", group: "K", confederation: "UEFA", fifaRank: 15, primary: "#FF0000", secondary: "#FFFFFF", accent: "#171796", coach: "Zlatko Dalić", captain: "Luka Modrić", stadium: "Stadion Maksimir", style: "Midfield dominance, technical superiority.", formation: "4-3-3", recentForm: ["W","D","W","W","D"], titles: 0 },
  { id: "par", name: "Paraguay", code: "PAR", flag: "🇵🇾", group: "K", confederation: "CONMEBOL", fifaRank: 49, primary: "#D52B1E", secondary: "#0038A8", accent: "#FFFFFF", coach: "Gustavo Alfaro", captain: "Gustavo Gómez", stadium: "Estadio Defensores", style: "Compact 4-4-2, physical play.", formation: "4-4-2", recentForm: ["W","L","D","W","W"], titles: 0 },
  { id: "hai", name: "Haiti", code: "HAI", flag: "🇭🇹", group: "K", confederation: "CONCACAF", fifaRank: 83, primary: "#00209F", secondary: "#D21034", accent: "#FFFFFF", coach: "Sébastien Migné", captain: "Duckens Nazon", stadium: "Stade Sylvio Cator", style: "Athletic, direct, transition-based.", formation: "4-3-3", recentForm: ["L","D","W","L","D"], titles: 0 },
  { id: "gha", name: "Ghana", code: "GHA", flag: "🇬🇭", group: "K", confederation: "CAF", fifaRank: 51, primary: "#006B3F", secondary: "#FCD116", accent: "#CE1126", coach: "Otto Addo", captain: "Mohammed Kudus", stadium: "Accra Sports Stadium", style: "Direct, powerful, fast wide forwards.", formation: "4-3-3", recentForm: ["W","D","W","L","W"], titles: 0 },

  // Group L
  { id: "den", name: "Denmark", code: "DEN", flag: "🇩🇰", group: "L", confederation: "UEFA", fifaRank: 18, primary: "#C8102E", secondary: "#FFFFFF", accent: "#000000", coach: "Brian Riemer", captain: "Christian Eriksen", stadium: "Parken", style: "Organized, technical, Eriksen-led tempo.", formation: "3-4-2-1", recentForm: ["W","W","D","W","W"], titles: 0 },
  { id: "nga", name: "Nigeria", code: "NGA", flag: "🇳🇬", group: "L", confederation: "CAF", fifaRank: 28, primary: "#008751", secondary: "#FFFFFF", accent: "#000000", coach: "Eric Chelle", captain: "William Troost-Ekong", stadium: "Moshood Abiola", style: "Pace, power, Osimhen-focused attack.", formation: "4-2-3-1", recentForm: ["W","W","D","L","W"], titles: 0 },
  { id: "ven", name: "Venezuela", code: "VEN", flag: "🇻🇪", group: "L", confederation: "CONMEBOL", fifaRank: 46, primary: "#FCD116", secondary: "#00247D", accent: "#CF142B", coach: "Fernando Batista", captain: "Salomón Rondón", stadium: "Estadio Monumental", style: "Compact midfield, fast counters.", formation: "4-2-3-1", recentForm: ["D","W","L","W","D"], titles: 0 },
  { id: "njp", name: "New Caledonia", code: "NCL", flag: "🇳🇨", group: "L", confederation: "OFC", fifaRank: 152, primary: "#0035AD", secondary: "#ED1F25", accent: "#FFFFFF", coach: "Johan Sidaner", captain: "Georges Bearune", stadium: "Stade Numa-Daly", style: "Physical, defensive, route-one football.", formation: "5-4-1", recentForm: ["L","L","D","L","W"], titles: 0 },
];

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(TEAMS.map(t => [t.id, t]));

// --- Squads ----------------------------------------------------------------

export const SQUADS: Record<string, Player[]> = {
  arg: [
    { name: "Emiliano Martínez", number: 23, position: "GK", age: 33, club: "Aston Villa", caps: 50, goals: 0, rating: 8.6, notes: "World-class shot-stopper, penalty specialist." },
    { name: "Nicolás Otamendi", number: 19, position: "DF", age: 38, club: "Benfica", caps: 124, goals: 6, rating: 8.0, notes: "Veteran leader of the back line." },
    { name: "Cristian Romero", number: 13, position: "DF", age: 28, club: "Tottenham", caps: 45, goals: 2, rating: 8.5, notes: "Aggressive, ball-winning centre-back." },
    { name: "Rodrigo De Paul", number: 7, position: "MF", age: 32, club: "Atlético Madrid", caps: 75, goals: 4, rating: 8.3, notes: "Tireless engine in midfield." },
    { name: "Enzo Fernández", number: 24, position: "MF", age: 25, club: "Chelsea", caps: 40, goals: 3, rating: 8.4, notes: "Deep-lying playmaker, vision and range." },
    { name: "Alexis Mac Allister", number: 20, position: "MF", age: 27, club: "Liverpool", caps: 38, goals: 5, rating: 8.5, notes: "Box-to-box, intelligent positioning." },
    { name: "Lionel Messi", number: 10, position: "FW", age: 38, club: "Inter Miami", caps: 192, goals: 112, assists: 58, rating: 9.6, notes: "Captain. Generational genius." },
    { name: "Lautaro Martínez", number: 22, position: "FW", age: 28, club: "Inter", caps: 67, goals: 32, rating: 8.7, notes: "Clinical finisher, relentless presser." },
    { name: "Julián Álvarez", number: 9, position: "FW", age: 26, club: "Atlético Madrid", caps: 42, goals: 12, rating: 8.6, notes: "Hybrid forward, links midfield and attack." },
  ],
  fra: [
    { name: "Mike Maignan", number: 1, position: "GK", age: 31, club: "Milan", caps: 30, goals: 0, rating: 8.4, notes: "Commanding modern goalkeeper." },
    { name: "William Saliba", number: 17, position: "DF", age: 25, club: "Arsenal", caps: 18, goals: 1, rating: 8.5, notes: "Elite centre-back, composure on the ball." },
    { name: "Theo Hernández", number: 22, position: "DF", age: 28, club: "Milan", caps: 38, goals: 3, rating: 8.2, notes: "Attacking left-back, devastating overlaps." },
    { name: "Aurélien Tchouaméni", number: 8, position: "MF", age: 26, club: "Real Madrid", caps: 35, goals: 1, rating: 8.5, notes: "Defensive midfield anchor." },
    { name: "Eduardo Camavinga", number: 6, position: "MF", age: 23, club: "Real Madrid", caps: 25, goals: 0, rating: 8.3, notes: "Versatile, athletic midfielder." },
    { name: "Antoine Griezmann", number: 7, position: "MF", age: 35, club: "Atlético Madrid", caps: 137, goals: 44, assists: 30, rating: 8.7, notes: "Creative hub of the team." },
    { name: "Kylian Mbappé", number: 10, position: "FW", age: 27, club: "Real Madrid", caps: 86, goals: 50, assists: 28, rating: 9.5, notes: "Captain. World's most explosive forward." },
    { name: "Ousmane Dembélé", number: 11, position: "FW", age: 28, club: "PSG", caps: 55, goals: 7, rating: 8.4, notes: "Two-footed wing wizard." },
    { name: "Randal Kolo Muani", number: 9, position: "FW", age: 27, club: "PSG", caps: 30, goals: 9, rating: 8.0, notes: "Tall, technical centre-forward." },
  ],
  bra: [
    { name: "Alisson", number: 1, position: "GK", age: 33, club: "Liverpool", caps: 75, goals: 0, rating: 8.7, notes: "Elite shot-stopper, sweeper-keeper." },
    { name: "Marquinhos", number: 4, position: "DF", age: 31, club: "PSG", caps: 90, goals: 6, rating: 8.5, notes: "Composed centre-back, captain alternate." },
    { name: "Éder Militão", number: 3, position: "DF", age: 28, club: "Real Madrid", caps: 35, goals: 2, rating: 8.4, notes: "Aggressive, pace to recover." },
    { name: "Casemiro", number: 5, position: "MF", age: 34, club: "Manchester United", caps: 78, goals: 7, rating: 8.2, notes: "Defensive midfield rock." },
    { name: "Bruno Guimarães", number: 8, position: "MF", age: 28, club: "Newcastle", caps: 35, goals: 5, rating: 8.4, notes: "Box-to-box, technical and tough." },
    { name: "Rodrygo", number: 11, position: "FW", age: 25, club: "Real Madrid", caps: 40, goals: 8, rating: 8.5, notes: "Big-game player, creative winger." },
    { name: "Vinícius Jr.", number: 7, position: "FW", age: 25, club: "Real Madrid", caps: 38, goals: 5, rating: 9.1, notes: "Captain. World's best left winger." },
    { name: "Raphinha", number: 19, position: "FW", age: 29, club: "Barcelona", caps: 35, goals: 9, rating: 8.6, notes: "Right-winger, creator and finisher." },
    { name: "Endrick", number: 9, position: "FW", age: 19, club: "Real Madrid", caps: 18, goals: 5, rating: 8.0, notes: "Young, exciting, clinical." },
  ],
  eng: [
    { name: "Jordan Pickford", number: 1, position: "GK", age: 32, club: "Everton", caps: 75, goals: 0, rating: 8.0, notes: "Tournament-tested keeper." },
    { name: "John Stones", number: 5, position: "DF", age: 31, club: "Manchester City", caps: 80, goals: 3, rating: 8.3, notes: "Ball-playing centre-back." },
    { name: "Trent Alexander-Arnold", number: 2, position: "DF", age: 27, club: "Real Madrid", caps: 35, goals: 2, rating: 8.5, notes: "Visionary passer from deep." },
    { name: "Declan Rice", number: 4, position: "MF", age: 27, club: "Arsenal", caps: 60, goals: 4, rating: 8.6, notes: "Engine and shield." },
    { name: "Jude Bellingham", number: 10, position: "MF", age: 22, club: "Real Madrid", caps: 40, goals: 6, rating: 9.0, notes: "Generational midfielder." },
    { name: "Cole Palmer", number: 20, position: "MF", age: 23, club: "Chelsea", caps: 18, goals: 6, rating: 8.7, notes: "Creative spark, ice-cold finisher." },
    { name: "Bukayo Saka", number: 7, position: "FW", age: 24, club: "Arsenal", caps: 45, goals: 13, rating: 8.7, notes: "Best right-winger in England." },
    { name: "Harry Kane", number: 9, position: "FW", age: 32, club: "Bayern Munich", caps: 105, goals: 73, rating: 9.0, notes: "Captain. All-time top scorer." },
    { name: "Phil Foden", number: 11, position: "FW", age: 25, club: "Manchester City", caps: 45, goals: 5, rating: 8.6, notes: "Versatile attacker." },
  ],
  esp: [
    { name: "Unai Simón", number: 23, position: "GK", age: 28, club: "Athletic Bilbao", caps: 45, goals: 0, rating: 8.2, notes: "Composed in build-up." },
    { name: "Aymeric Laporte", number: 14, position: "DF", age: 31, club: "Al-Nassr", caps: 38, goals: 2, rating: 8.0, notes: "Left-footed CB, calm passer." },
    { name: "Dani Carvajal", number: 2, position: "DF", age: 33, club: "Real Madrid", caps: 35, goals: 1, rating: 8.4, notes: "Veteran right-back, leader." },
    { name: "Rodri", number: 16, position: "MF", age: 29, club: "Manchester City", caps: 60, goals: 3, rating: 9.2, notes: "Captain. Ballon d'Or winner." },
    { name: "Pedri", number: 8, position: "MF", age: 23, club: "Barcelona", caps: 28, goals: 1, rating: 8.7, notes: "Pure technical brilliance." },
    { name: "Fabián Ruiz", number: 12, position: "MF", age: 30, club: "PSG", caps: 35, goals: 6, rating: 8.4, notes: "Creative left-footed mid." },
    { name: "Nico Williams", number: 17, position: "FW", age: 23, club: "Barcelona", caps: 28, goals: 6, rating: 8.7, notes: "Left-wing pace and end product." },
    { name: "Lamine Yamal", number: 19, position: "FW", age: 18, club: "Barcelona", caps: 25, goals: 8, rating: 9.0, notes: "Right-wing prodigy, generational talent." },
    { name: "Álvaro Morata", number: 7, position: "FW", age: 33, club: "Milan", caps: 78, goals: 36, rating: 8.0, notes: "Experienced No. 9, tournament leader." },
  ],
  ger: [
    { name: "Marc-André ter Stegen", number: 22, position: "GK", age: 34, club: "Barcelona", caps: 42, goals: 0, rating: 8.4, notes: "Elite ball-playing keeper." },
    { name: "Antonio Rüdiger", number: 2, position: "DF", age: 33, club: "Real Madrid", caps: 75, goals: 3, rating: 8.4, notes: "Aggressive leader." },
    { name: "Joshua Kimmich", number: 6, position: "MF", age: 31, club: "Bayern Munich", caps: 95, goals: 6, rating: 8.6, notes: "Captain. Conducts everything." },
    { name: "Florian Wirtz", number: 17, position: "MF", age: 23, club: "Bayern Munich", caps: 30, goals: 6, rating: 8.9, notes: "Creative #10, world-class dribbler." },
    { name: "Jamal Musiala", number: 10, position: "MF", age: 23, club: "Bayern Munich", caps: 38, goals: 8, rating: 8.9, notes: "Magical close control." },
    { name: "Kai Havertz", number: 7, position: "FW", age: 27, club: "Arsenal", caps: 50, goals: 16, rating: 8.3, notes: "Versatile, hybrid forward." },
    { name: "Niclas Füllkrug", number: 9, position: "FW", age: 33, club: "West Ham", caps: 22, goals: 13, rating: 7.9, notes: "Old-school No. 9." },
  ],
  por: [
    { name: "Diogo Costa", number: 22, position: "GK", age: 26, club: "Porto", caps: 25, goals: 0, rating: 8.3, notes: "Modern keeper, penalty hero." },
    { name: "Rúben Dias", number: 4, position: "DF", age: 29, club: "Manchester City", caps: 65, goals: 2, rating: 8.7, notes: "Defensive leader." },
    { name: "João Cancelo", number: 20, position: "DF", age: 32, club: "Barcelona", caps: 55, goals: 1, rating: 8.2, notes: "Inverted full-back, technical." },
    { name: "Bernardo Silva", number: 10, position: "MF", age: 31, club: "Manchester City", caps: 100, goals: 12, rating: 8.7, notes: "Tireless creator." },
    { name: "Bruno Fernandes", number: 8, position: "MF", age: 31, club: "Manchester United", caps: 80, goals: 27, rating: 8.5, notes: "Set-piece master, leader." },
    { name: "Vitinha", number: 23, position: "MF", age: 26, club: "PSG", caps: 25, goals: 2, rating: 8.5, notes: "Smooth, intelligent midfielder." },
    { name: "Cristiano Ronaldo", number: 7, position: "FW", age: 41, club: "Al-Nassr", caps: 220, goals: 138, rating: 8.5, notes: "Captain. All-time international top scorer." },
    { name: "Rafael Leão", number: 17, position: "FW", age: 26, club: "Milan", caps: 28, goals: 4, rating: 8.4, notes: "Explosive left winger." },
  ],
  ned: [
    { name: "Bart Verbruggen", number: 1, position: "GK", age: 24, club: "Brighton", caps: 22, goals: 0, rating: 8.0, notes: "Modern shot-stopper." },
    { name: "Virgil van Dijk", number: 4, position: "DF", age: 35, club: "Liverpool", caps: 80, goals: 11, rating: 8.8, notes: "Captain. Iconic defender." },
    { name: "Frenkie de Jong", number: 21, position: "MF", age: 29, club: "Barcelona", caps: 65, goals: 3, rating: 8.5, notes: "Press-resistant midfielder." },
    { name: "Cody Gakpo", number: 11, position: "FW", age: 27, club: "Liverpool", caps: 35, goals: 11, rating: 8.4, notes: "Wing/striker hybrid." },
    { name: "Memphis Depay", number: 10, position: "FW", age: 32, club: "Corinthians", caps: 100, goals: 50, rating: 8.2, notes: "Creative #10." },
  ],
  bel: [
    { name: "Koen Casteels", number: 1, position: "GK", age: 33, club: "Al-Qadsiah", caps: 18, goals: 0, rating: 8.0, notes: "Settled No. 1." },
    { name: "Kevin De Bruyne", number: 7, position: "MF", age: 35, club: "Napoli", caps: 110, goals: 28, assists: 60, rating: 9.0, notes: "Captain. Generational playmaker." },
    { name: "Jérémy Doku", number: 11, position: "FW", age: 24, club: "Manchester City", caps: 25, goals: 4, rating: 8.4, notes: "Dribbling wizard." },
    { name: "Romelu Lukaku", number: 9, position: "FW", age: 33, club: "Napoli", caps: 115, goals: 85, rating: 8.3, notes: "All-time leading scorer." },
  ],
  usa: [
    { name: "Matt Turner", number: 1, position: "GK", age: 31, club: "Crystal Palace", caps: 45, goals: 0, rating: 7.8, notes: "Reliable shot-stopper." },
    { name: "Sergiño Dest", number: 2, position: "DF", age: 25, club: "PSV", caps: 35, goals: 2, rating: 8.1, notes: "Attacking right-back." },
    { name: "Tyler Adams", number: 4, position: "MF", age: 27, club: "Bournemouth", caps: 40, goals: 1, rating: 8.0, notes: "Defensive midfield engine." },
    { name: "Weston McKennie", number: 8, position: "MF", age: 27, club: "Juventus", caps: 55, goals: 11, rating: 8.0, notes: "Box-to-box presence." },
    { name: "Christian Pulisic", number: 10, position: "FW", age: 27, club: "Milan", caps: 80, goals: 32, rating: 8.5, notes: "Captain. Talisman." },
    { name: "Folarin Balogun", number: 9, position: "FW", age: 24, club: "Monaco", caps: 15, goals: 5, rating: 7.9, notes: "Lead striker." },
  ],
  mex: [
    { name: "Guillermo Ochoa", number: 13, position: "GK", age: 40, club: "AVS", caps: 152, goals: 0, rating: 7.8, notes: "World Cup veteran." },
    { name: "Edson Álvarez", number: 4, position: "MF", age: 28, club: "West Ham", caps: 80, goals: 5, rating: 8.2, notes: "Captain. Defensive anchor." },
    { name: "Hirving Lozano", number: 22, position: "FW", age: 30, club: "San Diego FC", caps: 75, goals: 18, rating: 8.0, notes: "Explosive winger." },
    { name: "Santiago Giménez", number: 9, position: "FW", age: 25, club: "Milan", caps: 35, goals: 14, rating: 8.2, notes: "Clinical penalty-box finisher." },
  ],
  mar: [
    { name: "Yassine Bounou", number: 1, position: "GK", age: 34, club: "Al-Hilal", caps: 55, goals: 0, rating: 8.3, notes: "World Cup hero." },
    { name: "Achraf Hakimi", number: 2, position: "DF", age: 27, club: "PSG", caps: 80, goals: 10, rating: 8.7, notes: "Best right-back in the world." },
    { name: "Sofyan Amrabat", number: 4, position: "MF", age: 29, club: "Fenerbahçe", caps: 60, goals: 1, rating: 8.0, notes: "Defensive midfielder, presses high." },
    { name: "Hakim Ziyech", number: 7, position: "MF", age: 33, club: "Al-Duhail", caps: 60, goals: 19, rating: 8.0, notes: "Captain. Magic left foot." },
    { name: "Brahim Díaz", number: 10, position: "MF", age: 26, club: "Real Madrid", caps: 12, goals: 3, rating: 8.3, notes: "Creative attacker." },
  ],
};

export function squadFor(teamId: string): Player[] {
  return SQUADS[teamId] ?? [];
}

// --- Host Cities (16 venues, lat/lng for the interactive map) --------------

export type HostCity = {
  id: string;
  city: string;
  country: "USA" | "Canada" | "Mexico";
  stadium: string;
  capacity: number;
  lat: number;
  lng: number;
};

export const HOST_CITIES: HostCity[] = [
  { id: "azteca",      city: "Mexico City",     country: "Mexico", stadium: "Estadio Azteca",          capacity: 87000, lat: 19.3029, lng: -99.1505 },
  { id: "guadalajara", city: "Guadalajara",     country: "Mexico", stadium: "Estadio Akron",           capacity: 49000, lat: 20.6817, lng: -103.4624 },
  { id: "monterrey",   city: "Monterrey",       country: "Mexico", stadium: "Estadio BBVA",            capacity: 51000, lat: 25.6692, lng: -100.2440 },
  { id: "bmo",         city: "Toronto",         country: "Canada", stadium: "BMO Field",                capacity: 45000, lat: 43.6326, lng: -79.4185 },
  { id: "bcplace",     city: "Vancouver",       country: "Canada", stadium: "BC Place",                 capacity: 54500, lat: 49.2767, lng: -123.1118 },
  { id: "metlife",     city: "New York / NJ",   country: "USA",    stadium: "MetLife Stadium",          capacity: 82500, lat: 40.8128, lng: -74.0742 },
  { id: "sofi",        city: "Los Angeles",     country: "USA",    stadium: "SoFi Stadium",             capacity: 70000, lat: 33.9534, lng: -118.3387 },
  { id: "att",         city: "Dallas",          country: "USA",    stadium: "AT&T Stadium",             capacity: 80000, lat: 32.7473, lng: -97.0945 },
  { id: "hard",        city: "Miami",           country: "USA",    stadium: "Hard Rock Stadium",        capacity: 65000, lat: 25.9580, lng: -80.2389 },
  { id: "mercedes",    city: "Atlanta",         country: "USA",    stadium: "Mercedes-Benz Stadium",    capacity: 71000, lat: 33.7553, lng: -84.4006 },
  { id: "arrow",       city: "Kansas City",     country: "USA",    stadium: "Arrowhead Stadium",        capacity: 76000, lat: 39.0489, lng: -94.4839 },
  { id: "gilette",     city: "Boston",          country: "USA",    stadium: "Gillette Stadium",         capacity: 65000, lat: 42.0909, lng: -71.2643 },
  { id: "lincoln",     city: "Philadelphia",    country: "USA",    stadium: "Lincoln Financial Field", capacity: 69000, lat: 39.9008, lng: -75.1675 },
  { id: "levi",        city: "San Francisco Bay", country: "USA",  stadium: "Levi's Stadium",           capacity: 68500, lat: 37.4030, lng: -121.9700 },
  { id: "nrg",         city: "Houston",         country: "USA",    stadium: "NRG Stadium",              capacity: 72000, lat: 29.6847, lng: -95.4107 },
  { id: "seattle",     city: "Seattle",         country: "USA",    stadium: "Lumen Field",              capacity: 69000, lat: 47.5952, lng: -122.3316 },
];

export const VENUE_MAP: Record<string, HostCity> = Object.fromEntries(HOST_CITIES.map(v => [v.id, v]));
// Back-compat alias
export const VENUES = VENUE_MAP;

const vid = (id: string) => VENUE_MAP[id];

// --- Matches ----------------------------------------------------------------
// Times stored in UTC; displayed in Europe/Paris by default (see TIMEZONES).
// Opening match: Mexico vs South Africa, June 11 2026 — Estadio Azteca (per editorial brief).

export const MATCHES: Match[] = [
  // Opening
  { id: "m1",  group: "A", stage: "Group", homeId: "mex", awayId: "rsa", kickoffUTC: "2026-06-11T19:00:00Z", venue: vid("azteca").stadium,      venueId: "azteca",      city: vid("azteca").city,      status: "scheduled" },
  // Day 2
  { id: "m2",  group: "B", stage: "Group", homeId: "can", awayId: "mar", kickoffUTC: "2026-06-12T20:00:00Z", venue: vid("bmo").stadium,         venueId: "bmo",         city: vid("bmo").city,         status: "scheduled" },
  { id: "m3",  group: "B", stage: "Group", homeId: "bel", awayId: "jpn", kickoffUTC: "2026-06-12T23:00:00Z", venue: vid("gilette").stadium,     venueId: "gilette",     city: vid("gilette").city,     status: "scheduled" },
  { id: "m4",  group: "C", stage: "Group", homeId: "usa", awayId: "ecu", kickoffUTC: "2026-06-13T00:00:00Z", venue: vid("sofi").stadium,        venueId: "sofi",        city: vid("sofi").city,        status: "scheduled" },
  { id: "m5",  group: "C", stage: "Group", homeId: "ger", awayId: "kor", kickoffUTC: "2026-06-13T19:00:00Z", venue: vid("mercedes").stadium,    venueId: "mercedes",    city: vid("mercedes").city,    status: "scheduled" },
  { id: "m6",  group: "D", stage: "Group", homeId: "fra", awayId: "sen", kickoffUTC: "2026-06-13T22:00:00Z", venue: vid("att").stadium,         venueId: "att",         city: vid("att").city,         status: "scheduled" },
  { id: "m7",  group: "D", stage: "Group", homeId: "aus", awayId: "qat", kickoffUTC: "2026-06-14T01:00:00Z", venue: vid("lincoln").stadium,     venueId: "lincoln",     city: vid("lincoln").city,     status: "scheduled" },
  { id: "m8",  group: "E", stage: "Group", homeId: "arg", awayId: "tun", kickoffUTC: "2026-06-14T19:00:00Z", venue: vid("metlife").stadium,     venueId: "metlife",     city: vid("metlife").city,     status: "scheduled" },
  { id: "m9",  group: "E", stage: "Group", homeId: "ned2", awayId: "nzl", kickoffUTC: "2026-06-14T22:00:00Z", venue: vid("seattle").stadium,    venueId: "seattle",     city: vid("seattle").city,     status: "scheduled" },
  { id: "m10", group: "F", stage: "Group", homeId: "esp", awayId: "egy", kickoffUTC: "2026-06-15T19:00:00Z", venue: vid("hard").stadium,        venueId: "hard",        city: vid("hard").city,        status: "scheduled" },
  { id: "m11", group: "F", stage: "Group", homeId: "ksa", awayId: "cri", kickoffUTC: "2026-06-15T22:00:00Z", venue: vid("nrg").stadium,         venueId: "nrg",         city: vid("nrg").city,         status: "scheduled" },
  { id: "m12", group: "G", stage: "Group", homeId: "bra", awayId: "sui", kickoffUTC: "2026-06-16T19:00:00Z", venue: vid("levi").stadium,        venueId: "levi",        city: vid("levi").city,        status: "scheduled" },
  { id: "m13", group: "G", stage: "Group", homeId: "cmr", awayId: "uzb", kickoffUTC: "2026-06-16T22:00:00Z", venue: vid("arrow").stadium,       venueId: "arrow",       city: vid("arrow").city,       status: "scheduled" },
  { id: "m14", group: "H", stage: "Group", homeId: "eng", awayId: "irq", kickoffUTC: "2026-06-17T19:00:00Z", venue: vid("bcplace").stadium,     venueId: "bcplace",     city: vid("bcplace").city,     status: "scheduled" },
  { id: "m15", group: "H", stage: "Group", homeId: "civ", awayId: "pan", kickoffUTC: "2026-06-17T22:00:00Z", venue: vid("monterrey").stadium,   venueId: "monterrey",   city: vid("monterrey").city,   status: "scheduled" },
  { id: "m16", group: "I", stage: "Group", homeId: "por", awayId: "alg", kickoffUTC: "2026-06-18T19:00:00Z", venue: vid("guadalajara").stadium, venueId: "guadalajara", city: vid("guadalajara").city, status: "scheduled" },
  { id: "m17", group: "I", stage: "Group", homeId: "col", awayId: "jor", kickoffUTC: "2026-06-18T22:00:00Z", venue: vid("metlife").stadium,     venueId: "metlife",     city: vid("metlife").city,     status: "scheduled" },
  { id: "m18", group: "J", stage: "Group", homeId: "ita", awayId: "chi", kickoffUTC: "2026-06-19T19:00:00Z", venue: vid("att").stadium,         venueId: "att",         city: vid("att").city,         status: "scheduled" },
  { id: "m19", group: "J", stage: "Group", homeId: "rsa", awayId: "cub", kickoffUTC: "2026-06-19T22:00:00Z", venue: vid("seattle").stadium,     venueId: "seattle",     city: vid("seattle").city,     status: "scheduled" },
  { id: "m20", group: "K", stage: "Group", homeId: "cro", awayId: "par", kickoffUTC: "2026-06-20T19:00:00Z", venue: vid("hard").stadium,        venueId: "hard",        city: vid("hard").city,        status: "scheduled" },
  { id: "m21", group: "K", stage: "Group", homeId: "hai", awayId: "gha", kickoffUTC: "2026-06-20T22:00:00Z", venue: vid("nrg").stadium,         venueId: "nrg",         city: vid("nrg").city,         status: "scheduled" },
  { id: "m22", group: "L", stage: "Group", homeId: "den", awayId: "njp", kickoffUTC: "2026-06-21T19:00:00Z", venue: vid("levi").stadium,        venueId: "levi",        city: vid("levi").city,        status: "scheduled" },
  { id: "m23", group: "L", stage: "Group", homeId: "nga", awayId: "ven", kickoffUTC: "2026-06-21T22:00:00Z", venue: vid("arrow").stadium,       venueId: "arrow",       city: vid("arrow").city,       status: "scheduled" },
  { id: "m24", group: "A", stage: "Group", homeId: "ned", awayId: "uru", kickoffUTC: "2026-06-16T01:00:00Z", venue: vid("levi").stadium,        venueId: "levi",        city: vid("levi").city,        status: "scheduled" },
  { id: "m25", group: "D", stage: "Group", homeId: "fra", awayId: "aus", kickoffUTC: "2026-06-19T01:00:00Z", venue: vid("att").stadium,         venueId: "att",         city: vid("att").city,         status: "scheduled" },
  { id: "m26", group: "E", stage: "Group", homeId: "arg", awayId: "ned2", kickoffUTC: "2026-06-19T22:00:00Z", venue: vid("metlife").stadium,    venueId: "metlife",     city: vid("metlife").city,     status: "scheduled" },
  { id: "m27", group: "G", stage: "Group", homeId: "bra", awayId: "cmr", kickoffUTC: "2026-06-22T01:00:00Z", venue: vid("hard").stadium,        venueId: "hard",        city: vid("hard").city,        status: "scheduled" },
  { id: "m28", group: "H", stage: "Group", homeId: "eng", awayId: "civ", kickoffUTC: "2026-06-23T01:00:00Z", venue: vid("bcplace").stadium,     venueId: "bcplace",     city: vid("bcplace").city,     status: "scheduled" },
  // Knockouts
  { id: "ko1", group: "R32", stage: "R32",   homeId: "arg", awayId: "kor", kickoffUTC: "2026-06-29T22:00:00Z", venue: vid("metlife").stadium,  venueId: "metlife",  city: vid("metlife").city,  status: "scheduled" },
  { id: "ko2", group: "R32", stage: "R32",   homeId: "fra", awayId: "mar", kickoffUTC: "2026-06-30T22:00:00Z", venue: vid("att").stadium,      venueId: "att",      city: vid("att").city,      status: "scheduled" },
  { id: "ko3", group: "R16", stage: "R16",   homeId: "bra", awayId: "eng", kickoffUTC: "2026-07-05T22:00:00Z", venue: vid("sofi").stadium,     venueId: "sofi",     city: vid("sofi").city,     status: "scheduled" },
  { id: "ko4", group: "QF",  stage: "QF",    homeId: "esp", awayId: "ger", kickoffUTC: "2026-07-10T22:00:00Z", venue: vid("mercedes").stadium, venueId: "mercedes", city: vid("mercedes").city, status: "scheduled" },
  { id: "ko5", group: "SF",  stage: "SF",    homeId: "arg", awayId: "fra", kickoffUTC: "2026-07-14T22:00:00Z", venue: vid("att").stadium,      venueId: "att",      city: vid("att").city,      status: "scheduled" },
  { id: "ko6", group: "F",   stage: "Final", homeId: "arg", awayId: "esp", kickoffUTC: "2026-07-19T19:00:00Z", venue: vid("metlife").stadium,  venueId: "metlife",  city: vid("metlife").city,  status: "scheduled" },
];

// --- Standings --------------------------------------------------------------

export type StandingRow = {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export function computeStandings(group: string): StandingRow[] {
  const teams = TEAMS.filter(t => t.group === group);
  const rows: Record<string, StandingRow> = {};
  teams.forEach(t => {
    rows[t.id] = { teamId: t.id, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });
  MATCHES.filter(m => m.stage === "Group" && m.group === group && m.status === "finished").forEach(m => {
    const h = rows[m.homeId], a = rows[m.awayId];
    if (!h || !a) return;
    h.played++; a.played++;
    h.gf += m.homeScore!; h.ga += m.awayScore!;
    a.gf += m.awayScore!; a.ga += m.homeScore!;
    if (m.homeScore! > m.awayScore!) { h.wins++; h.pts += 3; a.losses++; }
    else if (m.homeScore! < m.awayScore!) { a.wins++; a.pts += 3; h.losses++; }
    else { h.draws++; a.draws++; h.pts++; a.pts++; }
  });
  return Object.values(rows)
    .map(r => ({ ...r, gd: r.gf - r.ga }))
    .sort((x, y) => y.pts - x.pts || y.gd - x.gd || y.gf - x.gf);
}

export const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

// --- Injuries (mock medical-room dataset) ----------------------------------

export const INJURIES: Injury[] = [
  { player: "Gavi",                teamId: "esp", injury: "ACL — return to play protocol",   status: "Doubtful",  expected: "2026-06-22", updated: "2026-05-28" },
  { player: "Karim Adeyemi",       teamId: "ger", injury: "Hamstring strain (grade 2)",      status: "Out",       expected: "2026-07-02", updated: "2026-05-30" },
  { player: "Marcus Rashford",     teamId: "eng", injury: "Right ankle sprain",              status: "Doubtful",  expected: "2026-06-19", updated: "2026-06-01" },
  { player: "Neymar Jr.",          teamId: "bra", injury: "Knee — meniscus reconditioning",  status: "Returning", expected: "2026-06-30", updated: "2026-05-25" },
  { player: "Antoine Griezmann",   teamId: "fra", injury: "Right calf — minor strain",       status: "Doubtful",  expected: "2026-06-13", updated: "2026-06-02" },
  { player: "Pedri",               teamId: "esp", injury: "Muscle fatigue / overload",       status: "Doubtful",  expected: "2026-06-15", updated: "2026-06-02" },
  { player: "Lautaro Martínez",    teamId: "arg", injury: "Right adductor — low grade",      status: "Returning", expected: "2026-06-14", updated: "2026-06-03" },
  { player: "Achraf Hakimi",       teamId: "mar", injury: "Left ankle — sprain",             status: "Returning", expected: "2026-06-12", updated: "2026-06-01" },
  { player: "Reece James",         teamId: "eng", injury: "Hamstring tear",                  status: "Out",       expected: "2026-07-11", updated: "2026-05-27" },
  { player: "Vinícius Jr.",        teamId: "bra", injury: "Right thigh — precaution",        status: "Returning", expected: "2026-06-16", updated: "2026-06-02" },
  { player: "Sergiño Dest",        teamId: "usa", injury: "ACL — late-stage recovery",       status: "Returning", expected: "2026-06-18", updated: "2026-05-29" },
  { player: "Joshua Kimmich",      teamId: "ger", injury: "Right knee — minor sprain",       status: "Doubtful",  expected: "2026-06-13", updated: "2026-06-03" },
  { player: "Rúben Dias",          teamId: "por", injury: "Thigh contusion",                 status: "Doubtful",  expected: "2026-06-18", updated: "2026-06-01" },
  { player: "Kalidou Koulibaly",   teamId: "sen", injury: "Right knee — partial MCL",        status: "Out",       expected: "2026-06-25", updated: "2026-05-26" },
  { player: "Mohamed Salah",       teamId: "egy", injury: "Hamstring tightness",             status: "Returning", expected: "2026-06-15", updated: "2026-06-02" },
  { player: "Son Heung-min",       teamId: "kor", injury: "Right hamstring — grade 1",       status: "Doubtful",  expected: "2026-06-17", updated: "2026-06-03" },
  { player: "Christian Pulisic",   teamId: "usa", injury: "Quadriceps — light training",     status: "Returning", expected: "2026-06-13", updated: "2026-06-04" },
  { player: "Florian Wirtz",       teamId: "ger", injury: "Right ankle — knock",             status: "Returning", expected: "2026-06-13", updated: "2026-06-04" },
  { player: "Bruno Fernandes",     teamId: "por", injury: "Lower back spasm",                status: "Doubtful",  expected: "2026-06-18", updated: "2026-06-02" },
  { player: "Erling Haaland",      teamId: "ned2", injury: "Left foot — bone bruise",        status: "Doubtful",  expected: "2026-06-14", updated: "2026-06-03" },
];

// --- Timezones (Europe/Paris is the editorial default) ---------------------

export const TIMEZONES: { id: string; label: string }[] = [
  { id: "Europe/Paris",         label: "Paris (Heure de Paris)" },
  { id: "Europe/London",        label: "London" },
  { id: "Europe/Madrid",        label: "Madrid" },
  { id: "Africa/Casablanca",    label: "Casablanca" },
  { id: "America/New_York",     label: "New York" },
  { id: "America/Toronto",      label: "Toronto" },
  { id: "America/Chicago",      label: "Chicago" },
  { id: "America/Denver",       label: "Denver" },
  { id: "America/Mexico_City",  label: "Mexico City" },
  { id: "America/Los_Angeles",  label: "Los Angeles" },
  { id: "America/Sao_Paulo",    label: "São Paulo" },
  { id: "Asia/Dubai",           label: "Dubai" },
  { id: "Asia/Tokyo",           label: "Tokyo" },
  { id: "Australia/Sydney",     label: "Sydney" },
  { id: "UTC",                  label: "UTC" },
];

export const DEFAULT_TZ = "Europe/Paris";

export function formatKickoff(iso: string, tz: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric", timeZone: tz });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz, hour12: false });
  return { date, time };
}
