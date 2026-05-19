<script setup>
import { ref } from 'vue'

import { books } from './data.js'

const showDetails = (book) => {
  alert(`${book.title}\n\n${book.description}`)
}

const favorites = ref([])

const toggleBookmark = (book) => {
  const index = favorites.value.findIndex(b => b.id === book.id)

  if (index === -1) {
    favorites.value.push(book)
  } else {
    favorites.value.splice(index, 1)
  }
}

const isFavorite = (book) => {
  return favorites.value.some(b => b.id === book.id)
}

</script>

<template>

  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid px-4">

      <a class="navbar-brand" href="#">
        Biblio
      </a>

      <button
        class="navbar-toggler navbar-toggler-sm py-1 px-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">

        <ul class="navbar-nav me-auto gap-2 ms-3">
          <li class="nav-item">
            <a class="nav-link" href="#">Books</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Categories</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Community</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3">
          <a href="#" class="nav-link">
            <i class="bi bi-search"></i>
          </a>

          <a href="#" class="nav-link">
            Log in
          </a>

          <a href="#" class="btn-biblio btn">
            Sign up
          </a>
        </div>

      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="row align-items-center hero-content">

      <div class="col-lg-6 text-lg-start text-center mb-4 mb-lg-0">

        <h1>
          Discover books.<br>
          Share stories.<br>
          <span class="accent">Connect.</span>
        </h1>

        <p class="my-3 mx-lg-0 mx-auto">
          Biblio ist dein Ort, um tolle Bücher zu entdecken,
          Gedanken zu teilen und eine Gemeinschaft leidenschaftlicher
          Leser zu finden.
        </p>

        <div class="d-flex gap-3 justify-content-lg-start justify-content-center flex-wrap">
          <a href="#" class="btn-biblio btn">
            Join Biblio
          </a>

          <a href="#" class="btn-biblio-outline btn">
            Explore Books
          </a>
        </div>

      </div>

      <!-- Bücher Visual -->
      <div class="col-lg-6 d-none d-md-flex justify-content-center">

        <div class="hero-books">

          <div class="book-spine spine-1">
            The Hidden World
          </div>

          <div class="book-spine spine-2">
            A Thousand Skies
          </div>

          <div class="book-spine spine-3">
            The Flower Letter
          </div>

          <div class="book-cover">
            <div class="book-mountain"></div>

            <h3>The Summer We Met</h3>

            <small>J. L. Morgan</small>
          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- Features -->
  <section class="features-section">

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">

      <div class="col">
        <div class="feature-card d-flex gap-3 align-items-start">

          <i class="bi bi-book flex-shrink-0"></i>

          <div>
            <h3>Discover</h3>

            <p>
              Finde dein nächstes Lieblingsbuch
              mit personalisierten Empfehlungen.
            </p>
          </div>

        </div>
      </div>

      <div class="col">
        <div class="feature-card d-flex gap-3 align-items-start">

          <i class="bi bi-bookmark flex-shrink-0"></i>

          <div>
            <h3>Organize</h3>

            <p>
              Organisiere deine Bücher
              und behalte den Überblick.
            </p>
          </div>

        </div>
      </div>

      <div class="col">
        <div class="feature-card d-flex gap-3 align-items-start">

          <i class="bi bi-people flex-shrink-0"></i>

          <div>
            <h3>Connect</h3>

            <p>
              Verbinde dich mit anderen Lesern
              und entdecke neue Communities.
            </p>
          </div>

        </div>
      </div>

      <div class="col">
        <div class="feature-card d-flex gap-3 align-items-start">

          <i class="bi bi-pencil flex-shrink-0"></i>

          <div>
            <h3>Review</h3>

            <p>
              Teile Bewertungen und Empfehlungen
              mit anderen Nutzern.
            </p>
          </div>

        </div>
      </div>

    </div>

  </section>

  <!-- Beliebte Bücher -->

  <section class="popular-section">

  <!-- Abschnitts-Kopf mit Titel und Navigation -->
  <div class="d-flex align-items-center justify-content-between mb-4">
    <h2>Beliebte Bücher</h2>
    <div class="d-flex align-items-center gap-2">
      <a href="#" class="text-muted small text-decoration-none">Alle ansehen</a>
      <!-- Pfeil-Buttons für spätere Karussell-Funktion -->
      <button class="btn btn-sm btn-outline-secondary rounded-circle">&lsaquo;</button>
      <button class="btn btn-sm btn-outline-secondary rounded-circle">&rsaquo;</button>
    </div>
  </div>

  <!-- Bücher-Raster: 2 Spalten auf Handy, 3 auf Tablet, 5 auf Desktop -->
  <!-- Bücher-Raster -->
