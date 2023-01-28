import re
import json
import pandas as pd
import numpy as np
from colors import color_dict_base
from flask import jsonify

# find key locatyions at the document
def answer_to_color(answer):
    indicador=False
    i=0
    color_keys=list(color_dict_base.keys())
    while not indicador and i<len(color_keys):
        indicador=re.search(color_keys[i].upper(), answer.upper())
        i=i+1
    if indicador:
        return color_dict_base[color_keys[i-1]]
    else:
        return color_dict_base['Default']
                
# find key locatyions at the document
def find_item(par):
    texto=par
    
    if re.search('\[..\]',texto) or re.search('\[...\]',texto):
        
        return True
    else:
        return False

def get_categories(texts):
    categorias={}
    indicador=True
    indicador_2=False
    k=2
    i=1
    
    while indicador:
        custom_text=texts[k].lower().replace('í','i')
        if not re.search('categorias',custom_text):
            indicador_2=True
            
        if len(texts[k])>0 and indicador_2:
            categorias[str(i).zfill(2)]=texts[k]
            i=i+1
        k=k+1
        if (re.search('RESPUESTA',texts[k].upper())):
            indicador=False
    return categorias

def get_answers(texts,pila=False):
    respuestas={}
    k=0
    indicador=True
    if pila:
        indicador=False
        while not indicador:
            indicador=re.search('RESPUESTA',texts[k].upper())
            k=k+1
    else:
        k=1
    i=1
    while indicador:
        if (len(texts[k])>0):
            if re.search('\[',texts[k]):
                pass
            else:
                respuestas[str(i)]={'respuesta':texts[k].replace('_',''),'color':answer_to_color(texts[k].replace('_',''))}
                i=i+1
        else:
            if k==len(texts): 
                indicador=False
            elif (len(texts[k+1])==0):
                indicador=False
        k=k+1
    return respuestas
def text_to_json(texts):
    set_categorias={}
    datos={}
    
    contador=1
    for i,par in enumerate(texts): 
        if find_item(par):
            sub_data={}
            loc=par.lstrip().find(' ')
            key=str(contador).zfill(3)+par[:loc].strip()
            loc_tipo=par.find('[')
            end_tipo=par.find(']')
            
            enunciado=par[end_tipo+1:]
            tipo_grafica=par[loc_tipo+1:end_tipo]
            sub_data['tipo_pregunta']=tipo_grafica
            sub_data['enunciado']=enunciado
            
            if tipo_grafica=='cq':
                categorias=get_categories(texts[i+1:])
                set_categorias[key]=categorias
                sub_data['respuestas']= get_answers(texts[i:],pila=True)          
            else:
                    sub_data['respuestas']= get_answers(texts[i:])
            datos[key]=sub_data
            contador=contador +1


    
    return datos,set_categorias


