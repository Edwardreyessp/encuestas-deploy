from flask import jsonify
import pyrebase
import functions_framework

@functions_framework.http
def addFile(request):
  # Set CORS headers for the main request
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  headers = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app'
  }

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
  db = firebase.database()
  fileNames = request.get_json()

  if len(fileNames) == 3:
      db.child('visualizacion').child('urls').set(fileNames)
  elif len(fileNames) == 4:
      db.child('post').child('urls').set(fileNames)
  elif len(fileNames) == 2:
      db.child('muestreo').child('urls').set(fileNames)
  else:
      print('error: in num of files')

  return (fileNames, 200, headers)

@functions_framework.http
def get_data():
  #firebase = pyrebase.initialize_app(config)
  #r_txt = requests.get(urls['word'])
  #texts=docx2txt.process(io.BytesIO(r_txt.content)).split('\n')
  #datos,_=text_to_json(texts)
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  headers = {
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app'
  }

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
  db = firebase.database()
  fileNames = db.child('visualizacion').child('urls').get().val()
  url = fileNames['word']
  r_txt = requests.get(url)
  texts = docx2txt.process(io.BytesIO(r_txt.content)).split('\n')
  datos, categorias = text_to_json(texts)

  for keys in datos:
    if (datos[keys]["tipo_pregunta"] == "cq"):
      for values in datos[keys]["respuestas"]:
        datos[keys]["respuestas"][values]["orden"] = 0

  db.child('visualizacion').child('categorias').set(categorias)
  db.child('visualizacion').child('questions').set(datos)

  return jsonify(datos)


@functions_framework.http
def getURL():
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  headers = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app'
  }

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
  db = firebase.database()
  storage = firebase.storage()
  categorias = db.child('visualizacion').child('categorias').get().val()
  solicitud = request.get_json()
  db.child('visualizacion').child('solicitud').set(solicitud)
  urls = db.child('visualizacion').child('urls').get().val()

  if urls['power'] == None:
    urls['power'] = storage.child('default_pptx/default.pptx').get_url(token=None)

  font_name = db.child('visualizacion').child('solicitud').child('config').child('font').get().val()
  url_font = db.child('fonts_source').child(font_name).get().val()
  print(font_name)    
  print(url_font)    

  A = read_data(solicitud,categorias, url_ppt=urls['power'], url_csv=urls['excel'], url_font=url_font)

  return A

@functions_framework.http
def get_post_conf():
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  headers = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app'
  }

  conf = request.get_json()    
  return conf


@functions_framework.http
def get_post_data():
  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    headers = {
      'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

  headers = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': 'https://encuestas-graficas.netlify.app'
  }

  data = request.get_json()    
  return data