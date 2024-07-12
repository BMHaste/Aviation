var settings = {
    "url": "https://data.ntsb.gov/carol-main-public/api/Query/Main",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "keep-alive",
      "Cookie": "_ga=GA1.1.843708714.1718742343; cfzs_google-analytics_v4=%7B%22STXt_pageviewCounter%22%3A%7B%22v%22%3A%221%22%7D%7D; _ga_0Y8G8VE83L=GS1.1.1719433381.4.0.1719433381.0.0.0; cfz_google-analytics_v4=%7B%22STXt_engagementDuration%22%3A%7B%22v%22%3A%228434%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_engagementStart%22%3A%7B%22v%22%3A%221719433390059%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_counter%22%3A%7B%22v%22%3A%229%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_session_counter%22%3A%7B%22v%22%3A%224%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4%22%3A%7B%22v%22%3A%22fad29e90-c628-44a4-8ad0-f8096d375654%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_let%22%3A%7B%22v%22%3A%221719433381625%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4sid%22%3A%7B%22v%22%3A%222088621347%22%2C%22e%22%3A1719435181625%7D%7D",
      "Origin": "https://data.ntsb.gov",
      "Referer": "https://data.ntsb.gov/carol-main-public/query-builder?month=6&year=2024",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "accept": "application/json",
      "content-type": "application/json",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\""
    },
    "data": JSON.stringify({
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
    }),
  };
  
  $.ajax(settings).done(function (response) {
    let statesArray = [];
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
      console.log(statesArray);
    //   function displayStates() {
    //     // Get the <ul> element by its id
    //     let ul = document.getElementById('stateList');
      
    //     // Iterate over the array and create <li> elements for each state
    //     statesArray.forEach(state => {
    //       let li = document.createElement('li');
    //       li.textContent = state;
    //       ul.appendChild(li);
    //     });
    //   }
      
    //   // Call the displayStates function when the DOM is fully loaded
    //   document.addEventListener('DOMContentLoaded', displayStates);
  });