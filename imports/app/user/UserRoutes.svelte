<script>
  import { Route } from "tinro";

  //* LAYOUT
  import UserLayout from "./layouts/UserLayout.svelte";
</script>

<Route path="/user/*">
  <UserLayout />
</Route>
