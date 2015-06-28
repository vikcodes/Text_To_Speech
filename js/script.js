(function(window, document, undefined) {

  Parse.initialize("PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0", "y5TnJxnaphDQ51Ezzq5mXd8nCqRQ3MQdTUxIMLRm");   
   

 var usernameContainer = $("#user").val();
 var title = $("#title").val();
 var text = $("#text").val();
 var email = $("#email").val();
 email = "tylerweitzman@gmail.com";

   // Set an event listener on the Choose File field.
   $('#fileselect').bind("change", function(e) {
     var files = e.target.files || e.dataTransfer.files;
     // Our file var now holds the selected file
     file = files[0];
   });

   $('#pdf-button').click(function() {
    var usernameContainer = $("#user").val();
 var title = $("#title").val();
 var text = $("#text").val();
 var email = $("#email").val();
     if(text !== "" && usernameContainer !== "" && title !== "" && email !== "") {
     console.log(text);
       } else {
         alert("Please fill in all fields");
       }
   });

   // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
   $('#Uploadbutton').click(function() {

     var serverUrl = 'https://api.parse.com/1/files/' + file.name;

     $.ajax({
       type: "POST",
       beforeSend: function(request) {

         request.setRequestHeader("X-Parse-Application-Id", 'PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0');
         request.setRequestHeader("X-Parse-REST-API-Key", 'sy6i4A35OudquyONjSeGkkXNPOtAyUK0YEpuEgeD');
         request.setRequestHeader("Content-Type", file.type);
       },
       url: serverUrl,
       data: file,
       processData: false,
       contentType: false,
       dataType: 'json',
       success: function(data) {
         var url = data.url
         var json_data = jQuery.getJSON(url, data)
         var Note = Parse.Object.extend("Note");

         var User = Parse.Object.extend("User");
         var query = new Parse.Query(User);
         query.equalTo("email", email);
         console.log(email);
         console.log(email);

         query.find({
           success: function(foundUser) {
             foundUser = foundUser[0];
             console.log(foundUser.id);
             var note = new Note();
             note.set("title", title);
             note.set("url", url);
             note.set("user", foundUser);

             note.save(null, {
               success: function(note){
                 alert("sucess");
               },
               error: function(note){
                 alert("fail");
               }
             });
       }
   });
       },
       error: function(data) {
         var obj = jQuery.parseJSON(data);
         alert(obj.error);
       }
     });
   });


})(this, this.document);