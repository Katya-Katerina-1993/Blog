const pageParams = new URLSearchParams(window.location.search);

async function getData() {
  let result = await fetch(`https://gorest.co.in/public-api/posts?page=${pageParams.get('page')}`);
  return await result.json();
}

async function getMeta() {
  let result = await fetch('https://gorest.co.in/public-api/posts');
  let resultJSON = await result.json();
  return await resultJSON.meta.pagination;
}

const list = await getData();
const pagination = await getMeta();

function createPostsList(data) {
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('container-fluid');

  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');

  for (const item of data) {
    const post = document.createElement('li');
    post.classList.add('list-group-item');

    const link = document.createElement('a');
    link.textContent = item.title;
    link.href = `page.html?page_id=${item.id}`;
    link.classList.add('list-group-item-action');

    link.addEventListener('click', function () {
      link.classList.add('active', 'bg-info');
      post.classList.add('bg-info');
    });

    post.append(link);
    postsList.append(post);
  }
  postsContainer.append(postsList)
  document.body.append(postsContainer);
}

function createPagination(pagination) {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('container-fluid');

  const numberOfPosts = document.createElement('p');
  numberOfPosts.textContent = `Всего статей: ${pagination.total}`;

  const numberPerPage = document.createElement('p');
  numberPerPage.textContent = `Статей на странице: ${pagination.limit}`;

  // Список страниц для пагинации
  const paginationList = document.createElement('ul');
  paginationList.classList.add('pagination', 'd-flex', 'flex-wrap');

  for (let i = 1; i <= pagination.pages; i++) {
    const page = document.createElement('li');
    page.classList.add('page-item');

    const link = document.createElement('a');
    link.textContent = i;
    link.classList.add('page-link');

    if (i === 1) {
      link.href = "index.html";
    } else {
      link.href = `index.html?page=${i}`;
    }

    page.addEventListener('click', function () {
      page.classList.add('active');
    });

    page.append(link);
    paginationList.append(page);
  }

  paginationContainer.append(numberOfPosts);
  paginationContainer.append(numberPerPage);
  paginationContainer.append(paginationList);
  document.body.append(paginationContainer);
}

createPostsList(list.data);
createPagination(pagination);
