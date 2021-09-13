<script lang="ts">
  import type Discussion from "../interfaces/Discussion";
  import { discussions, loggedIn, users } from "../stores/stores";
  import DiscussionPreview from "./DiscussionPreview.svelte";

  let filter: string = "";

  function filterMatch(filter: string, discussion: Discussion) {
    if (!filter) return true;
    filter = filter.toUpperCase();
    return discussion.userUUIDs.find((uuid) => {
      const user = $users.find((user) => user.uuid === uuid);
      return (
        user.firstname.toUpperCase().includes(filter) ||
        user.lastname.toUpperCase().includes(filter)
      );
    });
  }

  const loggedInUser = $users.find(({ uuid }) => uuid === $loggedIn);

  $: filteredDiscussions = $discussions.filter((d) => filterMatch(filter, d));
</script>

<aside>
  <header>
    <img
      src="data:image/jpeg;base64,{loggedInUser.picture}"
      alt="Utilisateur connecté"
    />
    <h1>Discussions</h1>
  </header>

  <span class="search">
    🔍
    <input
      type="search"
      name="filterDiscussions"
      id="filterDiscussions"
      placeholder=" Rechercher dans Wackssenger"
      bind:value={filter}
    />
  </span>
  {#if filteredDiscussions.length}
    {#each filteredDiscussions as discussion (discussion.uuid)}
      <DiscussionPreview {discussion} />
    {/each}
  {:else}
    <p>🚫 Aucun résultat.</p>
  {/if}
</aside>

<style lang="postcss">
  .search {
    @apply py-1 px-4 mb-8 rounded-full w-full border items-center md:flex hidden;
    background-color: rgba(134, 142, 153, 0.1);
  }
  [type="search"] {
    @apply outline-none ml-2 w-full bg-transparent;
  }

  aside {
    @apply p-2 bg-white md:flex-auto md:flex-grow-0 flex-grow-0 transition;
  }

  @media screen and (min-width: 768px) {
    aside {
      flex-basis: 360px;
    }
  }

  header {
    @apply p-2 flex mb-2;
  }

  header h1 {
    height: min-content;
    @apply my-auto font-bold text-2xl md:block hidden;
  }

  header img {
    @apply rounded-full shadow border w-10 md:mr-3;
  }

  p {
    @apply mx-auto text-center p-4;
  }
</style>
