$( document ).ready(function() {
    // Handler for .ready() called.
    for(var i=0;document.getElementsByClassName("collegeCode").length;i++)
    document.getElementsByClassName("collegeCode")[i].textContent=(CollegeConfig.getFullCollegeCode());
    init();
  });
var ADMINPROFILE;
var PROFILES=[];
function init(){

    ADMINPROFILE=JSON.parse(localStorage.getItem("AdminProfile"));
  
    if(ADMINPROFILE==undefined){
           let database= firebase.database();
        firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
            if (user) {
             // User is signed in. 
             database.ref("Profiles/"+user.uid+"/")
            .on("value",(ds)=>{
                console.log(ds.val())
                ADMINPROFILE={"profile":ds};
               localStorage.setItem("AdminProfile",JSON.stringify(ADMINPROFILE));
                //$("#admin-sid").text(ADMINPROFILE.profile.UUID!=undefined?ADMINPROFILE.profile.UUID:"");
                $("#admin-image").attr("src",ADMINPROFILE.profile.profileUrl!=undefined?ADMINPROFILE.profile.profileUrl:"")
                $("#admin-sname").text((ADMINPROFILE.profile.firstname!=undefined?ADMINPROFILE.profile.firstname:"")+" "+(ADMINPROFILE.profile.lastname!=undefined?ADMINPROFILE.profile.lastname:""));
        
                setupProfile();
                goOnline(ADMINPROFILE.profile,ADMINPROFILE.UUID);});
            }})
    }
    else{
            setupProfile();
            //goOnline(ADMINPROFILE.profile,ADMINPROFILE.id)
        }
}
function setupProfile(){
   
   // $("#admin-sid").text(ADMINPROFILE.profile.UUID!=undefined?ADMINPROFILE.profile.UUID:"");
                $("#admin-image").attr("src",ADMINPROFILE.profile.profileUrl!=undefined?ADMINPROFILE.profile.profileUrl:"")
                $("#admin-sname").text((ADMINPROFILE.profile.firstname!=undefined?ADMINPROFILE.profile.firstname:"")+" "+(ADMINPROFILE.profile.lastname!=undefined?ADMINPROFILE.profile.lastname:""));
        
    let database = firebase.database();
    firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
    if (user) {
     // User is signed in. 
     database.ref("Profiles/")
    .on("value",(ds)=>{
        console.log(ds.val())
        var profile=ds;
        profile.forEach((p)=>{
            console.log(p.val())
           PROFILES.push(p.val());
        })
      
    })
    } else {
    // No user is signed in.
    }
    });
   
   
}
function updateCourseInstances(course){
    
}
function offline(profile){
    const db = firebase.firestore();
    let database=firebase.database();
    db.collection("Online").doc(profile.id).delete().then(function() {
        database.ref("Profile/"+profile.id).on("child_added",(p)=>{
            console.log(p.key);
            database.ref("Profile/"+profile.id+"/"+p.key).update({
                "online": false
              }).then((resonse)=>{
                console.log(profile.id,": Now Off line!");
           })
              
         })
       

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function goOnline(profile,id){
    console.log(profile)
    if(profile.online){
        console.log("going online...")
      
                  const db = firebase.firestore();
                  db.collection("online").doc(id).set(
                    {"UUID":profile.UUID,"time":new _Date()}
                ).then(function (response) {
                    STATUS=false;
                  toggleOffline();
                    console.log("You are online!!")
              }) .catch(function (error) {
               
            });

      
    }
    else{
        STATUS=true;
                  toggleOffline();
    }
}
var STATUS=true;
function toggleOffline(){
    console.log("toggling....")
    ADMINPROFILE=JSON.parse(localStorage.getItem("AdminProfile"));
    if(!STATUS){
        $(".goOffline").html('<i class="fas fa-check-circle"style="color:lime"></i> You\'re Online ')
        STATUS=true;
       setOnline(ADMINPROFILE); 
    }
    else{
        $(".goOffline").html('<i class="fas fa-power-off"style="color:red"></i> You\'re Offline ')
        STATUS=false;
        offline(ADMINPROFILE);
    }
}
$(".goOffline").on("click",()=>{
    toggleOffline();
})
var LocationData={
        "uid":"",
        "location":{
            "long":0,
            "lat":0,
    
        }
    }
function setOnline(profile){
    let database=firebase.database();
    const db = firebase.firestore();
    database.ref("Profile/"+profile.id).on("child_added",(p)=>{
            console.log(p.key);
            database.ref("Profile/"+profile.id+"/"+p.key).update({
                            "online": true
                          }).then((resonse)=>{
                            db.collection("Online").doc(profile.id).set(
                                {"uid":profile.id}
                            ).then(function (response) {
                          }) .catch(function (error) {
                    
                        });
                         
                     
                        })
                       
                   
                 
                });
    

}
function getCourseRef(courseID){
    let database = firebase.database();
    database.ref("Course/")
    .on("child_added",(ds)=>{
        //ds=Course
        if(ds.val().code==courseID){
            updateCourse(ds.val())
        }
    })
}