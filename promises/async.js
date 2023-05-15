// Understanding ASYNC and AWAIT.
// Example 1  -- Using ASYNC/AWAIT for FETCH (Promise)
const dogURL = 'https://dog.ceo/api/breeds/image/random/3';     // Selecting 3 dog image URLs

// Creating an ASYNC function that takes in the URL as a parameter. 
const asyncFunc = async function(url) {
    // Putting the code that might error out inside TRY/CATCH since AWAIT only gets resolved value.
    try {
        const y = await fetch(url);     // FETCH returns a PROMISE. So, using AWAIT to hook onto THEN branch of FETCH.
        if (!y.ok) {
            throw new Error("Custom Error for Fetch Failing!")      // Throw a custom new error. 
        }
        const data = await y.json();    // converting FETCH response (a promise) from JSON needs to be AWAITED. 
        console.log(data);      // This is response converted from JSON. 

        const div = document.getElementById("dog"); 
        const imgs = data.message;  // This will contain the array containing dog image URLs. 
        
        // Loop through each URL in the array to create an IMG element to be appended inside DOG div.
        imgs.forEach( (e) => {
            let x = document.createElement('img'); 
            x.src = e;
            x.style.margin = '10px';
            x.style.maxBlockSize = '500px';     // Style to limit dog images to a max block size.
            div.append(x); 
        });        
    } catch (err) {
        console.log(err);       // If fetch fails, it will be caught here.
    };
};

asyncFunc(dogURL); 
// *************************************************************** End of Example 1 *****************************************************************
// Example 2 -- Returning a value from ASYNC/AWAIT
/* Setup here is like this. We will leverage REQRES.IN for this. 
    1. Create a user using POST (Chappandi Swami, Vice President)
    2. return this user from ASYNC/AWAIT
    3. Use this returned value to query REQ/RES database of users
*/ 

const createUrl = 'https://reqres.in/api/users'; 

const userCreate = async function (url) {
    const user = {
        name : "Chappandi Swami",
        job : "Vice President"
    }; 

    let resp = '';
    try {
        const x = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        }) 
        if (!x.ok) {
            throw new Error('Fetch Failed!');
        };
        
        resp = await x.json();
        console.log(resp);
        return resp; 
    } catch (err) {
        console.log(err); 
    };
}; 

userCreate(createUrl)           // Accessing values returned from previous ASYNC/AWAIT requires to handle it like a PROMISE. 
.then ( async (res) => {        // Consequently, you can use THEN & CATCH to hook into those flows. Note: created an ASYNC function inside THEN
    const id = res.id;          // Because it is ASYNC it allows us to AWAIT Fetch for the ID based API call. 

    // Retrieve user by ID => https://reqres.in/api/users/<id>
    const idUrl = `https://reqres.in/api/users/${id}`;  // Dynamically generating API URL for ID based fetch. 
    console.log(idUrl);         // URL logged is correct indicating ID has been passed down correctly from prev async/await after user creation.
    try {
        let a = await fetch(idUrl);     // Await fetch based on ID. 
        if (!a.ok) {
            throw new Error('Failed to retrieve details of the user id'); 
        };
        const userData = await a.json();
        console.log(userData);  
    } catch (err) {
        console.log(err); 
    }
})
.catch ( (e) => {       // Note: This CATCH flow will be invoked if ASYNC/AWAIT after user creation errored out. 
    console.log(e); 
}); 

// Note: User is getting created successfully. But I don't think REQRES.IN allows you to commit created users to database.
// Consequently, the retrieval of the User from DB based on API fails! This lets us test our CATCH block inside THEN



