<script lang="ts">
  import { loggedIn } from "../stores/stores";

  import type Message from "../interfaces/Message";
  import { onMount } from "svelte";

  export let message: Message;

  onMount(() => {
    lastMessage.scrollIntoView({ block: "end" });
  });
  let lastMessage: HTMLElement;

  $: fromMe = message.userUUID === $loggedIn;
</script>

<section class:fromMe bind:this={lastMessage}>
  <p>
    {message.content}
  </p>
</section>

<style lang="postcss">
  section {
    @apply w-full flex;
  }

  section.fromMe {
    @apply flex-row-reverse;
  }

  p {
    @apply px-4 py-1  w-max m-1 rounded-full bg-gray-200;
  }

  .fromMe p {
    @apply bg-blue-500 text-white items-end;
  }

  section:first-child {
    @apply mt-2;
  }
</style>
