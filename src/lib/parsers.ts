import axios, { isCancel, AxiosError } from 'axios';

async function getHtml(url:string = "https://archiveofourown.org/works/54036748"){
    //do fetch to return html
    const html = await axios.get(url, )
        .then(function (response) {
            console.log(response);
            console.log(typeof response);

        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    return;
}
function getPageType(page?:string){
    if(!page){
        page = document.location.pathname
    }
    const parts = page.split("/") 
    parts.shift();
    if(parts[0] === "works" && typeof parseInt(parts[1]) == "number"){
        return "article"
    }
    else if(parts[0] === "users" && parts[2] === "bookmarks" ){
        return "bookmarks"
    }
    else if(parts[0] === "users" || parts[0] === "tags" ||  parts[0] === "" || parts[1] === "search" ){
        return "archive"
    }
    return false;
}
// function getTitle(el,pageType:string){
//     if(pageType == "article"){
//         return el.querySelector("#workskin .title.heading").innerText
//     }
//     else{
//         return el.querySelector(".header.module .heading a").innerText
//     }
// }
// function getSummary(el, pageType){
//     if(pageType == "article"){
//         return el.querySelector("#workskin .summary.module blockquote") ? el.querySelector("#workskin .summary.module blockquote").innerText : ""
//     }
//     else{
//         return el.querySelector("blockquote.summary")? el.querySelector("blockquote.summary").innerText  :""
//     }
        
// }

// function getChapters(raw_html){
//     // Chapter information is a string X/Y where X is the number of chapters completed, and Y is total. Y may be a ? if author doesn't know  how long the work will be.
//     var stats = $(raw_html).find('dl[class=stats]').children();
//     var raw_string = '';
//     for (var i = 0; i< stats.length; i+=2){
//         // going by 2's through stats
//         if ($(stats[i]).html() == 'Chapters:') {
//             // Only overwrite if null
//             raw_string = $(stats[i+1]).html();
//         }
//     }
//     var raw_chapters = raw_string.split('/');
//     var out = {
//         'published': raw_chapters[0],
//         'total': raw_chapters[1],
//         'complete': false,
//     };
//     if (out['published'] == out['total']) {
//         out['complete'] = true;
//     }
//     return out;
// };
// function getAuthor(el, pageType){
//     const authorList = [];
//     let authors;
//     if(pageType == "article"){
//         authors = el.querySelectorAll('#workskin a[rel="author"]')
//     }
//     else{
//         authors = el.querySelectorAll('a[rel="author"]')
//     }
//     if(authors.length == 0){
//         authorList.push('Anonymous')
//     }
//     else{
//         authors.forEach(function(a){
//             authorList.push(a.innerText);
//         });
//     }
//     return authorList;
// };
// function getFandom(raw_html){
//     var fandoms = $(raw_html).find('.fandoms.heading, .fandom.tags').find('a[class="tag"]');
//     var fandomList:string[] = [];
//     fandoms.each(function(){
//         fandomList.push($(this).text());
//     });
//     return fandomList;
// };
// function getRelationship(el, pageType){
//     let relationships = $(el).find('.tags .relationships, dd.relationship.tags').find('a[class="tag"]');
//     let relationshipList:string[] = [];
//     relationships.each(function(){
//         let text = $(this).text()
//         if(text.includes("/")){
//             relationshipList.push(text)
//         }
//     });
//     return relationshipList;
//     //return $(relationships).eq(0).text()
// }
// function getCategory(raw_html){
//     var category = $(raw_html).find('.required-tags .category-slash.category, dd.category.tags').find('>*:first-child');

//     return $(category).text()
// }

// function getPostDate(el, pageType){
//     let dateString = new Date().toLocaleString();
//     if(pageType == "article"){
//         dateString = el.querySelector("dd.published").innerText
//     }
//     else{
//         dateString  = el.querySelector(".header.module .datetime").innerText;
//     }
//     let p = new Date(dateString)
//     return p.toISOString()
// };
// function getWordCount(el){
//     try {
//         let words = el.querySelector('dd.words').innerText
//         words = words.replaceAll(",","")
//         return parseInt(words);
//     } catch(err) { // sometimes the word count is missing from the page
//         return 0;
//     }
// };

//  function getChapterID(){
//     var chapter_section = $('div[class=chapter]');
//     if (chapter_section.attr('id')){
//         var chapter_url = chapter_section.find('a').attr('href');
//         return chapter_url.split('chapters/')[1];
//     }
//     return null;   
// };

// export function parseTagsPage(raw_html){
//         /* Parse out tags from either the "browse tags" or "bookmarks" page
//             Tags are text nodes within a class "warnings"
//         */  var tags = [];
//         var tagLocations = $(raw_html).find('a[class="tag"]');
//         for (var i = 0; i < tagLocations.length; i++){
//             if (tagLocations.hasOwnProperty(i)) {
//                 tags.push(tagLocations[i].innerHTML);
//             }
//         }
//         return tags;

// }

// export function parseWorkBlurb(raw_html){
//     var out = {};
//     var header_div = $($($(raw_html).find('div[class="header module"]')[0]).find('a')[0]);

//     out['url'] = header_div.attr('href');
//     out['ao3id'] = out['url'].slice(7);

//     out['title'] = $($(raw_html).find('[class=heading]')).find('a[href^="/works/"]').text();

//     out['author'] = ao3rdrLib.parse.author(raw_html).join(', ');
//     if (out['author'].length == 0){
//         out['author'] = 'Anonymous';
//     }
//     out['fandom'] = ao3rdrLib.parse.fandom(raw_html).join(', ');
//     out['category'] = ao3rdrLib.parse.category(raw_html)
//     out['relationships'] = ao3rdrLib.parse.relationship(raw_html)

//     var raw = $(raw_html).find('p[class=datetime]').html();
//     out['updated'] = ao3rdrLib.parse.postDate(raw);

//     out['chapters'] = ao3rdrLib.parse.chapters(raw_html);
//     // Assume we've not read anything if adding from
//     // browse tags page.
//     out['chapters_read'] = 0;

//     out['word_count'] = ao3rdrLib.parse.wordCount(raw_html);
//     out['summary'] = $($(raw_html).find('blockquote.userstuff.summary')).text().trim();

//     return out;
// };

// export function parseArticlePage(raw_html){
//     /* Extract Information from an article page
//     */
//     var out = {};
//     // Title, Author are in preface group

//     out['author'] = ao3rdrLib.parse.author(raw_html).join(', ');
//     if (out['author'].length == 0){
//         out['author'] = 'Anonymous';
//     }
//     out['fandom'] = ao3rdrLib.parse.fandom(raw_html).join(', ');
//     out['category'] = ao3rdrLib.parse.category(raw_html)
//     out['relationship'] = ao3rdrLib.parse.relationship(raw_html)

//     var raw = $(raw_html).find("h2[class='title heading']").html();
//     // AO3 has weird whitespace around the title on this page, strip it!
//     out['title'] = $.trim(raw);

//     // id - HACK - extracting it from the hidden kudos field
//     out['ao3id'] = $(raw_html).find('#kudo_commentable_id').val();

//     // Look for Updated, then fall back on Published
//     // Note that Updated can be assumed to be listed after published
//     var stats = $('div').find('dl[class=stats]').children();
//     var raw_date = null;
//     for (var i = 0; i< stats.length; i+=2){
//         // going by 2's through stats
//         if (($(stats[i]).html() == 'Published:') || ($(stats[i]).html() == 'Updated:')) {
//             // Only overwrite if null
//             raw_date =  $(stats[i+1]).html() || raw_date;
//         }
//     }
//     out['updated'] = ao3rdrLib.parse.postDate(raw_date);

//     out['chapters'] = ao3rdrLib.parse.chapters(raw_html);
//     // Assume we've read up to this page if we are adding the bookmark from it.
//     // chapter data is stored in this div's id as "chapter-X"

//     var chapter_section = raw_html.find('div[class=chapter]');

//     // Only do this if the chapters section is defined
//     if (chapter_section.attr('id')){
//         out['chapters_read'] = chapter_section.attr('id').split('chapter-')[1];
//         // We also want the chapter id
//         var chapter_url = chapter_section.find('a').attr('href');
//         out['chapter_id'] = chapter_url.split('chapters/')[1];
//     } else {
//         // On a one chapter work, assume we have read the page we're on
//         out['chapters_read'] = 1;
//     }

//     out['word_count'] = ao3rdrLib.parse.wordCount(raw_html);
//     out['summary'] = $($($(raw_html).find('div.summary')).find('.userstuff')).text().trim();


//     return out;
// };
