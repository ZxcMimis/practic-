const API = 'https://680dfedbc47cb8074d91bfe7.mockapi.io/ap/post/comments';
const form = document.querySelector('.form');
const titleInput = document.querySelector('.form-title');
const textInput = document.querySelector('.form-text');
const postsList = document.querySelector('.posts');
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    if (!title || !text) return;
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                text
            })
        });
        const newPost = await res.json();
        renderPost(newPost);
        form.reset();
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u0456 \u043F\u043E\u0441\u0442\u0430:", error);
    }
});
async function getPosts() {
    try {
        const res = await fetch(API);
        const posts = await res.json();
        postsList.innerHTML = '';
        posts.forEach(renderPost);
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u0456 \u043F\u043E\u0441\u0442\u0456\u0432:", error);
    }
}
function renderPost(post) {
    const postEl = document.createElement('li');
    postEl.className = 'post';
    postEl.innerHTML = `
    <h3 class="post-title">${post.title}</h3>
    <p class="post-text">${post.text}</p>
    <button class="btn-delete" data-id="${post.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
  `;
    postsList.appendChild(postEl);
}
postsList.addEventListener('click', async (e)=>{
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        try {
            await fetch(`${API}/${id}`, {
                method: 'DELETE'
            });
            e.target.closest('.post').remove();
        } catch (error) {
            console.error(error);
        }
    }
});
getPosts();

//# sourceMappingURL=practic-.de158e3a.js.map
