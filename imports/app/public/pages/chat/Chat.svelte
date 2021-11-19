<script>
  import Messages from "/lib/collections/message.js";
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";

  //* COMPONENTS
  import Navbar from "../../components/Navbar.svelte";

  //* MODALS
  import RoomCreate from "../../modals/room-create/RoomCreate.svelte";

  let rooms = [];
  let messages = [];
  let text = null;
  let user = null;
  let selectedRoom = null;

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

  const sendMessage = () => {
    const obj = { message: { text: text, roomId: selectedRoom._id } };

    Loading.hourglass();
    Meteor.call("message.create", obj, function (error, result) {
      Loading.remove();
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      text = "";
    });
  };

  const createdRoom = () => {
    getRoom();
  };

  const selectRoom = (room) => {
    selectedRoom = room;
    Meteor.subscribe("messages.list", selectedRoom._id);
  };

  const senseSide = (message) => {
    if (message.userId === user?._id) {
      return "bg-gray text-white ms-auto";
    } else {
      return "bg-light";
    }
  };

  $m: {
    user = Meteor.user();
    messages = Messages.find({}).fetch();
  }
</script>

<Navbar />

<div class="container p-2 d-flex flex-fill flex-column ">
  <div class="d-flex flex-fill gap-2">
    <div class="flex-grow-0 d-flex flex-column" style="width: 300px;">
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
    </div>

    <div class="flex-grow-1">
      {#if selectedRoom}
        <div class="card h-100">
          <div class="card-header">{selectedRoom.name}</div>
          <div class="card-body position-relative">
            <div class="d-flex flex-column gap-2 p-2 position-absolute top-0 start-0 h-100 w-100 overflow-auto">
              {#each messages as message (message._id)}
                <div class="border rounded p-2 {senseSide(message)}" style="width: 300px;">
                  {message.text}
                </div>
              {/each}
            </div>
          </div>

          <div class="card-footer">
            <div class="input-group">
              <input type="text" class="form-control" bind:value={text} placeholder="Send message" aria-label="Send message" aria-describedby="basic-addon2" />
              <span class="input-group-text brd-cursor-pointer" id="basic-addon2" on:click={sendMessage}>Send</span>
            </div>
          </div>
        </div>
      {:else}
        <div>
          <p class="text-center fs-2 fw-bold py-3">Seçili bir oda yok</p>
        </div>
      {/if}
    </div>
  </div>

  <RoomCreate on:createdRoom={createdRoom} />
</div>
