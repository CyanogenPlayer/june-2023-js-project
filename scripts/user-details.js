const url = new URL(location.href);
const userId = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        const div = document.getElementsByClassName('userInfo')[0];

        const printKeysAndValues = array => {
            for (const [key, value] of Object.entries(array)) {
                const p = document.createElement('p');
                if (typeof value === 'object') {
                    p.innerText = `${key}:`;
                    div.appendChild(p);
                    printKeysAndValues(value);
                } else {
                    p.innerText = `${key}: ${value}`;
                    div.appendChild(p);
                }
            }
        }

        printKeysAndValues(user);
    });

const postsButtonDiv = document.createElement('div');
postsButtonDiv.classList.add('postsButtonDiv');

const postsButton = document.createElement('button');
postsButton.classList.add('postsButton');
postsButton.innerText = 'show/hide posts';
postsButtonDiv.appendChild(postsButton);

const postsDiv = document.createElement('div');
postsDiv.classList.add('posts');
postsDiv.hidden = true;

postsButton.onclick = () => {
    if (postsDiv.hidden) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(response => response.json())
            .then(posts => {
                for (const post of posts) {
                    const div = document.createElement('div');
                    div.classList.add('user');

                    const p = document.createElement('p');
                    p.innerText = `${post.id}. ${post.title}`;

                    const button = document.createElement('button');
                    button.innerText = 'Details';
                    button.onclick = () => {
                        location.href = `./post-details.html?id=${post.id}`;
                    };

                    div.append(p, button);
                    postsDiv.appendChild(div);
                }
            });
    } else {
        postsDiv.innerHTML = '';
    }
    postsDiv.hidden = !postsDiv.hidden;
};

document.body.append(postsButtonDiv, postsDiv);