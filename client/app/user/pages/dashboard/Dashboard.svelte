<script>
  import { Meteor } from "meteor/meteor";
  import { router } from "tinro";

  const signOut = (event) => {
    event.preventDefault();

    Meteor.logout(function () {
      router.goto("/");
    });
  };
</script>

<div class="d-flex">
  <h5>Dashboard</h5>

  <div class="ms-auto">
    <button on:click={signOut} class="btn btn-danger">Sign Out</button>
  </div>
</div>
