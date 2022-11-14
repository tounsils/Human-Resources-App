//$(document).on("submit",  function(event) {
 //   $(document).on("click", "#submitemail", function(event) { 

if(document.URL.indexOf("login") >= 0){ 
    // users, employees
        //console.log("login");
        //console.log(document.URL);



document.addEventListener( 'submit',  ( e ) => {
    e.preventDefault();
    //console.log('test' );
    //console.log('input[name="loginemail"]' );
    fetch( '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            email: document.querySelector( 'input[name="loginemail"]' ).value,
            password: document.querySelector( 'input[name="loginpassword"]' ).value
        } )        
    } ).then( async res => {
        var data = await res.json();
        
        if ( data.hasOwnProperty( 'url' ) ) {
            window.location = data.url;
        }
    } );
} );

}