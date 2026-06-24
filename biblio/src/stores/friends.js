import { defineStore } from 'pinia'


export const useFriendsStore = defineStore('friends', {
  state: () => ({
allUsers: [
  {
    id: 1,
    name: 'Alina',
    bio: 'Liest gerne Klassiker, emotionale Romane und Bücher über starke Figuren.',
    quote: "Ich glaube, Bücher sind die ehrlichsten Menschen.",



    completedBooks: [
      {
        id: 5,
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg',
        country: 'Russia',
        classic: true
      }
    ],

    currentBook: {
      id: 5,
      title: 'Anna Karenina',
      author: 'Leo Tolstoy',
      image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg',
      progress: 68
    },

    favoriteBooks: [
      {
        id: 5,
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Anna Karenina',
      'Jude St. Francis',
      'Willem Ragnarsson'
    ]
  },

  {
    id: 2,
    name: 'Paul',
    bio: 'Interessiere mich für philosophische und tiefgründige Literatur. Für mich sind Bücher Fragen, keine Antworten.',
    quote: "Man lebt tausend Leben durch Bücher." ,

    completedBooks: [
      {
        id: 7,
        title: 'Der Prozess',
        author: 'Franz Kafka',
        image: 'https://covers.openlibrary.org/b/isbn/9780141182902-L.jpg',
        country: 'Germany',
        classic: true
      }
    ],

    currentBook: {
      id: 7,
      title: 'Der Prozess',
      author: 'Franz Kafka',
      image: 'https://covers.openlibrary.org/b/isbn/9780141182902-L.jpg',
      progress: 100
    },

    favoriteBooks: [
      {
        id: 7,
        title: 'Der Prozess',
        author: 'Franz Kafka',
        image: 'https://covers.openlibrary.org/b/isbn/9780141182902-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Josef K.',
      'Der kleine Prinz',
      'K.'
    ]
  },

  {
    id: 3,
    name: 'Peter',
    bio: 'Analytisch, neugierig und wissenshungrig. Er liest Bücher, um die Welt besser zu verstehen.',
    quote: "Eine gute Geschichte verändert dich.",

    completedBooks: [
      {
        id: 2,
        title: 'Klara and the Sun',
        author: 'Kazuo Ishiguro',
        image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg',
        country: 'Japan',
        classic: false
      }
    ],

    currentBook: {
      id: 2,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg',
      progress: 35
    },

    favoriteBooks: [
      {
        id: 2,
        title: 'Klara and the Sun',
        author: 'Kazuo Ishiguro',
        image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Klara',
      'Der kleine Prinz',
      'Josef K.'
    ]
  },

  {
    id: 4,
    name: 'Mara',
    bio: 'Taucht gerne in Fantasy-Welten ein und liebt Geschichten voller Magie, Emotionen und starken Figuren.',
    quote: "Fantasy ist mein Zuhause.",


    completedBooks: [
      {
        id: 4,
        title: 'Fourth Wing',
        author: 'Rebecca Yarros',
        image: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
        country: 'USA',
        classic: false
      },
      {
        id: 1,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg',
        country: 'USA',
        classic: true
      }
    ],

    currentBook: {
      id: 4,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
      progress: 312
    },

    favoriteBooks: [
      {
        id: 4,
        title: 'Fourth Wing',
        author: 'Rebecca Yarros',
        image: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg'
      },
      {
        id: 1,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Violet Sorrengail',
      'Xaden Riorson'
    ]
  },

  {
    id: 5,
    name: 'Lukas',
    bio: 'Fasziniert von Science-Fiction und dystopischen Zukunftsvisionen. Er liest, was die Zukunft erzählen könnte.',
    quote: "Man lebt tausend Leben durch Bücher.",

    completedBooks: [
      {
        id: 2,
        title: 'Klara and the Sun',
        author: 'Kazuo Ishiguro',
        image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg',
        country: 'Japan',
        classic: false
      }
    ],

    currentBook: {
          id: 4,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
      progress: 212
    },

    favoriteBooks: [
      {
        id: 2,
        title: 'Klara and the Sun',
        author: 'Kazuo Ishiguro',
        image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Klara'
    ]
  },

  {
    id: 6,
    name: 'Sarah',
    bio:'Liest emotionale Contemporary Fiction und Geschichten über Beziehungen, Verlust und Identität.',
    quote: "Man lebt tausend Leben durch Bücher.",

    completedBooks: [
      {
        id: 1,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg',
        country: 'USA',
        classic: true
      }
    ],

    currentBook: {
    id: 4,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
      progress: 112
    },

    favoriteBooks: [
      {
        id: 1,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg'
      }
    ],

    favoriteCharacters: [
      'Jude St. Francis'
    ]
  }
],
    friends: JSON.parse(localStorage.getItem('biblio-friends')) || [
      {
        id: 1,
        name: 'Alina',
        bio: 'Liest gerne Klassiker, emotionale Romane und Bücher über starke Figuren.',
        currentBook: {
          id: 5,
          title: 'Anna Karenina',
          author: 'Leo Tolstoy',
          image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg',
          progress: 68, 

        },
        favoriteBooks: [
          {
            id: 5,
            title: 'Anna Karenina',
            author: 'Leo Tolstoy',
            image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg'
          },
          {
            id: 1,
            title: 'A Little Life',
            author: 'Hanya Yanagihara',
            image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg'
          }
        ],
        favoriteCharacters: [
          'Anna Karenina',
          'Jude St. Francis',
          'Willem Ragnarsson'
        ],
      },
      {
        id: 2,
        name: 'Paul',
        bio: 'Mag Kafka, kurze philosophische Romane und Bücher, die zum Nachdenken bringen.',
        currentBook: {
          id: 7,
          title: 'Der Prozess',
          author: 'Franz Kafka',
          image: 'https://covers.openlibrary.org/b/isbn/9780141182902-L.jpg',
          progress: 100
        },
        favoriteBooks: [
          {
            id: 7,
            title: 'Der Prozess',
            author: 'Franz Kafka',
            image: 'https://covers.openlibrary.org/b/isbn/9780141182902-L.jpg'
          },
          {
            id: 8,
            title: 'Der kleine Prinz',
            author: 'Antoine de Saint-Exupéry',
            image: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg'
          }
        ],
        favoriteCharacters: [
          'Josef K.',
          'Der kleine Prinz',
          'K.'
        ]
      },
      {
        id: 3,
        name: 'Peter',
        bio: 'Liest gerne Sachbücher, Biografien und Bücher über Wirtschaft, Technik und Gesellschaft.',
        currentBook: {
          id: 2,
          title: 'Klara and the Sun',
          author: 'Kazuo Ishiguro',
          image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg',
          progress: 35
        },
        favoriteBooks: [
          {
            id: 2,
            title: 'Klara and the Sun',
            author: 'Kazuo Ishiguro',
            image: 'https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg'
          },
          {
            id: 8,
            title: 'Der kleine Prinz',
            author: 'Antoine de Saint-Exupéry',
            image: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg'
          }
        ],
        favoriteCharacters: [
          'Klara',
          'Der kleine Prinz',
          'Josef K.'
        ]
      }
    ]
  }),

  actions: {
    save() {
      localStorage.setItem('biblio-friends', JSON.stringify(this.friends))
    },

    updateFriendCurrentBook(friendId, book) {
      const friend = this.friends.find(f => f.id === friendId)
      if (!friend) return

      friend.currentBook = book
      this.save()
    },

    addFriend(user) {

  const exists = this.friends.some(
    friend => friend.id === user.id
  )

  if (!exists) {
    this.friends.push(user)
    this.save()
  }
},

removeFriend(id) {

  this.friends = this.friends.filter(
    friend => friend.id !== id
  )

  this.save()
},

deleteUser(id) {
  this.allUsers = this.allUsers.filter(u => u.id !== id)

  // optional: auch aus friends entfernen
  this.friends = this.friends.filter(f => f.id !== id)

  this.save?.() // falls du save hast
}
  }
})