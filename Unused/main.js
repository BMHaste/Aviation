const myHeaders = new Headers();
myHeaders.append("Accept-Language", "en-US,en;q=0.9");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Cookie", "_ga=GA1.1.843708714.1718742343; cfzs_google-analytics_v4=%7B%22STXt_pageviewCounter%22%3A%7B%22v%22%3A%221%22%7D%7D; _ga_0Y8G8VE83L=GS1.1.1719433381.4.0.1719433381.0.0.0; cfz_google-analytics_v4=%7B%22STXt_engagementDuration%22%3A%7B%22v%22%3A%228434%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_engagementStart%22%3A%7B%22v%22%3A%221719433390059%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_counter%22%3A%7B%22v%22%3A%229%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_session_counter%22%3A%7B%22v%22%3A%224%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4%22%3A%7B%22v%22%3A%22fad29e90-c628-44a4-8ad0-f8096d375654%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_let%22%3A%7B%22v%22%3A%221719433381625%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4sid%22%3A%7B%22v%22%3A%222088621347%22%2C%22e%22%3A1719435181625%7D%7D");
myHeaders.append("Origin", "https://data.ntsb.gov");
myHeaders.append("Referer", "https://data.ntsb.gov/carol-main-public/query-builder?month=6&year=2024");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
myHeaders.append("accept", "application/json");
myHeaders.append("content-type", "application/json");
myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"Windows\"");

const raw = JSON.stringify({
  "ResultSetSize": 50,
  "ResultSetOffset": 0,
  "QueryGroups": [
    {
      "QueryRules": [
        {
          "RuleType": "Simple",
          "Values": [
            "2024-06-01"
          ],
          "Columns": [
            "Event.EventDate"
          ],
          "Operator": "is on or after",
          "overrideColumn": "",
          "selectedOption": {
            "FieldName": "EventDate",
            "DisplayText": "Event date",
            "Columns": [
              "Event.EventDate"
            ],
            "Selectable": true,
            "InputType": "Date",
            "RuleType": 0,
            "Options": null,
            "TargetCollection": "cases",
            "UnderDevelopment": true
          }
        },
        {
          "RuleType": "Simple",
          "Values": [
            "2024-06-30"
          ],
          "Columns": [
            "Event.EventDate"
          ],
          "Operator": "is on or before",
          "selectedOption": {
            "FieldName": "EventDate",
            "DisplayText": "Event date",
            "Columns": [
              "Event.EventDate"
            ],
            "Selectable": true,
            "InputType": "Date",
            "RuleType": 0,
            "Options": null,
            "TargetCollection": "cases",
            "UnderDevelopment": true
          },
          "overrideColumn": ""
        },
        {
          "RuleType": "Simple",
          "Values": [
            "Aviation"
          ],
          "Columns": [
            "Event.Mode"
          ],
          "Operator": "is",
          "selectedOption": {
            "FieldName": "Mode",
            "DisplayText": "Investigation mode",
            "Columns": [
              "Event.Mode"
            ],
            "Selectable": true,
            "InputType": "Dropdown",
            "RuleType": 0,
            "Options": null,
            "TargetCollection": "cases",
            "UnderDevelopment": true
          },
          "overrideColumn": ""
        }
      ],
      "AndOr": "and",
      "inLastSearch": false,
      "editedSinceLastSearch": false
    }
  ],
  "AndOr": "and",
  "SortColumn": null,
  "SortDescending": true,
  "TargetCollection": "cases",
  "SessionId": 845860
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://data.ntsb.gov/carol-main-public/api/Query/Main", requestOptions)
  .then((response) => response.json())
  .then((data) => { 
    const count = 0;

    let all_planes = [];
    let ids = [];
    let dates = [];
    let cities = [];
    let statesArray = [];
    let injuries = [];
    console.log(data)
    data.Results.forEach(result => {
        console.log("EntryId:", result.EntryId);
        // Iterating over Fields in each result
        result.Fields.forEach((field, index) => {
          // Accessing field name and value
          console.log(data.Columns[index], ":", field.Values[0]);
        });
        console.log("------------------------");
      });

      data.Results.forEach(result => {
        result.Fields.forEach(field => {
          if (field.FieldName === 'State' && field.Values.length > 0) {
            let state = field.Values[0];
            if (!statesArray.includes(state)) {
              statesArray.push(state);
            }
          }
        });
      });
      console.log(statesArray); // Output all unique states
      
      function displayStates() {
        // Get the <ul> element by its id
        let ul = document.getElementById('stateList');
      
        // Iterate over the array and create <li> elements for each state
        statesArray.forEach(state => {
          let li = document.createElement('li');
          li.textContent = state;
          ul.appendChild(li);
        });
      }
      
      // Call the displayStates function when the DOM is fully loaded
      document.addEventListener('DOMContentLoaded', displayStates);


    //for (const result2 of result){
    //     for (const field of result){
    //         console.log(field)
    //         if (field["FieldName"] == "NtsbNo"){
    //             ids.append(field["Values"][0])
    //             count = count + 1
    //         }   
    //         if (field["FieldName"] == "EventDate"){
    //             dates.append(field["Values"][0])
    //         }
    //         if (field["FieldName"] == "City"){
    //             cities.append(field["Values"][0])
    //         }
    //         if (field["FieldName"] == "State"){
    //             if(field["Values"].length > 0){
    //                 states.append(field["Values"][0])
    //             }else{
    //                 states.append("None")
    //             }
    //         }
    //         if (field["FieldName"] == "HighestInjuryLevel"){
    //             if(len(field["Values"]) > 0){
    //                 injuries.append(field["Values"][0])
    //             }
    //             else{
    //                 injuries.append("Unknown")
    //             }
    //         }
    //     }
    // //}
    // i = 0
    // while (count > 0){
    //     plane = {
    //         "id" : ids[i],
    //         "date" : dates[i],
    //         "city" : cities[i],
    //         "state" : states[i],
    //         "injury" : injuries[i]
    //     }
    //     all_planes.append(plane)
    //     count = count - 1
    //     i = i + 1
    // }
    // //print(all_planes)

    

    // //console.log(states)


    // morning = 0
    // afternoon = 0
    // night = 0
    // times = []
    // for (date in dates){
    //     times.append(date.substring(11,16))
    // }
    // for (t in times){
    //     timeI = int(t.substring(0,2))
    //     if (timeI < 13){
    //         morning = morning + 1
    //     }else if (13 < timeI < 18){
    //         afternoon = afternoon + 1
    //     }else{
    //         night = night + 1    
    //     }

    //     // messageElement.textContent = message;
    //     // countElement.textContent = count;
    // }
    //console.log(result)
})
  .catch((error) => console.error(error));

    
// const message = 'Hello, World!';
// const count = 42;
  
//function updateContent() {
    // const messageElement = document.getElementById('message');
    // const countElement = document.getElementById('count');
    
    
//}
//document.addEventListener('DOMContentLoaded', updateContent);  
