
import requests
from read_functions_txt import *
from get_data import *
from flask import jsonify,Flask,request
import docx2txt
import pyrebase
import io 
import json
from flask_cors import CORS, cross_origin
from plot_functions import *
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://63d0d931405be8000846f7ae--encuestas-graficas.netlify.app", "http://localhost", "https://deploy-preview-77--encuestas-graficas.netlify.app"]}}, supports_credentials=True)
#CORS(app, supports_credentials=True)

@cross_origin
@app.route("/files", methods=['POST'])
def addFile():
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
    
    #fileNames=db.child('urls').get().val()
    fileNames = request.get_json()
    if len(fileNames)==3:
        db.child('visualizacion').child('urls').set(fileNames)
    elif len(fileNames)==4:
        db.child('post').child('urls').set(fileNames)
    elif len(fileNames)==2:
        db.child('muestreo').child('urls').set(fileNames)
    else:
        print('error: in num of files')
    return 'success'
    
@cross_origin
@app.route("/questions",methods=['GET'])
def get_data():
    #firebase = pyrebase.initialize_app(config)
    #r_txt = requests.get(urls['word'])
    #texts=docx2txt.process(io.BytesIO(r_txt.content)).split('\n')
    #datos,_=text_to_json(texts)
    
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
    fileNames=db.child('visualizacion').child('urls').get().val()
    url=fileNames['word']
    r_txt = requests.get(url)
    texts=docx2txt.process(io.BytesIO(r_txt.content)).split('\n')
    datos,categorias=text_to_json(texts)
    for keys in datos:
        if(datos[keys]["tipo_pregunta"] == "cq"):
            for values in datos[keys]["respuestas"]:
                datos[keys]["respuestas"][values]["orden"] = 0            
    db.child('visualizacion').child('categorias').set(categorias)
    db.child('visualizacion').child('questions').set(datos)
    return jsonify(datos) 
@cross_origin
@app.route("/questions",methods=['POST'])
def getURL():
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
    storage=firebase.storage()
    categorias=db.child('visualizacion').child('categorias').get().val()
    solicitud = request.get_json()
    db.child('visualizacion').child('solicitud').set(solicitud)
    urls=db.child('visualizacion').child('urls').get().val()

    if urls['power']==None:
        urls['power']=storage.child('default_pptx/default.pptx').get_url(token=None)

    font_name=db.child('visualizacion').child('solicitud').child('config').child('font').get().val()
    url_font=db.child('fonts_source').child(font_name).get().val()
    print(font_name)    
    print(url_font)    
        
        
    A=read_data(solicitud,categorias,url_ppt=urls['power'],url_csv=urls['excel'], url_font = url_font)
    
    return A

@cross_origin
@app.route("/post/conf",methods=['POST'])
def get_post_conf():
    conf = request.get_json()    
    return conf


@cross_origin
@app.route("/post/data",methods=['POST'])
def get_post_data():
    data = request.get_json()    
    return data

if __name__ == "__main__":
    app.run(debug = False, port=4000)
