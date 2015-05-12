import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addPost: function() {
      var newPost = this.store.createRecord('post', {
        name: this.get('name'),
        body: this.get('body'),
        image_url: this.get('image_url')
      });
      newPost.save();
      this.setProperties({
        name: '',
        body: '',
        image_url: ''
      });
    }
  }
});
