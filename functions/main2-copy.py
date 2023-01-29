from flask import jsonify
import pyrebase

def cors_enabled_function(request):
  # Set CORS headers for the preflight request
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  # Set CORS headers for the main request
  headers = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  }

  return headers


def addFile(request):
  headers = cors_enabled_function(request)
  fileNames = request.get_json()

  config = {
    "apiKey": "AIzaSyD0FKu0dmU_rm13CD_rOYXxI-rMEN8Eqc0",
    "authDomain": "proyectoencuestas1-f2ece.firebaseapp.com",
    "databaseURL": "https://proyectoencuestas1-f2ece-default-rtdb.firebaseio.com",
    "projectId": "proyectoencuestas1-f2ece",
    "storageBucket": "proyectoencuestas1-f2ece.appspot.com",
    "messagingSenderId": "155763376702",
    "appId": "1:155763376702:web:5f53f1454fffd944d7876f",
    "measurementId": "G-HP6QXTS75S"
  }

  firebase = pyrebase.initialize_app(config)
  db=firebase.database()
  
  # fileNames = request.get_json()
  if len(fileNames)==3:
      db.child('visualizacion').child('urls').set(fileNames)
  elif len(fileNames)==4:
      db.child('post').child('urls').set(fileNames)
  elif len(fileNames)==2:
      db.child('muestreo').child('urls').set(fileNames)
  else:
      print('error: in num of files')

  return (fileNames, 200, headers)

def corsFunction(request):
  headers = cors_enabled_function(request)
  request_json = request.get_json()
  print(request_json)

  return (request_json, 200, headers)