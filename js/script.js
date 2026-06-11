'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';
const  titleList = document.querySelector(optTitleListSelector);
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsLinkSidebar: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
}
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
        // const linkHTML = '<li><a href="#tag-' + tag +'"><span>' +  tag + '</span></a></li>&nbsp;';
      /* [DONE] add generated code to html variable */
        html = html + linkHTML
      /* [DONE] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
      /* [DONE] add generated code to allTags object */
        allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
    /* [DONE] END LOOP: for each tag */
      }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [DONE] Create new const tagParams */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams', tagsParams);
    /* [DONE] create variable for all links HTML code */
    const allTagsData = {tags: []};
    /* [DONE] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /*[DONE] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams)
      });
      // allTagsHTML += '<li><a class="' + calculateTagsClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag +'</span> (' + allTags[tag] +')</a></li>';
      /*[DONE] END LOOP: for each tag in allTags: */
    }
    /* [DONE] add html from allTags to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData', allTagsData);
  /* [DONE] END LOOP: for every article: */
    }

    function calculateTagsParams(allTags){
          const params = {
      max : 0,
      min : 999999,
    };
    for(let tag in allTags){
      console.log(tag + ' is used ' + allTags[tag] + ' times');
      if(allTags[tag] > params.max){
      params.max = allTags[tag];
      }
      if(allTags[tag] < params.min){
      params.min = allTags[tag];
      }
    }
    return params
    console.log('params', params);
}
}

function calculateTagsClass(count, params){

const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

return optCloudClassPrefix + classNumber;
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

function generateAuthors(){
  /* [DONE] New variable with empty object */
  let allAuthors = {};
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
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.articleLink(linkHTMLData);
    // const linkHTML = '<li><a href="#author-' + articleAuthor + '" data-author="' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
      /* [DONE] add generated code to html variable */
        html = html + linkHTML
    /* [DONE] insert HTML of all the links into the authors wrapper */
    articleAuthorsWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
    articleAuthorsWrapper.innerHTML = linkHTML;
    /* [DONE] Create block to count authors in articles */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }else {
      allAuthors[articleAuthor]++;
    }
    }
    const authorsList = document.querySelector(optAuthorsListSelector);
    // let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};
    for(let articleAuthor in allAuthors){
    allAuthorsData.authors.push({
    articleAuthor: articleAuthor,
    count: allAuthors[articleAuthor],
    });
    authorsList.innerHTML = templates.authorsLinkSidebar(allAuthorsData);
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


