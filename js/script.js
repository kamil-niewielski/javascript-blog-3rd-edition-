'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const  titleList = document.querySelector(optTitleListSelector);

function generateTitleLinks(){
  /* [DONE] remove contents of titleList */
  function clearMessages(){
	  document.querySelector(optTitleListSelector).innerHTML = '';
    }
  clearMessages();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
    /* [DONE] get the article id */
    for(let article of articles){
    /* [DONE] find the title element */
    const articleId = article.getAttribute('id');
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    // titleList.innerHTML = titleList.innerHTML + linkHTML; alternative
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log('links', links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
