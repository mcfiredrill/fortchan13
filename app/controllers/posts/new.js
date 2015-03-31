import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addPost: function() {
      var newPost = this.store.createRecord('post', {
        name: this.get('name'),
        body: this.get('body')
      });
      newPost.save();
      this.setProperties({
        name: '',
        body: ''
      });
    }
  }
});
