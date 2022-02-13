<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  //* COMPONENTS
  import Navbar from "../../components/Navbar.svelte";

  // UTILS
  import { count } from "../../../../../lib/stores/count";
</script>

<Navbar />

<div class="p-2">
  <h4>Home {$count}</h4>

  <div class="d-flex gap-2">
    <button class="btn btn-success" on:click={count.increment}>Inc</button>
    <button class="btn btn-warning" on:click={count.decrement}>Dec</button>
    <button class="btn btn-danger" on:click={count.reset}>Dec</button>
  </div>
</div>
<div class="p-2">
  <progress value={$progress} />

  <div class="d-flex justify-content-between gap-2">
    <button class="btn btn-info" on:click={() => progress.set(0)}> 0% </button>

    <button class="btn btn-info" on:click={() => progress.set(0.25)}> 25% </button>

    <button class="btn btn-info" on:click={() => progress.set(0.5)}> 50% </button>

    <button class="btn btn-info" on:click={() => progress.set(0.75)}> 75% </button>

    <button class="btn btn-info" on:click={() => progress.set(1)}> 100% </button>
  </div>
</div>

<style>
  progress {
    display: block;
    width: 100%;
  }
</style>
