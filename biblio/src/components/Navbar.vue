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
</template>