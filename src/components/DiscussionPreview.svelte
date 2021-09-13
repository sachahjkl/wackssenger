<script lang="ts">
  import type Discussion from "src/interfaces/Discussion";
  import { getTimeSince } from "../utils";
  import {
    users,
    messages,
    loggedIn,
    selectedDiscussion,
  } from "../stores/stores";

  export let discussion: Discussion = null;

  const TIMEOUT_DELAY = 5000;

  $: timeSince = getTimeSince(lastMessage.sentAt);

  setInterval(
    () => (timeSince = getTimeSince(lastMessage.sentAt)),
    TIMEOUT_DELAY
  );

  $: selected = $selectedDiscussion?.uuid == discussion.uuid;

  $: firstUser = $users.find(
    (user) =>
      user.uuid === discussion.userUUIDs.find((uuid) => uuid !== $loggedIn)
  );
  $: lastMessage = $messages.find(
    (message) =>
      message.uuid ===
      discussion.messageUUIDs[discussion.messageUUIDs.length - 1]
  );
</script>

<section class:selected on:click={() => ($selectedDiscussion = discussion)}>
  <div class="picture">
    <img src="data:image/jpeg;base64,{firstUser.picture}" alt="profil" />
  </div>
  <div class="sneak">
    <p class="name">
      {firstUser.firstname}
      {firstUser.lastname}
    </p>
    <p class="last-message">
      {#if lastMessage.userUUID === $loggedIn} You: {/if}
      {lastMessage.content}
      <span class="whitespace-nowrap"> ⸱ {timeSince}</span>
    </p>
    <p />
  </div>
</section>

<style lang="postcss">
  .picture img {
    @apply rounded-full shadow border w-16  md:mr-3;
    min-width: 4rem;
  }

  .sneak {
    @apply text-gray-900 py-3 md:block hidden;
  }

  .last-message {
    @apply text-gray-600 text-sm;
  }
  section {
    @apply flex md:border md:p-2 rounded  md:hover:bg-blue-50 bg-white mb-2 cursor-pointer md:shadow-sm transition-all;
  }
  .selected {
    @apply md:bg-blue-50 md:shadow-lg;
  }

  @media screen and (max-width: 768px) {
    .selected .picture img {
      @apply shadow-xl;
    }
    .selected {
      outline-style: dotted;
      outline-width: 2px;
      outline-color: var(--bg-blue-500);
    }
  }
</style>
