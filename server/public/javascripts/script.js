$( document ).ready(function() {
    $('#file-upload-button').click(function(event){
        console.log('button clicked');
        event.preventDefault();

        const form = $('#uploadbanner')[0];
        const data = new FormData(form);

        $("#file-upload-button").prop("disabled", true);
        $('#upload-status').text('...');
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/upload-file",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                $("#file-upload-button").prop("disabled", false);
                $('#upload-status').text('upload success');
            },
            error: function (e) {
             $("file-upload-button").prop("disabled", false);
             $('#upload-status').text('upload failed');
            }
        });
    });
});