(function () {

    var serverURL = "http://104.131.225.87:3000", // IMPORTANT: This URL needs to be accessible from your phone for testing.
        $scroller = $('.scroller'),

        // Get List of images from server
        getFeed = function () {
            // $scroller.empty();
            // $.ajax({url: serverURL + "/images", dataType: "json", type: "GET"}).done(function (data) {
            //     var l = data.length;
            //     for (var i = 0; i < l; i++) {
            //         $scroller.append('<img src="' + serverURL + '/' + data[i].fileName + '"/>');
            //     }
            // });

        },

        // Upload image to server
        upload = function (imageURI) {
            var ft = new FileTransfer(),
                options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
                "description": "Uploaded from my phone"
            };

            ft.upload(imageURI, serverURL + "/images",
                function (e) {
                    getFeed();
                    console.log("img upluad "+window.img);
                    share();
                   
                },
                function (e) {
                    alert("Upload failed");
                }, options);
        },

        // Take a picture using the camera or select one from the library
        takePicture = function (e) {
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

            navigator.camera.getPicture(
                function (imageURI) {
                    img = imageURI;
                    console.log("img get picture "+img);
                    console.log(imageURI);
                    upload(imageURI);

                },
                function (message) {
                    // We typically get here because the use canceled the photo operation. Fail silently.
                }, options);

            return false;

        },

        share = function(){
            console.log("img share "+window.img);
             window.plugins.socialsharing.shareViaFacebook(
                  '#bogota #12:12',
                  [window.img,'www/image.gif'],
                  null);

        };

    $('.camera-btn').on('click', takePicture);

    getFeed();

}());