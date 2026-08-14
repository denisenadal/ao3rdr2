const ao3baseLink = 'https://archiveofourown.org/';
const getAuthorHtml= function(data:string[]){
    let html = '';
    data.forEach(a=>{
        let label = formatTagLabel(a)
        if(a !== 'Anonymous'){
            html += `<a href="https://archiveofourown.org/users/${a}" >${label}</a>, `
        }
        else{
            html += 'Anonymous, '
        }
    })
    //trim trailing comma from last entry
    if(data.length > 0){
        html = html.substring(0,html.length - 2)

    }
    return html
};
const getTagUrl= function(tagName:string){
    tagName = tagName.replaceAll("/","*s*");
    tagName = tagName.replaceAll(".","*d*");
    return `${ao3baseLink}tags/${tagName}/works`
};
const formatTagLabel = function(label:string){
    label = label.trim();
    let old = label;
    label = label.replace("天官赐福 - 墨香铜臭 | Tiān Guān Cì Fú - Mòxiāng Tóngxiù", "Heaven's Official Blessing")
    label = label.replace("魔道祖师 - 墨香铜臭 | Módào Zǔshī - Mòxiāng Tóngxiù", "Grandmaster of Demonic Cultivation")
    label = label.replace("人渣反派自救系统 - 墨香铜臭 | The Scum Villain's Self-Saving System - Mòxiāng Tóngxiù", "Scum Villian")
    label = label.replace(/[^\x00-\x7F]/g, "")
    label = label.trim();
    while (label.charAt(0) == "|"){
        label = label.substring(2);
    }
    label = label.replace("JoJono Kimyou na Bouken | ", "")
    label = label.replaceAll(/\(.+\)/g,"")
    label = label.replaceAll(/ \| [a-z,A-Z ]+/g,"")
    label = label.replace(/ - .+/,"")
    label = label.trim();
    if(label.length < 1){
        return old
    }
    return label
};
const getTagListHtml = (fandoms: string[])=>{
    let links = "";
    fandoms.forEach(fan =>{
        let label = formatTagLabel(fan)
        links = links + `<a href="${getTagUrl(fan)}">${label}</a>, `
    })
    if(fandoms.length > 0){
        links = links.substring(0, links.length - 2);
    }
    return links;
}

export {getAuthorHtml,formatTagLabel,getTagUrl,getTagListHtml}