<script setup>
import { ref } from 'vue'

const showBanner = ref(true)

function closeBanner() {
  showBanner.value = false
}
</script>

<template>

  <!-- Banner -->
  <div
    v-if="showBanner"
    class="text-center py-3"
    style="background-color:#ede8df;"
  >
    Join Biblio today and discover your next favorite book!
    <button
      class="btn btn-biblio ms-3"
      @click="closeBanner"
    >
      Got it
    </button>
  </div>

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
  <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3">

    <!-- ---- BUCH 1 ---- -->
    <div class="col">
      <div class="book-card">
        <div class="book-cover-img">
          <!--
            Eigenes Bild einbinden: src="./pictures/A Little Life.jpg"
            Wenn das Bild nicht gefunden wird, zeigt onerror den Platzhalter.
          -->
          <img src="./pictures/A Little Life.jpg" alt="A Little Life"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="book-placeholder bc1" style="display:none">
            <h4>A Little Life</h4>
            <small>Hanya Yanagihara</small>
          </div>
          <!-- Lesezeichen-Button (erscheint beim Hover) -->
          <button class="bookmark-btn" aria-label="Lesezeichen">
            <i class="bi bi-bookmark"></i>
          </button>
        </div>
        <h4 class="mt-2">A Little Life</h4>
        <div class="author">Hanya Yanagihara</div>
        <div class="stars">
          <!-- Sterne-Icons aus Bootstrap Icons -->
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
          <span class="text-muted" style="font-size:0.75rem"> 4.6</span>
        </div>
      </div>
    </div>

    <!-- ---- BUCH 2 ---- -->
    <div class="col">
      <div class="book-card">
        <div class="book-cover-img">
          <img src="https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg"
               alt="Klara and the Sun"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="book-placeholder bc3" style="display:none">
            <h4>Klara and the Sun</h4>
            <small>Kazuo Ishiguro</small>
          </div>
          <button class="bookmark-btn" aria-label="Lesezeichen">
            <i class="bi bi-bookmark"></i>
          </button>
        </div>
        <h4 class="mt-2">Klara and the Sun</h4>
        <div class="author">Kazuo Ishiguro</div>
        <div class="stars">
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
          <span class="text-muted" style="font-size:0.75rem"> 4.2</span>
        </div>
      </div>
    </div>

    <!-- ---- BUCH 3 ---- -->
    <div class="col">
      <div class="book-card">
        <div class="book-cover-img">
          <img src="https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg"
               alt="The Midnight Library"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="book-placeholder bc4" style="display:none">
            <h4>The Midnight Library</h4>
            <small>Matt Haig</small>
          </div>
          <button class="bookmark-btn" aria-label="Lesezeichen">
            <i class="bi bi-bookmark"></i>
          </button>
        </div>
        <h4 class="mt-2">The Midnight Library</h4>
        <div class="author">Matt Haig</div>
        <div class="stars">
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <span class="text-muted" style="font-size:0.75rem"> 4.7</span>
        </div>
      </div>
    </div>

    <!-- ---- BUCH 4 ---- -->
    <div class="col">
      <div class="book-card">
        <div class="book-cover-img">
          <img src="https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg"
               alt="Fourth Wing"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="book-placeholder bc5" style="display:none">
            <h4>Fourth Wing</h4>
            <small>Rebecca Yarros</small>
          </div>
          <button class="bookmark-btn" aria-label="Lesezeichen">
            <i class="bi bi-bookmark"></i>
          </button>
        </div>
        <h4 class="mt-2">Fourth Wing</h4>
        <div class="author">Rebecca Yarros</div>
        <div class="stars">
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <span class="text-muted" style="font-size:0.75rem"> 4.8</span>
        </div>
      </div>
    </div>

    <!-- ---- BUCH 5 ---- -->
    <div class="col">
      <div class="book-card">
        <div class="book-cover-img">
          <!--
            Lokales Bild: src="./pictures/anna_karenina.jpeg"
          -->
          <img src="./pictures/anna_karenina.jpeg"
               alt="Anna Karenina"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="book-placeholder bc2" style="display:none">
            <h4>Anna Karenina</h4>
            <small>Leo Tolstoy</small>
          </div>
          <button class="bookmark-btn" aria-label="Lesezeichen">
            <i class="bi bi-bookmark"></i>
          </button>
        </div>
        <h4 class="mt-2">Anna Karenina</h4>
        <div class="author">Leo Tolstoy</div>
        <div class="stars">
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
          <span class="text-muted" style="font-size:0.75rem"> 4.3</span>
        </div>
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
          <img src="./pictures/bibliophile.jpg" alt="Gemütliche Leseecke"
               onerror="this.style.opacity='0'" />
        </div>

        <!-- Bild rechts, groß (überspannt beide Zeilen) -->
        <div class="img-box tall">
          <!--
            Bild einbinden: src="./pictures/Cozy Gathering Space.jpg"
          -->
          <img src="./pictures/Cozy Gathering Space.jpg" alt="Lesegruppe"
               onerror="this.style.opacity='0'" />
        </div>

        <!-- Bild unten links – z.B. Bibliothek oder Bücherregal -->
        <div class="img-box">
          <!--
            Bild einbinden: src="./pictures/books.jpg"
          -->
          <img src="./pictures/books.jpg" alt="Bücher"
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
      <ul class="list-unstyled mt-2">
        <li class="mb-1"><a href="#">Bücher</a></li>
        <li class="mb-1"><a href="#">Kategorien</a></li>
        <li class="mb-1"><a href="#">Buchclubs</a></li>
        <li class="mb-1"><a href="#">Empfehlungen</a></li>
      </ul>
    </div>

    <!-- Spalte 3 -->
    <div class="col-6 col-lg-2">
      <h5>Community</h5>
      <ul class="list-unstyled mt-2">
        <li class="mb-1"><a href="#">Gruppen</a></li>
        <li class="mb-1"><a href="#">Diskussionen</a></li>
        <li class="mb-1"><a href="#">Blog</a></li>
        <li class="mb-1"><a href="#">Events</a></li>
      </ul>
    </div>

    <!-- Spalte 4 -->
    <div class="col-6 col-lg-2">
      <h5>Unternehmen</h5>
      <ul class="list-unstyled mt-2">
        <li class="mb-1"><a href="#">Über uns</a></li>
        <li class="mb-1"><a href="#">Wie es funktioniert</a></li>
        <li class="mb-1"><a href="#">Kontakt</a></li>
        <li class="mb-1"><a href="#">Datenschutz</a></li>
      </ul>
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