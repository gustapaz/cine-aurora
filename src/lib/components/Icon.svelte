<script lang="ts">
  let { name, size = 20 }: { name: string; size?: number } = $props();
  const paths: Record<string, string> = {
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    play: 'm9 5 12 7-12 7z',
    ticket: 'M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V7zm13 0v3m0 4v5',
    clock: 'M12 7v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
    calendar:
      'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
    search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    close: 'm6 6 12 12M6 18 18 6',
    menu: 'M4 7h16M4 17h16',
    info: 'M12 11v6m0-10v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
    check: 'm5 12 4 4L19 6',
    chevron: 'm9 5 7 7-7 7',
    download: 'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5',
    seat: 'M5 13V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6M3 12v6h18v-6M5 18v3m14-3v3M3 12h4v3h10v-3h4',
    location: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
    spark: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z',
    back: 'M20 12H4m6-6-6 6 6 6',
    trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
    film: 'M4 3h16v18H4zM4 8h16M4 16h16M8 3v18m8-18v18',
    volume: 'M11 5 6 9H2v6h4l5 4V5zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  };
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.6"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"><path d={paths[name] || paths.spark} /></svg
>
