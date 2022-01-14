<script>
  import { onDestroy } from "svelte";
  import Messages from "/lib/collections/message.js";
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";

  export let selectedRoom;

  let messages = [];
  let text = null;
  let user = null;
  let selectedRoomSubscribe = null;

  *** if (selectedRoom) {
    if (selectedRoomSubscribe) {
      selectedRoomSubscribe.stop();
    }

    selectedRoomSubscribe = Meteor.subscribe("messages.list", selectedRoom._id);
  }

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

  const senseSide = (message) => {
    if (message.userId === user?._id) {
      return "bg-gray text-white ms-auto";
    } else {
      return "bg-light";
    }
  };

  onDestroy(() => {
    if (selectedRoomSubscribe) {
      selectedRoomSubscribe.stop();
    }
  });

  $m: {
    user = Meteor.user();
    messages = Messages.find({}).fetch();
  }
</script>

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
