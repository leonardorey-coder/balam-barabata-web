export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const amenities: Amenity[] = [
  {
    id: 'temazcal',
    title: 'Temazcal',
    description: 'Castillo de vapor maya para purificación y conexión espiritual con la naturaleza.',
  },
  {
    id: 'cenote',
    title: 'Cenote',
    description: 'Piscina natural subterránea con aguas cristalinas para relajación y actividades acuáticas.',
  },
  {
    id: 'senderos',
    title: 'Senderos botánicos',
    description: 'Senderos interpretativos con flora medicinal y especies nativas de la región.',
  },
  {
    id: 'meliponario',
    title: 'Meliponario',
    description: 'Hogar de la abeja melipona protegida, productora de miel sagrada maya.',
  },
  {
    id: 'huertos',
    title: 'Huertos orgánicos',
    description: 'Espacios de cultivo con milpa tradicional y sistemas de composta comunitarios.',
  },
  {
    id: 'area-deportiva',
    title: 'Área deportiva',
    description: 'Pista de atletismo y cancha multiusos para actividades recreativas y deportivas.',
  },
];
