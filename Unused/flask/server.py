from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/my-link/')
def my_link():
  import requests
  import json

  url = "https://data.ntsb.gov/carol-main-public/api/Query/Main"

  payload = json.dumps({
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
              "Selectable": True,
              "InputType": "Date",
              "RuleType": 0,
              "Options": None,
              "TargetCollection": "cases",
              "UnderDevelopment": True
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
              "Selectable": True,
              "InputType": "Date",
              "RuleType": 0,
              "Options": None,
              "TargetCollection": "cases",
              "UnderDevelopment": True
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
              "Selectable": True,
              "InputType": "Dropdown",
              "RuleType": 0,
              "Options": None,
              "TargetCollection": "cases",
              "UnderDevelopment": True
            },
            "overrideColumn": ""
          }
        ],
        "AndOr": "and",
        "inLastSearch": False,
        "editedSinceLastSearch": False
      }
    ],
    "AndOr": "and",
    "SortColumn": None,
    "SortDescending": True,
    "TargetCollection": "cases",
    "SessionId": 845860
  })
  headers = {
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Cookie': '_ga=GA1.1.843708714.1718742343; cfzs_google-analytics_v4=%7B%22STXt_pageviewCounter%22%3A%7B%22v%22%3A%221%22%7D%7D; _ga_0Y8G8VE83L=GS1.1.1719433381.4.0.1719433381.0.0.0; cfz_google-analytics_v4=%7B%22STXt_engagementDuration%22%3A%7B%22v%22%3A%228434%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_engagementStart%22%3A%7B%22v%22%3A%221719433390059%22%2C%22e%22%3A1750969390059%7D%2C%22STXt_counter%22%3A%7B%22v%22%3A%229%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_session_counter%22%3A%7B%22v%22%3A%224%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4%22%3A%7B%22v%22%3A%22fad29e90-c628-44a4-8ad0-f8096d375654%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_let%22%3A%7B%22v%22%3A%221719433381625%22%2C%22e%22%3A1750969381625%7D%2C%22STXt_ga4sid%22%3A%7B%22v%22%3A%222088621347%22%2C%22e%22%3A1719435181625%7D%7D',
    'Origin': 'https://data.ntsb.gov',
    'Referer': 'https://data.ntsb.gov/carol-main-public/query-builder?month=6&year=2024',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'accept': 'application/json',
    'content-type': 'application/json',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
  }

  requestpost = requests.request("POST", url, headers=headers, data=payload)
  response = requestpost.json()

  count = 0

  all_planes = []
  ids = []
  dates = []
  cities = []
  states = []
  injuries = []

  for results in response["Results"]:
      for field in results["Fields"]:
          if field["FieldName"] == "NtsbNo":
              ids.append(field["Values"][0])
              count = count + 1
          if field["FieldName"] == "EventDate":
              dates.append(field["Values"][0])
          if field["FieldName"] == "City":
              cities.append(field["Values"][0])
          if field["FieldName"] == "State":
              if(len(field["Values"]) > 0):
                  states.append(field["Values"][0])
              else:
                  states.append("None")
          if field["FieldName"] == "HighestInjuryLevel":
              if(len(field["Values"]) > 0):
                  injuries.append(field["Values"][0])
              else:
                  injuries.append("Unknown")
  i = 0
  while count > 0:
      plane = {
          "id" : ids[i],
          "date" : dates[i],
          "city" : cities[i],
          "state" : states[i],
          "injury" : injuries[i]
      }
      all_planes.append(plane)
      count = count - 1
      i = i + 1
  #print(all_planes)

  from collections import Counter

  state_counts = Counter(states)
  states2 = [{"state" : state, "num" : count} for state, count in state_counts.items()]
  sorted = sorted(states2, key=lambda x: x["num"])

  # print(sorted)


  morning = 0
  afternoon = 0
  night = 0
  times = []
  for date in dates:
      times.append(date[11:16])
  for t in times:
      timeI = int(t[0:2])
      if timeI < 13:
          morning = morning + 1
      elif 13 < timeI < 18:
          afternoon = afternoon + 1
      else:
          night = night + 1    

  print(states)
  import json
  import sys

  sys.stdout = open('dump.js', 'w')

  y = json.dumps(states)
  print("const dumped = '{}' ".format(y))

if __name__ == '__main__':
  app.run(debug=True)