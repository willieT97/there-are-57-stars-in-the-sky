const blogContainer = document.getElementById('blog-container');
const postContainer = document.getElementById('post-container');

fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postContainer && postId) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        postContainer.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        `;
        document.title = post.title;
      } else {
        postContainer.innerHTML = '<p>Post not found.</p>';
      }
    }

    if (blogContainer) {
      posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
          <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
          <p>${post.snippet} <a href="post.html?id=${post.id}">Read more</a></p>
        `;
        blogContainer.appendChild(article);
      });
    }
  })
  .catch(error => {
    console.error('Error loading posts:', error);
  });
