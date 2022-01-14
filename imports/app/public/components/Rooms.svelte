<script>
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";
  import { createEventDispatcher } from "svelte";

  //* MODALS
  import RoomCreate from "../modals/room-create/RoomCreate.svelte";

  let rooms = [],
    selectedRoom;

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

  const eventDispatcher = createEventDispatcher();

  const selectRoom = (room) => {
    selectedRoom = room;
    eventDispatcher("onSelectedRoom", room);
  };
</script>

<div class="d-flex mb-2 align-items-center">
  <h5 class="fw-bold mb-0">Rooms</h5>

  <div class="ms-auto">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#brdRoomCreateModal">Add Room</button>
  </div>
</div>
<div class="flex-fill position-relative">
  <div class="position-absolute top-0 start-0 h-100 w-100 overflow-auto">
    <ul class="list-group">
      {#each rooms as room (room._id)}
        <li on:click={selectRoom(room)} class="list-group-item brd-cursor-pointer" class:active={room._id == selectedRoom?._id}>{room.name}</li>
      {/each}
    </ul>
  </div>
</div>

<RoomCreate on:onCreatedRoom={createdRoom} />
