const elList = document.querySelector('.user-list');
const ellistPost = document.querySelector('.user-post');
const ellistCommit = document.querySelector('.user-commit');
const elItemLoader = document.querySelector('.item-loader');
const elListFonts = document.querySelector('.font-size');

const elTemplate = document.querySelector('.user-template').content;

// const API_KEY = 'b91b1009';

document.querySelector('.fs').addEventListener('click', () => {
    elListFonts.classList.toggle('show');
    elListFonts.style.color = '#000';
})

elListFonts.addEventListener('click', (evt) => {
    if (evt.target.matches('.fz-default')){
        document.body.style.fontSize = '16px';
    }
    if (evt.target.matches('.fz-1')) {
        document.body.style.fontSize = '15px';
    }
    if (evt.target.matches('.fz-2')){
        document.body.style.fontSize = '17px';
    }
    if (evt.target.matches('.fz-3')){
        document.body.style.fontSize = '19px';
    }
    if (evt.target.matches('.fz-4')){
        document.body.style.fontSize = '21px';
    }
    if (evt.target.matches('.fz-5')){
        document.body.style.fontSize = '23px';
    }
})


// render user function
function userData (array, list) {
    list.innerHTML = "";
    const fragmentUser = document.createDocumentFragment();
    array.forEach(item => {
        const clonUserTemplate = elTemplate.cloneNode(true);
        clonUserTemplate.querySelector('.user-item').dataset.numberId = item.id;
        clonUserTemplate.querySelector('.user-userName').textContent = item.username;
        clonUserTemplate.querySelector('.user-id').textContent = item.id;
        clonUserTemplate.querySelector('.user-name').textContent = item.name;
        clonUserTemplate.querySelector('.street').textContent = `${item.address.street}`;
        clonUserTemplate.querySelector('.suite').textContent = item.address.suite;
        clonUserTemplate.querySelector('.city').textContent = item.address.city;
        clonUserTemplate.querySelector('.zipcode').textContent = item.address.zipcode;
        clonUserTemplate.querySelector('.user-geoLocation-link').textContent = `${item.address.geo.lat},${item.address.geo.lng}`;
        clonUserTemplate.querySelector('.user-geoLocation-link').href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
        clonUserTemplate.querySelector('.user-companyName').textContent = item.company.name;
        clonUserTemplate.querySelector('.user-info').textContent = item.company.catchPhrase;
        clonUserTemplate.querySelector('.user-text').textContent = item.company.bs;
        clonUserTemplate.querySelector('.user-tel').textContent = 'Tel: ' + item.phone;
        clonUserTemplate.querySelector('.user-webSite').textContent = 'Website: ' + item.website;
        clonUserTemplate.querySelector('.user-email').textContent = 'Email: ' + item.email;

        fragmentUser.appendChild(clonUserTemplate)
    })
    list.appendChild(fragmentUser);
}

// function user API fetch
async function getUser () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    userData(data, elList);
}
getUser();

// function user/Post 
function userPosts (array, list) {
    list.innerHTML = '';
    const fragmentPost = document.createDocumentFragment();

    array.forEach(item => {
        elItemLoader.innerHTML = '';
        const postItem = document.createElement('li');
        const postTitle = document.createElement('h2');
        const postText = document.createElement('p');

        postItem.classList.add('post-item');
        postTitle.classList.add('post-title');
        postText.classList.add('post-text');

        postItem.dataset.numberId = item.userId;
        postItem.dataset.numberIdCommit = item.id
        postTitle.textContent = item.title;
        postText.textContent = item.body

        postItem.appendChild(postTitle);
        postItem.appendChild(postText);

        fragmentPost.appendChild(postItem);
    })
    list.appendChild(fragmentPost)
}

// function posts API fetch
async function getPosts () {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await res.json();
    elList.addEventListener('click', (evt) => {
        
        if (evt.target.matches('.user-item')) {
            let itemId = Number(evt.target.dataset.numberId);
            let filters = data.filter(a => a.userId == itemId);
            document.querySelector('.item-two').style.display = 'block';
            ellistPost.innerHTML ='';
            userPosts(filters, ellistPost)
        }
    
    })
    userPosts(filters, ellistPost);
}
getPosts()

// function user/Commits
function userCommits (array, list) {
    list.innerHTML = '';

    const fragmentCommit = document.createDocumentFragment();

    array.forEach(item => {
        const commitItem = document.createElement('li');
        const commitTitle = document.createElement('h2');
        const commitText = document.createElement('p');
        const commitEmail = document.createElement('a');

        commitItem.classList.add('commit-item');
        commitTitle.classList.add('commit-title');
        commitText.classList.add('commit-text');
        commitEmail.classList.add('commit-email');

        commitItem.dataset.numberId = item.postId;
        commitTitle.textContent = item.name;
        commitText.textContent = item.body
        commitEmail.textContent = "Email: "+ item.email;
        commitEmail.href = `mailto:${item.email}`;

        commitItem.appendChild(commitTitle);
        commitItem.appendChild(commitText);
        commitItem.appendChild(commitEmail);

        fragmentCommit.appendChild(commitItem);
    })
    list.appendChild(fragmentCommit)

}

// function commits API fetch
async function getCommits () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    const data = await response.json();

    ellistPost.addEventListener('click', (evt) => {
        // document.querySelector('.spinner').style.display = 'block';
   
            if (evt.target.matches('.post-item')) {
                let itemId = Number(evt.target.dataset.numberIdCommit);
                console.log(itemId);
                let filterCommit = data.filter(a => a.postId == itemId);
                ellistCommit.innerHTML = '';
                userCommits(filterCommit, ellistCommit);
            }
    

    })
    userCommits(filterCommit, ellistCommit);
}
getCommits()
