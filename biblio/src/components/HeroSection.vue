<script setup>
function scrollToBooks() {
  const section =
    document.getElementById('popular-section')

  section?.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>
<template>
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
          <RouterLink to="/register" class="btn-biblio btn">
            Join Biblio
          </RouterLink>
          <a href="#popular-section" class="btn-biblio-outline btn">
            Explore Books
          </a>
        </div>
      </div>

      <!-- Bücher Visual – nur auf Desktop -->
      <div class="col-lg-6 d-none d-md-flex justify-content-center">
        <div class="hero-books">
          <div class="book-spine spine-1">The Hidden World</div>
          <div class="book-spine spine-2">A Thousand Skies</div>
          <div class="book-spine spine-3">The Flower Letter</div>
          <div class="book-cover">
            <div class="book-mountain"></div>
            <h3>The Summer We Met</h3>
            <small>J. L. Morgan</small>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>