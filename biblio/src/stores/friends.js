import { defineStore } from 'pinia'

export const useFriendsStore = defineStore('friends', {
  state: () => ({
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
          progress: 68
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
        ]
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
    }
  }
})