<script>
  //* LAYOUTS
  import PublicRoutes from "./public/PublicRoutes.svelte";
  import AuthRoutes from "./auth/AuthRoutes.svelte";
  import UserRoutes from "./user/UserRoutes.svelte";
</script>

<div id="app">
  <PublicRoutes />
  <AuthRoutes />
  <UserRoutes />
</div>
