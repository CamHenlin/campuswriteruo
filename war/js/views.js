// views
WindowView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var windowTemplate = _.template( $("#windowTemplate").html().replace(/{windowName}/g, this.options.windowName), {} );
        this.$el.append(windowTemplate);
    }
});

NoteView = Backbone.View.extend({
    initialize: function() {
        this.render();
        toggleTextArea('noteText');
    },
    render: function() {
        var noteTemplate = _.template( 
            $("#noteWindowTemplate").html(), {} 
            );
        this.$el.append(noteTemplate);
    }
});
            
EssayView = Backbone.View.extend({
    initialize: function() {
        this.render();
        toggleTextArea("essayText");
    },
    render: function() {
        var essayTemplate = _.template( 
            $("#essayWindowTemplate").html(), {} 
            );
        this.$el.append(essayTemplate);
    }
});
