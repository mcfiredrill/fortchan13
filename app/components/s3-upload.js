import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: 'http://localhost:3000/sign',
  attributeBindings: ['image_url'],
  file: null,

  filesDidChange: (function() {
    var uploadUrl = this.get('url');
    var files = this.get('files');
    var that = this;

    var uploader = EmberUploader.S3Uploader.create({
      url: uploadUrl
    });

    uploader.on('didUpload', function(response) {
      // S3 will return XML with url
      var uploadedUrl = Ember.$(response).find('Location')[0].textContent;
      uploadedUrl = decodeURIComponent(uploadedUrl); // => http://yourbucket.s3.amazonaws.com/file.png
      console.log("UPLOADED ! : " + uploadedUrl);
      Ember.run(function() {
          that.set('image_url', uploadedUrl);
      });
    });

    uploader.on('progress', function(e) {
      console.log(e.percent);
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]); // Uploader will send a sign request then upload to S3
    }
  }).observes('files')
});
