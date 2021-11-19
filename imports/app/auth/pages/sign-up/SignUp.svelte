<script>
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";
  import { router } from "tinro";

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const emailAddress = event.target.emailAddress.value;
    const password = event.target.password.value;
    const passwordAgain = event.target.passwordAgain.value;

    const obj = {
      emailAddress: emailAddress,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName,
      },
    };

    Loading.hourglass();
    Meteor.call("user.create", obj, function (error,result) {
      Loading.remove();
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      const redirect = router.location.query.get("redirect");

      if (redirect) {
        router.goto(redirect);
      } else {
        router.goto("/");
      }
    });
  };
</script>

<div class="container-fluid bg-light">
  <div class="d-flex flex-column flex-fill align-items-center h-100">
    <div class="form-sign">
      <h1 class="fw-bolder display-3">Kayıt Ol</h1>
      <p class="pb-3">Yeni bir hesap oluştur.</p>

      <form on:submit={handleSubmit} class="brd-loading-section">
        <div class="form-floating">
          <input type="text" class="form-control brd-border-bottom-unset" id="firstName" placeholder=" " />
          <label for="firstName">Ad</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control brd-border-bottom-unset brd-border-top-unset" id="lastName" placeholder=" " />
          <label for="lastName">Soyad</label>
        </div>

        <div class="form-floating">
          <input type="email" class="form-control brd-border-bottom-unset brd-border-top-unset" id="emailAddress" placeholder=" " />
          <label for="emailAddress">E-mail adres</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control brd-border-bottom-unset brd-border-top-unset" id="password" autocomplete="off" placeholder=" " />
          <label for="password">Şifre</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control brd-border-top-unset" id="passwordAgain" autocomplete="off" placeholder=" " />
          <label for="passwordAgain">Şifre Tekrar</label>
        </div>

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-outline-primary btn-lg" type="submit">Kayıt ol</button>
        </div>

        <div class="d-flex justify-content-between">
          <a href="/auth/sign-in" class="text-black-50 pt-3">Giriş Yap</a>
        </div>
      </form>
    </div>
  </div>
</div>
