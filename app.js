function onSignIn(googleUser){
    
    var profile = googleUser.getBasicProfile();

    console.log('ID: ' + profile.getId());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('userName' +profile.getName());

    const params = {
        userId: profile.getId(),
        email: profile.getEmail(),
        userName: profile.getName()
       }
       const bodyformData = JSON.stringify(params);

       
          axios.post('http://localhost:3000/user/aouth/google', bodyformData,{
            headers: {'Content-type': 'application/json'}
        })
      .then((response) => {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
    
    $(".g-signin2").css("display","none");
    $(".data").css("display","block");
    $("#pic").attr('src', profile.getImageUrl());
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#userId").text(profile.getId());

}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        confirm("do you want to logged out");
        console.log('User signed out.');
        alert("You Have been successfully sign out");
        $(".g-signin2").css("display","block");
        $(".data").css("display", "none");
    });
}