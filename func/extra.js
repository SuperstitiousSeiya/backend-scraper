 const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
 function extractId(buttonHtml) {
    const regex = /id="info_(\d+)"/;
    const match = buttonHtml.match(regex);
    return match ? match[1] : null;
}


 module.exports= {
    wait,extractId
 }
