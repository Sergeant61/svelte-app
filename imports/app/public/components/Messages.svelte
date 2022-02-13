<script>
  import { onDestroy } from "svelte";
  import { beforeUpdate, afterUpdate } from 'svelte';

  import Messages from "/lib/collections/message.js";
  import ErrorHandler from "/lib/utils/error-handler/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";

  export let selectedRoom;

  // HELPERS
  import ago from '../../../../lib/helper/ago'

  let messages = [];
  let text = null;
  let user = null;
  let selectedRoomSubscribe = null;
  let div;
	let autoscroll;

  const sendMessageKeyup = (event) => {
    if (event.type == "keyup" && event.keyCode == 13) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (text.length == 0) {
      return
    }

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
      return "bg-primary text-white ms-auto";
    } else {
      return "bg-light";
    }
  };

  beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
	});

  onDestroy(() => {
    selectedRoomSubscribe?.stop();
  });

  $m: {
    user = Meteor.user();
    messages = Messages.find({}).fetch();
  }

  $: {
    if (selectedRoom) {
      selectedRoomSubscribe?.stop();
      selectedRoomSubscribe = Meteor.subscribe("messages.list", selectedRoom._id);
    }
  }
</script>

{#if selectedRoom}
  <div class="card h-100">
    <div class="card-header">{selectedRoom.name}</div>
    <div class="card-body position-relative">
      <div bind:this="{div}" class="d-flex flex-column gap-2 p-2 position-absolute top-0 start-0 h-100 w-100 overflow-auto">
        {#each messages as message (message._id)}
          <div class="border rounded p-2 {senseSide(message)}" style="width: 300px;">
            <div class="d-flex small">
              <div class="flex-grow-1 fw-bold">
                {message.user()?.profile?.firstName} {message.user()?.profile?.lastName}
              </div>
              <div class="flex-grow-0 text-muted">
                {ago(message.createdAt)}
              </div>
            </div>
            {message.text}
          </div>
        {/each}
      </div>
    </div>

    <div class="card-footer">
      <div class="input-group">
        <input type="text" class="form-control" bind:value={text} on:keyup={sendMessageKeyup} placeholder="Send message" />
        <span class="input-group-text brd-cursor-pointer" id="basic-addon2" on:click={sendMessage}>Send</span>
      </div>
    </div>
  </div>
{:else}
  <div>
    <p class="text-center fs-2 fw-bold py-3">Seçili bir oda yok</p>
  </div>
{/if}
