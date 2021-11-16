<script>
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";

  //* COMPONENTS
  import Navbar from "../../components/Navbar.svelte";

  //* MODALS
  import RoomCreate from "../../modals/room-create/RoomCreate.svelte";

  let rooms = [];

  const getRoom = () => {
    Loading.hourglass();
    Meteor.call("room.list", {}, function (error, result) {
      Loading.remove();
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      rooms = result.data;
    });
  };

  getRoom();

  const createdRoom = () => {
    getRoom();
  };
</script>

<Navbar />

<div class="container-fluid p-2">
  <div class="row">
    <div class="col-4">
      <div class="d-flex mb-2 align-items-center">
        <h5 class="fw-bold mb-0">Rooms</h5>

        <div class="ms-auto">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#brdRoomCreateModal">Add Room</button>
        </div>
      </div>

      <ul>
        {#each rooms as room (room._id)}
          <li>{room.name}</li>
        {/each}
      </ul>
    </div>
  </div>

  <RoomCreate on:createdRoom={createdRoom} />
</div>
