// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require formvalidation.min
//= require formvalidation/framework/bootstrap.min
//= require data-confirm-modal
//= require_tree .

//
var ready;
ready = function() {
  $("textarea#wysiwyg-editor").pagedownBootstrap();
  $('input[type="file"]#avatar-upload-file-selector').change(function(){
    var file = this.files[0];
    function truncate(n, len) {
      var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
      var filename = n.replace('.'+ext,'');
      if(filename.length <= len) {
          return n;
      }
      filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
      return filename + '.' + ext;
  };
  var shortName = truncate(file.name, 4)
  $("#avatar-img").html(shortName);
  });
  $("textarea#wysiwyg-editor").pagedownBootstrap();
  $('#add-collaborator')
    .formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'collaborator[email]': {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            }
        }
    })
};

$(document).ready(ready);
$(document).on('page:load', ready);



