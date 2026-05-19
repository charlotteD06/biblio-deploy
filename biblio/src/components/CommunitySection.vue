<!--Community-->
<script setup>
import bibliophile from '../assets/pictures/bibliophile.jpg'
import cozyGathering from '../assets/pictures/Cozy Gathering Space.jpg'
import books from '../assets/pictures/books.jpg'
</script>

<template>
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
          <img :src="bibliophile" alt="Bibliophile" />
        </div>

        <!-- Bild rechts, groß (überspannt beide Zeilen) -->
        <div class="img-box tall">
          <!--
            Bild einbinden: src="./pictures/Cozy Gathering Space.jpg"
          -->
          <img :src="cozyGathering" />
        </div>

        <!-- Bild unten links – z.B. Bibliothek oder Bücherregal -->
        <div class="img-box">
          <!--
            Bild einbinden: src="./pictures/books.jpg"
          -->
          <img :src="books" />
        </div>

      </div>
    </div>

  </div>
</section>
</template>