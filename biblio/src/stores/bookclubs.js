import { defineStore } from 'pinia'

export const useBookClubStore = defineStore('bookclubs', {

  state: () => ({

    clubs: JSON.parse(
    localStorage.getItem('biblio-bookclubs')
    ) || [

      {
        id: 1,

        name: 'Contemporary Fiction Club',

        official: true,

        description:
          'Gemeinsam lesen wir moderne Literatur und diskutieren Charaktere, Themen und Schreibstil.',

        createdBy: 'Admin',

        createdAt: '15.05.2026',

        currentBook: {
          id: 1,
          title: 'A Little Life'
        },

        nextMeeting: {
          date: '26.06.2026',
          topic: 'Kapitel 4–6'
        },

        discussionPoints: [
          'Judes Vergangenheit',
          'Die Freundschaft der vier Freunde',
          'Willems Rolle in der Gruppe'
        ],

        upcomingBooks: [
          'Tomorrow and Tomorrow and Tomorrow',
          'Normal People'
        ],

        members: [
        {
            id: 0,
            name: 'Lisa'
        },

        {
            id: 1,
            name: 'Alina'
        },

        {
            id: 4,
            name: 'Mara'
        }
        ]
      },

      {
        id: 2,

        name: 'Fantasy Readers',

        official: true,

        description:
          'Für alle Fans von Fantasy, Drachen und magischen Welten.',

        createdBy: 'Admin',

        createdAt: '10.05.2026',

        currentBook: {
          id: 4,
          title: 'Fourth Wing'
        },

        nextMeeting: {
          date: '01.07.2026',
          topic: 'Seite 200–350'
        },

        discussionPoints: [
          'Violet',
          'Xaden',
          'Das Basgiath War College'
        ],

        upcomingBooks: [
          'Iron Flame'
        ],

        members: [
          {
            id: 4,
            name: 'Mara'
        }
        ]
      }

    ]

  }),

  actions: {

        addClub(club) {

        this.clubs.push({
            id: Date.now(),
            ...club
        })

        localStorage.setItem(
            'biblio-bookclubs',
            JSON.stringify(this.clubs)
        )
        },

        joinClub(clubId, user) {

        const club = this.clubs.find(
            c => c.id === clubId
        )

        if (!club) return

        const alreadyMember = club.members.some(
            member => member.id === user.id
        )

        if (alreadyMember) return

        club.members.push({
            id: user.id,
            name: user.name
        })

        localStorage.setItem(
            'biblio-bookclubs',
            JSON.stringify(this.clubs)
        )
        },

        leaveClub(clubId, userId) {

        const club = this.clubs.find(
            c => c.id === clubId
        )

        if (!club) return

        club.members = club.members.filter(
            member => member.id !== userId
        )

        localStorage.setItem(
            'biblio-bookclubs',
            JSON.stringify(this.clubs)
        )
        },

  }

})