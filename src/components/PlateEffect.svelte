<script lang="ts">
  import ShowcaseDefaults from "../showcase.json";
  import { fly } from "svelte/transition";

  let { OriginDir }: { OriginDir: string } = $props();
</script>

<div class="relative flex flex-col group hover:gap-3">
  <img
    class=" w-75 h-12 z-10 -mb-5
      group-hover:mb-0 duration-200"
    src={`${OriginDir}/${ShowcaseDefaults.Nameplates[0]}`}
    alt="Frame"
    transition:fly
  />
  <img
    class=" w-75 h-12 z-20 -mb-5
      group-hover:mb-0 duration-200"
    src={`${OriginDir}/${ShowcaseDefaults.Nameplates[1]}`}
    alt="Frame"
    transition:fly
  />

  <img
    class="relative w-75 h-12 z-30"
    src={`${OriginDir}/${ShowcaseDefaults.Nameplates[2]}`}
    alt="Frame"
  />
</div>
