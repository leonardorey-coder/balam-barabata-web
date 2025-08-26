export interface Stage {
  slug: string;
  name: string;
  lots: number;
  price: number;
  description: string;
  image?: string;
}

export const stages: Stage[] = [
  {
    slug: 'primicia',
    name: 'Etapa 1 · La Primicia',
    lots: 40,
    price: 1200,
    description: 'Primera etapa del desarrollo con preventa especial de 30% de descuento. Ubicada en la zona más privilegiada del proyecto.',
  },
  {
    slug: 'comunidad-sustentable',
    name: 'Etapa 2 · Comunidad Sustentable',
    lots: 80,
    price: 1900,
    description: 'Segunda etapa estratégicamente ubicada a pasos del ecoparque central, con acceso directo a todas las amenidades.',
  },
  {
    slug: 'ciudadanos-eco-bio',
    name: 'Etapa 3 · Ciudadanos Eco-bio',
    lots: 80,
    price: 3000,
    description: 'Etapa premium cercana al área comercial y de servicios, diseñada para residentes comprometidos con el ecosistema.',
  },
];
