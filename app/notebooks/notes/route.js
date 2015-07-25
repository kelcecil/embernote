import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('note', {notebook: params.notebook_id});
  },
  actions: {
    addNote: function() {
      this.store.find('notebook',
        this.paramsFor('notebooks.notes').notebook_id).then(
          (notebook) => {
            console.log(notebook);
            var note = this.store.createRecord('note', {
              title: this.controller.get('title'),
              notebook: notebook
            });
            console.log(note);
            note.save().then(() => {
              console.log('save successful');
              this.controller.set('title', null);
              this.refresh();
            }, function() {
              console.log('save failed');
            });
          });
    },
    deleteNote: function(note) {
      console.log('delete note with title ' + note.get('title'));
      note.deleteRecord();
      note.save();
    }
  }
});
