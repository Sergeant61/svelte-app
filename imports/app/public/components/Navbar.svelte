<script>
  import { active } from "tinro";

  let user = null;

  $m: {
    user = Meteor.user();
  }
</script>

<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <a href="/"><img src="/assets/images/svelte-logo-horizontal.svg" alt="" height="50" class="d-inline-block align-text-top" /> </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-sm-0">
        <li class="nav-item">
          <a href="/about" class="nav-link" use:active active-class="fw-bold" aria-current="about">About</a>
        </li>
        <li class="nav-item">
          <a href="/contract" class="nav-link" use:active active-class="fw-bold" aria-current="about">Contract</a>
        </li>
        {#if user}
          <li class="nav-item">
            <a href="/chat" class="nav-link" use:active active-class="fw-bold" aria-current="about">Chat</a>
          </li>
        {/if}
      </ul>

      <div class="d-flex gap-2">
        {#if user}
          <a href="/user/dashboard" class="btn btn-primary">My Profile</a>
        {:else}
          <a href="/auth/sign-in" class="btn btn-primary">Sign In</a>
          <a href="/auth/sign-up" class="btn btn-secondary">Sign Up</a>
        {/if}
      </div>
    </div>
  </div>
</nav>
