<script>
  import { createEventDispatcher } from "svelte";
  export let pagination;

  let currentPage, totalPages, pageItems, totalCount;
  let pages;

  $: {
    if (pagination) {
      currentPage = pagination.currentPage;
      totalPages = pagination.totalPages;
      pageItems = pagination.pageItems;
      totalCount = pagination.totalCount;
      const _pages = [];

      if (totalPages > 7) {
        const startCount = currentPage - 5 < 0 ? 0 : currentPage - 5;
        const endCount = currentPage + 5 > totalPages ? totalPages : currentPage + 5;

        if (startCount > 0) {
          _pages.push({ value: startCount, text: "..." });
        }
        for (let i = startCount; i < endCount; i++) {
          _pages.push({ value: i + 1, text: i + 1 });
        }
        if (endCount < totalPages) {
          _pages.push({ value: endCount + 1, text: "..." });
        }
      } else {
        for (let i = 0; i < totalPages; i++) {
          _pages.push({ value: i + 1, text: i + 1 });
        }
      }

      pages = _pages;
    }
  }

  const eventDispatcher = createEventDispatcher();

  const selectPage = (value) => {
    if (pagination.currentPage == value) {
      return;
    }

    pagination.currentPage = value;
    eventDispatcher("change", pagination);
  };

  const previous = () => {
    if (pagination.currentPage > 1) {
      pagination.currentPage = pagination.currentPage - 1
    }

    eventDispatcher("change", pagination);
  }

  const next = () => {
    if(pages.length > 0) {
      if (pagination.currentPage < pages[pages.length - 1].value) {
        pagination.currentPage = parseInt(pagination.currentPage) + 1
      }
    } else {
      pagination.currentPage = parseInt(pagination.currentPage) + 1
    }
    
    eventDispatcher("change", pagination);
  }

</script>

<nav class="d-flex justify-content-center py-2 px-1">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" on:click="{previous}">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {#each pages as page (page.value)}
      <li class="page-item" class:active={page.value == currentPage}><a class="page-link" href="#" on:click={selectPage(page.value)}>{page.text}</a></li>
    {/each}
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" on:click="{next}">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
