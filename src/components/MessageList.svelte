<script lang="ts">
  import { fly } from "svelte/transition";

  import type MessageType from "../interfaces/Message";
  import Message from "./Message.svelte";

  export let messages: MessageType[];
  let messagesContainer: HTMLDivElement;
</script>

<section bind:this={messagesContainer}>
  {#each messages as message (message.uuid)}
    <Message {message} />
  {/each}
</section>

<style class="postcss">
  section {
    height: 100%;
    @apply px-4;
    @apply overflow-y-scroll;
  }
</style>
