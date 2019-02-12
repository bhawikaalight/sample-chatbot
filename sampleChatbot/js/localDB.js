var localDB=[
  {
    intent: "Base_greetings",
    type: "plaintext",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    responses: [
      {
        content: "This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. "
      },
      {
        content: "This is sample response 2 for intent-1 This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. "
      },
      {
        content: "This is sample response 3 for intent-. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response <b>1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample respo</b>nse 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1. This is sample response 1 for intent-1.  "
      }
    ]
  },
  {
    intent: "Base_cake",
    type: "card",
    suggestions:["Suggestionssssss","Suggestionsss1","Suggestionssss3"],
    subType: "plainLink",
    url: "http://google.com",
    responses: [
      {
        content: "This is sample response 1 for intent-2"        
      },
      {
        content: "This is sample response 2 for intent-2"
      },
      {
        content: "This is sample response 3 for intent-2"
      }
    ]
  },
  {
    intent: "Base_vehicle",
    type: "card",
    subType: "imgCard",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    responses: [
      {
        content: "This is sample response 1 for intent-3This is sample response 1 for intent-3 This is sample response 1 for intent-3 This is sample response 1 for intent-3 This is sample response 1 for intent-3 This is sample response 1 for intent-3",
        imgURL: "https://pbs.twimg.com/profile_images/872029988492419072/n-LJ4YTu_400x400.jpg"
      },
      {
        content: "This is sample response 2 for intent-3 This is sample response 2 for intent-3 This is sample response 2 for intent-3",
        imgURL: "https://seedroid.com/img/post/icons/128/com.alightsolutions.gd.events.jpg"
      },
      {
        content: "This is sample response 3 for intent-3 This is sample response 3 for intent-3 This is sample response",
        imgURL: "https://cdn.slidesharecdn.com/profile-photo-Workday-48x48.jpg?cb=1526331096"
      }
    ]
  },
  {
    intent: "Base_trip",
    type: "card",
    subType: "linkList",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    responses: [      
       {
        content: "This is sample response 1 for intent-2",
          URL:"https://conceptdraw.com/a456c4/p13/preview/640/pict--hyperlink-ivr-internet---vector-stencils-library.png--diagram-flowchart-example.png"
      },
      {
        content: "This is sample response 2 for intent-2",
          URL: "http://www.conceptdraw.com/examples/gis-clipart-png-files"
      },
      {
        content: "This is sample response 3 for intent-2",
           URL: "http://www.conceptdraw.com/examples/gis-clipart-png-files"
      }
    ]
  },
  {
    intent: "Base_drinks",
    type: "card",
    subType: "heroCard",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    responses: [
      {
        content: "This is sample response 1 for intent-5",
        "actions": [
          {
            "actionText": "Action 1",
            "URL":"https://alight.com/"
          },
          {
            "actionText": "Action 2",
            "URL":"https://careers.alight.com/?_ga=2.56788394.1423053975.1528205155-711407265.1528205155"
          }
        ]
      },
      {
        content: "This is sample response 2 for intent-5",
        "actions": [
          {
            "actionText": "Sample Action 1",
              "URL":"https://careers.alight.com/?_ga=2.56788394.1423053975.1528205155-711407265.1528205155"
          },
          {
            "actionText": "Sample Action 2",
             "URL":"https://alight.com/"
          }
        ]
      },
      {
        content: "This is sample response 3 for intent-5",
        "actions": [
          {
            "actionText": "Action Sample 1",
            "URL":""
          },
          {
            "actionText": "Action Sample 2",
            "URL":""
          }
        ]
      }
    ]
  },
  {
    intent: "Base_pizza",
    type: "form",
    subType: "freeText",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    followupMessages:[
      "Thanks for the feedback, is there anything  else I may help you with?",
      "Thanks! What's next?"
    ],
    responses: [
      {
        content: "We'd love to hear from you!"
      },
      {
        content: "Have a suugestion to make. Type away!"
      },
      {
        content: "Is there something wrong? Something great? Tell us!"
      }
    ]
   },
  {
    intent: "Base_flower",
    type: "form",
    subType: "singleSelect",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    followupMessages:[
      "Thanks for the feedback, is there anything  else I may help you with?",
      "Thanks! What's next?"
    ],
    inputOptions:[
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    responses: [
      {content: "Pick one!"},
      {content: "Choose one of the following"},
      {content: "What's your pick?"}
    ]
  },
  {
    intent: "Base_appointment",
    type: "form",
    subType: "multiSelect",
    suggestions:["Suggestion phrase 1","Suggestion phrase 2","Suggestion phrase 3"],
    followupMessages:[
      "Thanks for the feedback, is there anything  else I may help you with?",
      "Thanks! What's next?"
    ],
    inputOptions:[
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    responses: [
      {content: "Pick one or more!"},
      {content: "Choose one to all of the following"}
    ]
  }
];
//HELPER FUNCTIONS===============================
randomFromArray = function(arg){
            if(typeof arg ==="object" && arg.length!=undefined){
                var random = Math.floor(Math.random() * (arg.length));
                return arg[random];
            }else 
                        return false;
};
randomFromObjectKey = function(arr,key){
    var resp=arr.map(function(obj,index){
                        return obj[key];
            });
            return randomFromArray(resp)
};
shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
randomFromObjectKey([
      {
        content: "This is sample response 1 for intent-1"
      },
      {
        content: "This is sample response 2 for intent-1"
      },
      {
        content: "This is sample response 3 for intent-1"
      }
    ],"content");
shuffle(localDB[0].suggestions)
