fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const usersDiv = document.createElement('div');
        usersDiv.classList.add('users');

        for (const user of users) {
            const div = document.createElement('div');
            div.classList.add('user');

            const p = document.createElement('p');
            p.innerText = `${user.id}. ${user.name}`;

            const button = document.createElement('button');
            button.innerText = 'Details';
            button.onclick = () => {
                location.href = `./user-details.html?id=${user.id}`;
            };

            div.append(p, button);
            usersDiv.appendChild(div);
        }

        document.body.appendChild(usersDiv);
    });