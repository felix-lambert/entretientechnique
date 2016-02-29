
Tasks = new Mongo.Collection("zip6");

if(Meteor.isServer){
    Meteor.publish('default_db_data', function(){

      return Tasks.find();
  });

}

if (Meteor.isClient) {

  
  // This code only runs on the client
  Template.body.helpers({
      "myChartData": function() {
          Meteor.subscribe('default_db_data', function(){
            
              console.log("is loaded");
               var o = Tasks.find().fetch();
                t= [];
                s= [];
                a= [];
                e = 0;
                o.forEach(function(result){
                  if (0 == e) {
                    t.push("EstimatedPopulations")
                    s.push("TotalWages");
                    a.push(result.state);
                  } else if (result.totalWages !== undefined || result.totalPopulations !== undefined || result.state !== undefined) {
                    s.push(result.totalWages);
                    t.push(result.totalPopulations);
                    a.push(result.state);
                  }
                  e++;
                });
                console.log(t);
                console.log(s);
                console.log(a);
                c3.generate({
                    size: {
                        height: 800
                    },
                    data: {
                        columns: [s,t],
                        type: 'bar'
                    },
                    bar: {
                      width: {
                          ratio: 0.5 // this makes bar width 50% of length between ticks
                      }
                      // or
                      //width: 100 // this makes bar width 100px
                    },
                    axis: {
                      x: {
                          type: 'category',
                          categories: a
                      }
                }
              });

          });
          
          

        

      }
  });
}

