(function(window, document, undefined) {

   Parse.initialize("PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0", "y5TnJxnaphDQ51Ezzq5mXd8nCqRQ3MQdTUxIMLRm");   
    

  var $usernameContainer = $("#user");
  var $title = $("#title");
  var $text = $("#text");
  var $email = $("#email");
  // $email = "tylerweitzman@gmail.com";

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
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
          alert("File available at: " + url);

          var Note = Parse.Object.extend("Note");

          var User = Parse.Object.extend("User");
          var query = new Parse.Query(User);
          query.equalTo("email", $email);
          console.log($email);

          query.find({
            success: function(foundUser) {
              foundUser = foundUser[0];
              console.log(foundUser.id);
              var note = new Note();
              note.set("title", title);
              note.set("content", text);
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


          var itduzzit = "https://www.itduzzit.com/zherbst/api/addFile.json?token=6amr9lph4b5za8j&url=" + url
          console.log(itduzzit)

          var xmlhttp = new XMLHttpRequest();
          var response = xmlhttp.open("POST", itduzzit)
          xmlhttp.send(JSON.stringify(response));
          console.log(response)
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    });



})(this, this.document);



