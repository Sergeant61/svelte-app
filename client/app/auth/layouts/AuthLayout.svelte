<script>
  import { Route } from "tinro";

  //* PAGES
  import SignIn from "../pages/sign-in/SignIn.svelte";
  import SignUp from "../pages/sign-up/SignUp.svelte";
  import ForgotPassword from "../pages/forgot-password/ForgotPassword.svelte";
  import ForgotPasswordVerify from "../pages/forgot-password-verify/ForgotPasswordVerify.svelte";
  import SetPassword from "../pages/set-password/SetPassword.svelte";

  //* COMPONENTS
</script>

<div class="d-flex flex-column min-vh-100">
  <div class="d-flex flex-fill px-0">
    <Route path="/sign-in"><SignIn /></Route>
    <Route path="/sign-up"><SignUp /></Route>
    <Route path="/forgot-password"><ForgotPassword /></Route>
    <Route path="/forgot-password-verify"><ForgotPasswordVerify /></Route>
    <Route path="/set-password"><SetPassword /></Route>
  </div>
</div>
