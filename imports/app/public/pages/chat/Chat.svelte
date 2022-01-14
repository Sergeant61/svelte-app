<script>
  //* COMPONENTS
  import Rooms from "../../components/Rooms.svelte";
  import Messages from "../../components/Messages.svelte";
  import Navbar from "../../components/Navbar.svelte";
  
  let selectedRoom = null;

  const onSelectedRoom = (data) => {
    selectedRoom = data.detail;
    console.log(data);
  }

</script>

<Navbar />

<div class="container p-2 d-flex flex-fill flex-column ">
  <div class="d-flex flex-fill gap-2">
    <div class="flex-grow-0 d-flex flex-column" style="width: 300px;">
      <Rooms on:onSelectedRoom={onSelectedRoom}/>
    </div>

    <div class="flex-grow-1">
      <Messages selectedRoom={selectedRoom}/>
    </div>
  </div>
</div>
