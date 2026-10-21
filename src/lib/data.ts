export interface Film {
  slug: string;
  title: string;
  tagline: string;
  genre: string;
  duration: number;
  rating: string;
  year: number;
  director: string;
  cast: string[];
  synopsis: string;
  note: string;
  accent: string;
  label: string;
}
export const films: Film[] = [
  {
    slug: 'depois-do-horizonte',
    title: 'Depois do Horizonte',
    tagline: 'Nem toda distância cabe em um mapa.',
    genre: 'Ficção científica',
    duration: 112,
    rating: '12',
    year: 2026,
    director: 'Marina Valença',
    cast: ['Lia Navarro', 'Caio Ferraz', 'Elisa Monte'],
    synopsis:
      'Em um futuro silencioso, uma cartógrafa recebe um sinal vindo de uma cidade que não existe mais. Ao atravessar uma imensidão de areia, ela descobre que algumas paisagens guardam aquilo que tentamos esquecer.',
    note: 'Uma viagem sobre memória, pertencimento e a coragem de seguir adiante.',
    accent: '#db994f',
    label: 'DESTAQUE DA SEMANA',
  },
  {
    slug: 'cidade-submersa',
    title: 'Cidade Submersa',
    tagline: 'Há histórias que a maré não leva.',
    genre: 'Drama',
    duration: 98,
    rating: '14',
    year: 2026,
    director: 'Rafael Sereno',
    cast: ['Nina Duarte', 'Bento Lira', 'Vera Souto'],
    synopsis:
      'Uma técnica de som retorna à cidade onde cresceu para registrar seus últimos dias antes da construção de uma represa. Entre vozes, ruídos e reencontros, o arquivo se transforma em uma carta para quem fica.',
    note: 'Uma história sobre escuta e os lugares que continuam vivendo dentro de nós.',
    accent: '#689c9f',
    label: 'UM OLHAR BRASILEIRO',
  },
  {
    slug: 'o-ultimo-trem',
    title: 'O Último Trem',
    tagline: 'Uma noite. Dois destinos. Nenhuma certeza.',
    genre: 'Suspense',
    duration: 104,
    rating: '16',
    year: 2025,
    director: 'Otávio Reis',
    cast: ['Clara Vidal', 'Tomás Freire', 'Ivo Campos'],
    synopsis:
      'Na última viagem de uma linha noturna, uma revisora encontra uma mala sem dono e um bilhete com seu próprio nome. A cada estação, as versões sobre o que aconteceu naquela noite se tornam menos confiáveis.',
    note: 'Um quebra-cabeça noturno que se revela no intervalo entre duas estações.',
    accent: '#e06d58',
    label: 'PARA PRENDER A RESPIRAÇÃO',
  },
  {
    slug: 'pequenos-satelites',
    title: 'Pequenos Satélites',
    tagline: 'Todo mundo procura sua órbita.',
    genre: 'Animação',
    duration: 86,
    rating: 'L',
    year: 2026,
    director: 'Cecília Ramos',
    cast: ['Vozes de Luísa Prado', 'Davi Amaral', 'Cora Neves'],
    synopsis:
      'Sol é um pequeno satélite que perdeu o caminho de casa. Com a ajuda de uma antena curiosa e de um cometa distraído, ele atravessa um universo de encontros para descobrir que pertencer pode significar muitas coisas.',
    note: 'Uma aventura delicada para quem ainda gosta de olhar para o céu.',
    accent: '#aca1df',
    label: 'PARA TODAS AS ÓRBITAS',
  },
  {
    slug: 'entre-folhas',
    title: 'Entre Folhas',
    tagline: 'A vida tem seu próprio tempo.',
    genre: 'Documentário',
    duration: 92,
    rating: 'L',
    year: 2025,
    director: 'Helena Salles',
    cast: ['Personagens e relatos fictícios'],
    synopsis:
      'Ao longo de quatro estações, um pequeno jardim comunitário revela a rotina de pessoas que encontram na terra uma maneira de recomeçar. Um retrato sensível dos vínculos que crescem onde menos esperamos.',
    note: 'Um documentário fictício sobre tempo, cuidado e transformação.',
    accent: '#9baf6d',
    label: 'OUTRAS FORMAS DE VER',
  },
  {
    slug: 'quase-domingo',
    title: 'Quase Domingo',
    tagline: 'Os melhores planos começam dando errado.',
    genre: 'Comédia',
    duration: 101,
    rating: '10',
    year: 2026,
    director: 'André Fontoura',
    cast: ['Sofia Melo', 'Renato Paes', 'Lara Nunes'],
    synopsis:
      'Uma cozinheira decide reunir os antigos vizinhos para um último almoço antes de mudar de cidade. Mas um apagão, uma visita inesperada e uma receita desaparecida transformam o encontro em uma pequena grande confusão.',
    note: 'Uma comédia de encontros, desencontros e mesas onde sempre cabe mais alguém.',
    accent: '#e6b466',
    label: 'UM RESPIRO NA ROTINA',
  },
];
export const dates = [
  '2026-10-23',
  '2026-10-24',
  '2026-10-25',
  '2026-10-26',
  '2026-10-27',
  '2026-10-28',
  '2026-10-29',
];
export interface Session {
  id: string;
  film: string;
  date: string;
  time: string;
  room: string;
  format: string;
  audio: string;
}
export const sessions: Session[] = dates.flatMap((date, d) =>
  films.map((film, f) => ({
    id: `d${d + 1}-f${f + 1}`,
    film: film.slug,
    date,
    time: ['14:30', '16:20', '18:10', '15:00', '17:10', '20:30'][(f + d) % 6]!,
    room: f % 2 === 0 ? 'Sala 01 · Órbita' : 'Sala 02 · Prisma',
    format: f === 0 || f === 3 ? '2D · Atmos' : '2D',
    audio: 'Português',
  })),
);
export const getFilm = (slug: string) => films.find((f) => f.slug === slug)!;
export function dateLabel(date: string, short = false) {
  const d = new Date(`${date}T12:00:00`);
  return d
    .toLocaleDateString(
      'pt-BR',
      short
        ? { day: '2-digit', month: 'short' }
        : { weekday: 'long', day: '2-digit', month: 'long' },
    )
    .replace('.', '');
}
export const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
export const allSeats = rows.flatMap((row) =>
  Array.from({ length: 8 }, (_, i) => `${row}${i + 1}`),
);
