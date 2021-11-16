<script>
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import Swal from "sweetalert2";
  import { Translate } from "/lib/configs/client/i18n.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailAddress = event.target.emailAddress.value;

    Loading.hourglass();
    Meteor.call("auth.forgotPassword", { email: emailAddress }, function (error, result) {
      Loading.remove();
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      Swal.fire({
        title: Translate("globals.swal", "successTitle"),
        text: Translate("globals.swal", "forgotPasswordText"),
        icon: "success",
        confirmButtonText: Translate("globals", "ok"),
      });
    });
  };
</script>

<div class="container-fluid bg-light">
  <div class="d-flex flex-column flex-fill align-items-center h-100">
    <div class="form-sign">
      <h1 class="fw-bolder display-3">Şifremi Unuttum</h1>
      <p class="pb-3">Lütfen e-mail adresinizi giriniz.</p>

      <form on:submit={handleSubmit} class="brd-loading-section">
        <div class="form-floating">
          <input type="email" class="form-control" id="emailAddress" required placeholder=" " />
          <label for="emailAddress">E-mail addres</label>
        </div>

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-outline-primary btn-lg" type="submit">Şifremi sıfırla</button>
        </div>

        <div class="d-flex justify-content-between">
          <a href="/auth/sign-in" class="text-black-50 pt-3">Giriş Yap</a>
          <a href="/auth/sign-up" class="text-black-50 pt-3">Kayıt ol</a>
        </div>
      </form>
    </div>
  </div>
</div>
