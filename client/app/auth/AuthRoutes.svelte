<script>
  import { Route } from "tinro";

  //* LAYOUT
  import AuthLayout from "./layouts/AuthLayout.svelte";

</script>

<Route path="/auth/*">
  <AuthLayout />
</Route>
