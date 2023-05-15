// we will use API data from this source => 'https://reqres.in/api/users?page=2'
// Setup is like this. 
// Function returns a promise and takes an argument (which is utilized by the promise inside.)

function myPromise (url) {
    let x = new Promise ( (resolve, reject) => {
        let req = new XMLHttpRequest(); 
        req.open('GET', url);
        req.onload = function () {
            if (req.status==200) {
                resolve(req.response); 
            } else {
                reject('An error occurred in making the request!'); 
            }
        }
        req.send(); 
    }); 
    return x; 
};

const url = 'https://reqres.in/api/users?page=2'; 

// Now we work with the consumer of the promise.
let p = myPromise(url); 
// A promise can be consumed by calling THEN and providing 2 arguments to it. One for successful resolution. Second for rejection. 
// However, typically THEN is only used for successful execution. In this example we look at where both arguments are provided. 
p
.then ((res) => console.log(res), (rej) => console.log(rej))


// Now we will chain the promise to do some more operations for us. Important to note that THEN also returns a promise. 
const p2 = myPromise(url); 
p2
.then ( (res) => {
    let d = JSON.parse(res).data[5];
    return d;
})
.then ( (data) => {
    let avatar = data.avatar;
    return avatar; 
})
.then( (img) => {
    const div = document.getElementById('holder'); 
    div.innerHTML = `<img src=${img} />`;       // Quick XSS tip => add onload=alert(document.domain) inside IMG tag. Shows the dangers of Inner HTML!
})
.catch( (err) => {
    console.log("Error!"); 
});

// ********************** Example 2 ******************************************

// Working with more Promises based on API => https://dog.ceo/api/breeds/image/random; https://dog.ceo/api/breeds/image/random/3
// Here we define the promise directly and don't wrap it inside a function that returns a PROMISE. 

const dogURL = 'https://dog.ceo/api/breeds/image/random/2';     // This will fetch 2 random image URLs. 
let loading = false;

const dogPromise = new Promise( (resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', dogURL);
    req.onload = () => {
        if (req.status == 200) {
            resolve(req.response);      // Pass response from API to RESOLVED function.
        } else {    
            reject('Dog URL could not be reached');     // Pass an error message to REJECT function. 
        }
    }
    req.send();
});

dogPromise
.then ( (resp) => {
    console.log(JSON.parse(resp));      // The response from API is a JSON so you need to parse it. 
    return JSON.parse(resp);            // Return this parsed response as part of the promise returned from THEN.
})
.then ( (msgs) => {
    loading=true && console.log("...Loading Dog Images");
    return msgs.message;            // Get the array from response which contains URLs. 
})
.then ( (imgsUrls) => {
    // console.log(imgsUrls);       // Returned Promise contains an array of Dog image URLs.
    let img1 = document.createElement('img');   // Create an IMG element. 
    img1.src = imgsUrls[0];
    img1.style.margin='10px';

    let img2 = document.createElement('img'); 
    img2.src = imgsUrls[1];
    img2.style.margin = '10px'; 

    const div = document.getElementById('dog');     // Select DIV designated for holding DOG images.
    div.append(img1,img2);      // Append images to the DOG div. 
}) 
.catch( (err) => {
    console.log(err);
})
.finally( () => {               // Finally doesn't take any argument. Note this. Always.
    console.log('Done!.');      // Perform clean up activities like logging to console that images were displayed.     
    loading=false;              // Set LOADING back to FALSE.
} );
