<script>
  import { Route } from "tinro";

  //* PAGES
  import Home from "../pages/home/Home.svelte";
  import About from "../pages/about/About.svelte";
  import Contract from "../pages/contract/Contract.svelte";
  import Chat from "../pages/chat/Chat.svelte";

</script>

<Route path="/"><Home /></Route>
<Route path="/about"><About /></Route>
<Route path="/contract"><Contract /></Route>
<Route path="/chat"><Chat /></Route>
