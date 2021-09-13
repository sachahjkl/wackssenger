<script lang="ts">
  import Discussion from "./components/Discussion.svelte";
  import DiscussionList from "./components/DiscussionList.svelte";
</script>

<section>
  <DiscussionList />
  <Discussion />
</section>

<style lang="postcss">
  section {
    @apply w-full bg-white h-screen flex flex-wrap;
  }
</style>
