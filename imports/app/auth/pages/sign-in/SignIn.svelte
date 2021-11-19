<script>
  import { Meteor } from "meteor/meteor";
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";
  import { router } from "tinro";

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailAddress = event.target.emailAddress.value;
    const password = event.target.password.value;

    Loading.hourglass();
    Meteor.loginWithPassword(emailAddress, password, function (error, result) {
      Loading.remove();
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      const redirect = router.location.query.get("redirect");

      if (redirect) {
        router.goto(typeof redirect === "string" ? redirect : "/");
      } else {
        router.goto("/");
      }
    });
  };
</script>

<div class="container-fluid bg-light">
  <div class="d-flex flex-column flex-fill align-items-center h-100">
    <div class="form-sign">
      <h1 class="fw-bolder display-3">Giriş Yap</h1>
      <p class="pb-3">Hesabınızı giriş yapınız.</p>

      <form on:submit={handleSubmit} class="brd-loading-section">
        <div class="form-floating">
          <input type="email" class="form-control brd-border-bottom-unset" id="emailAddress" required placeholder=" " />
          <label for="emailAddress">E-mail addres</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control brd-border-top-unset" id="password" autocomplete="on" required placeholder=" " />
          <label for="password">Şifre</label>
        </div>

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-outline-primary btn-lg" type="submit">Giriş</button>
        </div>

        <div class="d-flex justify-content-between">
          <a href="/auth/forgot-password" class="text-black-50 pt-3">Şifremi Unuttum</a>
          <a href="/auth/sign-up" class="text-black-50 pt-3">Kayıt Ol</a>
        </div>
      </form>
    </div>
  </div>
</div>
