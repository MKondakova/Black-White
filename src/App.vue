<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container fluid="lg">
        <b-navbar-brand href="#">GoBW</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'Home' }" active-class="active" exact
              >Игра</b-nav-item
            >
            <b-nav-item :to="{ name: 'Rating' }" active-class="active"
              >Рейтинг</b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'Login' }" active-class="active"
            >Вход</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view />
  </div>
</template>
