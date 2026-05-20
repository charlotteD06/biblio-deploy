
// Buchdaten sind lokal definiert (id, title, author, description).
// Das Cover-Bild wird in ProductCatalog.vue dynamisch von der Open Library API geladen.
// In Iteration 8b werden alle Daten durch das eigene Backend ersetzt.

import aLittleLife from './assets/pictures/A Little Life.jpg'
import annaKarenina from './assets/pictures/anna_karenina.jpeg'
import klaraAndTheSun from './assets/pictures/Klara and the Sun.jpg'
import theMidnightLibrary from './assets/pictures/The Midnight Library.jpg'
import fourthWing from './assets/pictures/Fourth Wing.jpg'

export const books = [
  {
    id: 1,
    isbn: '9780804172707',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    rating: 4.6,
    image: aLittleLife,   // Fallback – wird in ProductCatalog durch API-Cover ersetzt
    description: 'A deeply moving story about friendship, trauma and survival in New York City.',
  },
  {
    id: 2,
    isbn: '9780571364879',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    rating: 4.2,
    image: klaraAndTheSun,
    description: 'A story about an artificial friend observing human life and emotions.',
  },
  {
    id: 3,
    isbn: '9780525559474',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.7,
    image: theMidnightLibrary,
    description: 'A library between life and death where infinite possibilities exist.',
  },
  {
    id: 4,
    isbn: '9781649374042',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    rating: 4.8,
    image: fourthWing,
    description: 'A fantasy story about dragons, war college and survival.',
  },
  {
    id: 5,
    isbn: '9780143035008',
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    rating: 4.3,
    image: annaKarenina,
    description: 'A classic novel about love, society and tragedy in imperial Russia.',
  },
]