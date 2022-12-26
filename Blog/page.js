async function getData(id) {
  let result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  return await result.json();
}

async function getComments(id) {
  let result = await fetch(`https://gorest.co.in/public-api/comments?posts/${id}`);
  return await result.json();
}

const URLData = new URLSearchParams(window.location.search);
const id = URLData.get("page_id");

let postData = await getData(id);
let postComments = await getComments(id);

function createPost(post) {
  let title = document.createElement('h1');
  title.textContent = post.title;
  title.classList.add('card-header', 'text-center');

  document.title = post.title;

  let content = document.createElement('p');
  content.textContent = post.body;
  content.classList.add('card-text', 'text-center');

  document.body.append(title);
  document.body.append(content);
}

function createComments(post) {
  let list = document.createElement('ul');
  list.classList.add('list-group', 'list-group-flush');

  for (const item of post) {
    let comment = document.createElement('li');
    comment.classList.add('list-group-item');

    let name = document.createElement('p');
    name.textContent = item.name;
    name.classList.add('fw-bolder');

    let content = document.createElement('p');
    content.textContent = item.body;

    comment.append(name);
    comment.append(content);
    list.append(comment);
  }
  document.body.append(list);
}

createPost(postData.data);
createComments(postComments.data);
