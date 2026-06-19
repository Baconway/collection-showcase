<script lang="ts">
  import { scale, slide } from "svelte/transition";

  interface DisplayProps {
    metadata: { proxy_origin: string; name: string }[];
    collection_display_size: string;
  }

  interface frame {
    proxy_origin: string;
    name: string;
  }
  // col_display_size is to differentiate between frames and nameplates
  let { metadata, collection_display_size }: DisplayProps = $props();

  let popup_opened = $state(false);
  let imageItem_selected = $state({ proxy_origin: "", name: "" });

  const clamp = (num: number, min: number, max: number) => {
    return Math.max(min, Math.min(num, max));
  };

  // pagination logic
  let currentPage = $state(1);
  let ItemsPerPage = 9;
  let TotalPages = $derived(Math.ceil(metadata.length / 9));
  let start = $derived(ItemsPerPage * (clamp(currentPage, 1, TotalPages) - 1));
  let end = $derived(start + ItemsPerPage);

  let paginatedArr = $derived(metadata.slice(start, end));
</script>

{#snippet miniFrame(imageItem: frame, delay: number)}
  <div in:slide={{ delay: delay, axis: "x" }}>
    <button
      class="flex flex-col items-center-safe justify-between
      p-1.5
      border-2 border-salt-2 hover:border-salt-3 rounded-md duration-200
      cursor-pointer
      font-[Kosugi_Maru]"
      onmousedown={() => {
        popup_opened = true;
        imageItem_selected = imageItem;
      }}
    >
      <img
        class="w-75 {collection_display_size == 'frame' ? 'h-31.5' : 'h-12'}"
        src={`${imageItem.proxy_origin}/${decodeURI(imageItem.name)}`}
        alt={decodeURI(imageItem.name)}
      />
      <p class="w-75 h-12 truncate">
        {decodeURI(imageItem.name).replace(".png", "")}
      </p>
    </button>
  </div>
{/snippet}

<div
  class="grid lg:grid-cols-3 lg:grid-rows-3 grid-cols-1 grid-rows-9 gap-5 mx-5"
>
  {#each paginatedArr as imageItem, i}
    {#key currentPage}
      {@render miniFrame(imageItem, i * 75)}
    {/key}
  {/each}
</div>

<div
  class="flex flex-col justify-center-safe items-center-safe gap-2 font-[Kosugi_Maru]"
>
  <p>Page {clamp(currentPage, 1, TotalPages)} of {TotalPages}</p>
  <div class="flex flex-row gap-5 font-[Kosugi_Maru]">
    <button
      onmousedown={() => (currentPage = clamp(currentPage - 1, 1, TotalPages))}
      >Back
    </button>
    <input
      type="number"
      min={1}
      max={TotalPages}
      placeholder={String(currentPage)}
      bind:value={currentPage}
      onfocus={() => (currentPage = 1)}
    />
    <button
      onmousedown={() => (currentPage = clamp(currentPage + 1, 1, TotalPages))}
      >Next
    </button>
  </div>
</div>

{#if popup_opened}
  <div
    class="absolute inset-0
    flex justify-center-safe items-center-safe
    duration-200
    font-[Kosugi_Maru] text-white"
    transition:scale
  >
    <div
      class="flex flex-col justify-center-safe items-center-safe
      p-6
      border-2 border-shiroko-3 rounded-md
      bg-shiroko-4"
    >
      <div class="relative">
        <img
          class="relative w-2xl"
          src={`${imageItem_selected.proxy_origin}/${decodeURI(imageItem_selected.name)}`}
          alt={"idk"}
        />
        <button
          class="absolute -top-6 -right-6 rounded-tr-sm bg-red-500"
          onmousedown={() => (popup_opened = false)}
          ><img src="/close.svg" alt="close" />
        </button>
      </div>

      <p class="w-2xl text-3xl">
        {decodeURI(imageItem_selected.name).replace(".png", "")}
      </p>
    </div>
  </div>
{/if}