<div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3">

  <div class="col" v-for="book in books" :key="book.id">
    <div class="book-card">

      <div class="book-cover-img">
        <img
          :src="book.image"
          :alt="book.title"
          @error="$event.target.style.display='none'"
        />

      <button
        class="bookmark-btn"
        aria-label="Lesezeichen"
        @click="toggleBookmark(book)"
      >
        <i
          class="bi"
          :class="isFavorite(book) ? 'bi-bookmark-fill' : 'bi-bookmark'"
        ></i>
      </button>
      </div>

      <h4 class="mt-2">{{ book.title }}</h4>
      <div class="author">{{ book.author }}</div>

      <div class="stars">
        <i
          v-for="n in 5"
          :key="n"
          class="bi"
          :class="n <= Math.round(book.rating) ? 'bi-star-fill' : 'bi-star'"
        ></i>

        <span class="text-muted" style="font-size:0.75rem">
          {{ book.rating }}
        </span>
      </div>

      <button
        class="btn btn-sm btn-outline-secondary mt-2"
        @click="showDetails(book)"
      >
        Details
      </button>

    </div>
  </div>

</div>

</section>

  <section class="community-section">
  <div class="row align-items-center g-5">

    <!-- Linke Seite: Text + Statistiken -->
    <div class="col-lg-6">
      <div class="community-label mb-2">Our Community</div>
      <h2>Mehr als nur Bücher.<br>Hier geht es um das <em>Miteinander.</em></h2>
      <p class="mt-3" style="color: var(--text-muted); font-size: 0.95rem;">
        Biblio ist eine wachsende Gemeinschaft von Lesern, die gemeinsam teilen,
        diskutieren und neue Bücher entdecken.
      </p>

      <!-- Statistiken -->
      <div class="d-flex gap-4 my-4">
        <div class="stat"><strong>25K+</strong><span>Mitglieder</span></div>
        <div class="stat"><strong>10K+</strong><span>Bewertungen</span></div>
        <div class="stat"><strong>1K+</strong><span>Book Clubs</span></div>
      </div>

      <a href="#" class="btn-biblio btn">Jetzt eintreten</a>
    </div>

    <!-- Rechte Seite: Bilder-Grid -->
    <div class="col-lg-6">
      <div class="community-img-grid">

        <!-- Bild oben links – z.B. Kaffeetasse oder Leseecke -->
        <div class="img-box">
          <!--
            Bild einbinden: src="./pictures/bibliophile.jpg"
          -->
          <img src=".\assets\pictures\bibliophile.jpg" alt="Gemütliche Leseecke"
               onerror="this.style.opacity='0'" />
        </div>

        <!-- Bild rechts, groß (überspannt beide Zeilen) -->
        <div class="img-box tall">
          <!--
            Bild einbinden: src="./pictures/Cozy Gathering Space.jpg"
          -->
          <img src=".\assets\pictures\Cozy Gathering Space.jpg" alt="Lesegruppe"
               onerror="this.style.opacity='0'" />
        </div>

        <!-- Bild unten links – z.B. Bibliothek oder Bücherregal -->
        <div class="img-box">
          <!--
            Bild einbinden: src="./pictures/books.jpg"
          -->
          <img src=".\assets/pictures/books.jpg" alt="Bücher"
               onerror="this.style.opacity='0'" />
        </div>

      </div>
    </div>

  </div>
</section>





<!-- FOOTER -->
<footer>
  <div class="row g-4 mb-4">

    <!-- Spalte 1: Marke + Kurzbeschreibung + Social Links -->
    <div class="col-12 col-lg-5">
      <div class="logo mb-2">Biblio</div>
      <p style="font-size:0.83rem; color:var(--text-muted); max-width:240px">
        Dein Ort, um Bücher zu entdecken, Geschichten zu teilen und Leser weltweit zu verbinden.
      </p>
      <!-- Social-Links (einfache Textlinks) -->
      <div class="d-flex gap-3 mt-2">
        <a href="#"><i class="bi bi-instagram"></i> Instagram</a>
        <a href="#"><i class="bi bi-facebook"></i> Facebook</a>
      </div>
    </div>

    <!-- Spalte 2 -->
    <div class="col-6 col-lg-2">
      <h5>Entdecken</h5>
     
    </div>

    <!-- Spalte 3 -->
    <div class="col-6 col-lg-2">
      <h5>Community</h5>
    </div>
    <!-- Spalte 4 -->
    <div class="col-6 col-lg-2">
      <h5>Unternehmen</h5>
    </div>

  </div>

  <!-- Footer-Unterzeile -->
  <div class="d-flex justify-content-between align-items-center pt-3"
       style="border-top: 1px solid var(--border);">
    <p class="mb-0" style="font-size:0.78rem; color:var(--text-muted)">© 2024 Biblio. All rights reserved.</p>
    <div class="footer-tagline" style="color:var(--text-muted)">Read more. Connect deeper.</div>
  </div>
</footer>

</template>

<style scoped>
</style>