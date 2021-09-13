<script lang="ts">
  import type Message from "../interfaces/Message";

  import {
    discussions,
    loggedIn,
    messages,
    selectedDiscussion,
  } from "../stores/stores";

  import { fly } from "svelte/transition";
  import { uuidv4 } from "../utils";

  let value: string;

  function sendMessage() {
    const newUUID = uuidv4();
    const newMessage: Message = {
      uuid: newUUID,
      sentAt: new Date(),
      userUUID: $loggedIn,
      content: value,
    };
    $messages = [...$messages, newMessage];

    let i = 0;
    for (; i < $discussions.length; i++) {
      if ($discussions[i].uuid === $selectedDiscussion.uuid) break;
    }

    $discussions[i].messageUUIDs = [...$discussions[i].messageUUIDs, newUUID];

    value = null;
  }
</script>

<section>
  <form action="" on:submit|preventDefault={sendMessage}>
    <input
      type="text"
      name="message-input"
      id="message-input"
      bind:value
      placeholder="Aa"
    />
    <button type="submit">✉️</button>
  </form>
</section>

<style lang="postcss">
  section {
    @apply flex p-3 bg-white border-t transition-all;
  }
  form {
    @apply flex w-full;
  }
  input {
    @apply rounded-full flex-auto bg-gray-100 border py-2 px-4 mr-4;
  }
  button {
    @apply text-3xl flex-1 flex-grow-0;
  }
</style>
