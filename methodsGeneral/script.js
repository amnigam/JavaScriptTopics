const data = [
    {
        menu : ['a', 'tea', 'coffe'],
        text : "Text for object 1"
    }, 
    {
        menu : ['b', 'eggs', 'bread'],
        text : "Text for object 2"
    },
    {
        menu : ['Dosa', 'Idli', 'Uttapam'],
        text : "Text for object 3"
    }
]; 

let finalText = [];
function extractor (dataArr) {
    finalText = dataArr.map( (e) => {
        return e.text; 
    })

    return finalText;
}

const val = extractor(data); 
console.log(val); 


