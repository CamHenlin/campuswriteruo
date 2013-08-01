

var date = new Date();


        
AnswerModel = Backbone.Model.extend({
        initialize: function(){
            //console.log("answer initialized")
            },
            
        data: {
            text: "",
            subs: ""
            },
        
        addSub: function(subToAdd){
                    this.subs.add(subToAdd)
                    }
        });

SubModel = Backbone.Model.extend({
        initialize: function(){
            //console.log("sub initialized");
            },
        
        data: {
            text: "",
            
            }
        
        });
 
AnswerCollection = Backbone.Collection.extend({
        model: AnswerModel
        });

SubCollection = Backbone.Collection.extend({
        model: SubModel
        });

var MenuView = Backbone.View.extend({
    initialize: function(){
        //console.log("menuView initialized");
        this.template = $('#menuTemplate').children();
        this.render();
        
        },
        
    el: "#menu",
    
    render: function(){

    
        for (var i=0; i<this.collection.length; i++){
            var t = this.template.clone();
            
            t.find(".firstLevel").text(this.collection.at(i).attributes.text);
            
            for(var x=0; x<this.collection.at(i).attributes.subs.length; x++){
                //console.log(this.collection.at(i).attributes.subs.at(x).attributes.text)
                t.find(".sub"+x.toString()).attr("name", "a"+i.toString()+"s"+x.toString()).attr("id", "a"+i.toString()+"s"+x.toString())
                t.find(".sub"+x.toString()).text(this.collection.at(i).attributes.subs.at(x).attributes.text);
            }
            var app = this.$el.find("#jsddm");
            $(app).append(t);
            
            
        }
        
    },
        
    
});        

     
$(document).ready( function() {
        var a1SubCollection = new SubCollection();
        var a2SubCollection = new SubCollection();
        var a3SubCollection = new SubCollection();
        var a4SubCollection = new SubCollection();
        
        a1SubCollection.add(new SubModel({text:"Thinking of big ideas to write about"}));
        a1SubCollection.add(new SubModel({text:"Thinking about specific ideas to write about"}));
        a1SubCollection.add(new SubModel({text:"Listing ideas"}));
        a1SubCollection.add(new SubModel({text:"Making an outline"}));
        a1SubCollection.add(new SubModel({text:"Organizing my ideas (Putting ideas in order)"}));
        
        a2SubCollection.add(new SubModel({text:"Writing sentences (Turning my ideas into sentences)"}));
        a2SubCollection.add(new SubModel({text:"Thinking of the next word"}));
        a2SubCollection.add(new SubModel({text:"Trying to spell a word"}));
        a2SubCollection.add(new SubModel({text:"Thinking about my grammar"}));
        a2SubCollection.add(new SubModel({text:"Putting punctuation (period, comma, etc.)"}));
        
        a3SubCollection.add(new SubModel({text:"Reading over what I wrote"}));
        a3SubCollection.add(new SubModel({text:"Looking for mistakes"}));
        a3SubCollection.add(new SubModel({text:"Thinking of what to change about my writing"}));
        a3SubCollection.add(new SubModel({text:"Revising to improve my writing"}));
        a3SubCollection.add(new SubModel({text:"Comparing my writing to my plan"}));
        
        a4SubCollection.add(new SubModel({text:"Just sitting here"}));
        a4SubCollection.add(new SubModel({text:"Looking around the room"}));
        a4SubCollection.add(new SubModel({text:"Checking the time"}));
        a4SubCollection.add(new SubModel({text:"Stretching"}));
        a4SubCollection.add(new SubModel({text:"Other"}));
        
        var answerCollection = new AnswerCollection();
        answerCollection.add(new AnswerModel({text:"Planning",subs:a1SubCollection}));
        answerCollection.add(new AnswerModel({text:"Writing(Translating)",subs:a2SubCollection}));
        answerCollection.add(new AnswerModel({text:"Reviewing",subs:a3SubCollection}));
        answerCollection.add(new AnswerModel({text:"Other",subs:a4SubCollection}));

        var menuView = new MenuView({collection: answerCollection});
        //var menuTemplate = _.template($('#menuTemplate').html(), {"answerContainer": answerCollection}
    });
        
    