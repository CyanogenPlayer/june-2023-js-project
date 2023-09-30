const url = new URL(location.href);
const postId = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        const div = document.getElementsByClassName('postInfo')[0];

        for (const [key, value] of Object.entries(post)) {
            const p = document.createElement('p');
            p.innerText = `${key}: ${value}`;
            div.appendChild(p);
        }
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
        const div = document.createElement('div');
        div.classList.add('comments');

        for (const comment of comments) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            for (const [key, value] of Object.entries(comment)) {
                const p = document.createElement('p');
                p.innerText = `${key}: ${value}`;
                commentDiv.appendChild(p);
            }

            div.appendChild(commentDiv);
        }

        document.body.appendChild(div);
    });