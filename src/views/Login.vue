
<template>

  <b-container fluid="lg" class="mt-3">
  <b-input-group-append>
      <b-button variant="outline-success">Войти</b-button>
      <b-button variant="info">Зарегистрироваться</b-button>
    </b-input-group-append>
<main class="form-signin">
  <form>
    <h1 class="h3 mb-3 fw-normal">Введите логин и пароль</h1>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="e-mail">
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="пароль">
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Вход</button>
  </form>
</main>
  </b-container>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
.main{
  height: 100%;
}

.main{
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: 4px;
  border-bottom-right-radius: 2;
  border-bottom-left-radius: 2;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 2;
  border-top-right-radius: 2;
  border-top-width: 1px;
}

</style>