<template>
  <main class="contact-page">
    <div class="contact-card">

      <div class="icon-circle">
        <i class="bi bi-envelope-fill"></i>
      </div>

      <h1>Kontakt</h1>

      <p class="subtitle">
        Hast du Fragen, Feedback oder Vorschläge zu Biblio?
        Wir freuen uns über deine Nachricht.
      </p>

      <form
        action="mailto:kontakt@biblio.de"
        method="post"
        enctype="text/plain"
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Dein Name"
          required
        />

        <label>E-Mail-Adresse</label>
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail"
          required
        />

        <label>Nachricht</label>
        <textarea
          name="message"
          placeholder="Wie können wir helfen?"
          required
        ></textarea>

        <button type="submit">
          Nachricht senden
        </button>
      </form>

    </div>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 140px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.15), transparent 35%),
    var(--beige);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;
}

.contact-card {
  width: 100%;
  max-width: 560px;
  background: rgba(247, 241, 230, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 22px;
  padding: 1.6rem 2rem;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.6);
}

.icon-circle {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--beige-dark);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-circle i {
  font-size: 2rem;
  color: var(--accent);
}

h1 {
  text-align: center;
  font-family: Georgia, serif;
  font-size: 1.9rem;
  margin-bottom: 0.4rem;
}

.subtitle {
  text-align: center;
  margin-bottom: 1.2rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  width: 100%;
  display: block;
  margin-bottom: 0.25rem;
  margin-top: 0.65rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

input,
textarea {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 0.65rem 0.85rem;
  background: rgba(255,255,255,0.85);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

textarea {
  min-height: 95px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(138,161,177,0.15);
}

button {
  margin-top: 1.1rem;
  width: 190px;
  height: 42px;
  background: linear-gradient(to bottom, #9cb1bf, #7f98aa);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 400;
  box-shadow:
    0 4px 12px rgba(0,0,0,0.18),
    inset 0 1px 1px rgba(255,255,255,0.3);
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 18px rgba(0,0,0,0.2),
    inset 0 1px 1px rgba(255,255,255,0.3);
}

@media (max-width: 576px) {
  .contact-card {
    padding: 1.4rem;
  }
}
</style>