<script lang="ts">
  import ShowcaseDefaults from "../showcase.json";
  import { fly } from "svelte/transition";

  let { OriginDir }: { OriginDir: string } = $props();
</script>

<div class="relative flex flex-col group hover:gap-5">
  <img
    class=" w-75 h-31.5 z-10 -mb-10
      group-hover:mb-0 duration-200"
    src={`${OriginDir}/${ShowcaseDefaults.Frames[0]}`}
    alt="Frame"
    transition:fly
  />
  <img
    class=" w-75 h-31.5 z-20 -mb-10
      group-hover:mb-0 duration-200"
    src={`${OriginDir}/${ShowcaseDefaults.Frames[1]}`}
    alt="Frame"
    transition:fly
  />

  <img
    class="relative w-75 h-31.5 z-30"
    src={`${OriginDir}/${ShowcaseDefaults.Frames[2]}`}
    alt="Frame"
  />
</div>
