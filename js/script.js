(function(window, document, undefined) {
  
  var $username-container = $("#user");
  var $title = $("#title");
  var $text = $("#text");

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
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
        success: function(data) {
          alert("File available at: " + data.url);
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    });

})(this, this.document);
