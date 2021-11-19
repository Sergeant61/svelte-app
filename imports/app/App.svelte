<script>
  //* LAYOUTS
  import PublicRoutes from "./public/PublicRoutes.svelte";
  import AuthRoutes from "./auth/AuthRoutes.svelte";
  import UserRoutes from "./user/UserRoutes.svelte";
</script>

<div id="app" class="vh-100 d-flex flex-column">
  <PublicRoutes />
  <AuthRoutes />
  <UserRoutes />
</div>
