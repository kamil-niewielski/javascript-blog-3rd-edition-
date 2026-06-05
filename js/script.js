'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list';
const  titleList = document.querySelector(optTitleListSelector);

function generateTitleLinks(customSelector = ''){
  /* [DONE] remove contents of titleList */
  function clearMessages(){
	  document.querySelector(optTitleListSelector).innerHTML = '';;
    }
  clearMessages();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector', customSelector);
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
  const links = document.querySelectorAll('.titles a');
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

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

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);
    /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag +'"><span>' +  tag + '</span></a></li>&nbsp;';
      /* [DONE] add generated code to html variable */
        html = html + linkHTML
      /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){
      /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
    /* [DONE] END LOOP: for each tag */
        }
      }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  /* [DONE] END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('.post-tags a.active');
  console.log(activeTagLinks);
  /* [DONE] START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
    }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
    for(let allTagLink of allTagsLinks){
    /* [DONE] add class active */
    allTagLink.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
    }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
    for(let link of links){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
    }
}

addClickListenersToTags();

const optArticleAuthorSelector = '.data-author';
const optAuthorsListSelector = '.list.authors';

function generateAuthors(){
  /* [DONE] find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find authors wrapper */
    const articleAuthorsWrapper = article.querySelector('.post-author');
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '" data-author="' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
      /* [DONE] add generated code to html variable */
        html = html + linkHTML
    /* [DONE] insert HTML of all the links into the authors wrapper */
    articleAuthorsWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
    }
}

generateAuthors()

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "dataAuthor" and read the attribute "data-author of the clicked element */
  const dataAuthor = clickedElement.getAttribute('data-author');
  /* find all authors links with class active */
  const activeAuthorsLinks = document.querySelectorAll('.post-author a.active');
  console.log('activeAuthorsLinks', activeAuthorsLinks);
  /* [DONE] START LOOP: for each active tag link */
    for(let activeAuthorLink of activeAuthorsLinks){
    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');
  /* [DONE] END LOOP: for each active author link */
    }
  clickedElement.classList.add('active');
  /* [DONE] execute function "generateTitleLinks" with author selector as argument */
  generateTitleLinks('[data-author="' + dataAuthor + '"]');
}

function addClickListenersToAuthors(){
  /* [DONE] find all links to tags */
  const authorLinks = document.querySelectorAll('a[data-author]');
  /* [DONE] START LOOP: for each link */
    for (let link of authorLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* [DONE] END LOOP: for each link */
    }
}

addClickListenersToAuthors();


