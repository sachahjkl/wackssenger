<script lang="ts">
  import { fade, fly } from "svelte/transition";

  import {
    loggedIn,
    selectedDiscussion,
    users,
    messages,
  } from "../stores/stores";
  import DiscussionInput from "./DiscussionInput.svelte";
  import MessageList from "./MessageList.svelte";

  $: inactive = $selectedDiscussion === null;

  $: firstUserId = $selectedDiscussion?.userUUIDs.find(
    (id) => id !== $loggedIn
  );

  $: firstUser = $users.find((user) => user.uuid === firstUserId);

  $: sMessages = $messages.filter(({ uuid: id }) =>
    $selectedDiscussion?.messageUUIDs.includes(id)
  );
</script>

{#if !inactive}
  <main in:fly={{ y: -100 }}>
    <header>
      <section class="title">
        <div class="picture">
          <img src="data:image/jpeg;base64,{firstUser.picture}" alt="profil" />
        </div>
        <div class="sneak">
          <p class="name">
            {firstUser.firstname}
            {firstUser.lastname}
          </p>
          <p class="last-message" />
          <p />
        </div>
      </section>
      <button
        type="button"
        class="close"
        on:click={() => ($selectedDiscussion = null)}>❌</button
      >
    </header>
    <MessageList messages={sMessages} />
    <DiscussionInput />
  </main>
{:else}
  <main>
    <p class:inactive>Veuillez séléctionner une discussion.</p>
  </main>
{/if}

<style lang="postcss">
  main {
    @apply h-full border-l lg:order-1 flex flex-col relative bg-gray-100;

    flex: 5 1 auto;
  }

  /* .inactive > p {
    @apply h;
  } */

  .inactive {
    @apply absolute h-auto text-gray-400 top-2/4 left-2/4  text-center transition-all;

    transform: translate(-50%, -50%);
  }

  header {
    @apply flex p-3 border-b shadow-sm justify-between bg-white;
  }
  .title {
    @apply flex items-center;
  }
  .picture img {
    @apply rounded-full shadow border w-10 mr-3;
  }

  .sneak {
    @apply text-gray-900 py-1;
  }

  .name {
    @apply text-lg font-semibold;
  }
</style>
