
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns 
import pyrebase

from plot_functions import *
from ppt_functions import *
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
storage=firebase.storage()



def read_data(request,categorias,url_csv,url_ppt, url_font):
    
    preguntas=request['preguntas']
    graficas=request['charts']
    keys=sorted(list(preguntas.keys()))
    font_char = request["config"]
    enunciados={}

    
    for pregunta in graficas.keys():
        key=keys[int(pregunta)-1]
        enunciado=preguntas[key]['enunciado']
        tipo_q=preguntas[key]['tipo_pregunta']
        respuestas={}
        colores={}
        ordenes = {}

        for num in preguntas[key]['respuestas'].keys():
            respuestas[int(num)]=preguntas[key]['respuestas'][num]['respuesta']
            colores[preguntas[key]['respuestas'][num]['respuesta']]=preguntas[key]['respuestas'][num]['color']
        
        for tipo in graficas[pregunta]:            
            if tipo=='pila':
                categorias_0=list(categorias[key].values())
                for num1 in preguntas[key]['respuestas'].keys():
                    #print(preguntas[key]["respuestas"][num1]["orden"])
                    ordenes[preguntas[key]['respuestas'][num1]['respuesta']]=preguntas[key]["respuestas"][num1]["orden"]   
                    
                key_=key[3:]+'_'
                df, nivel1, colores = make_df(key=key_,url_csv=url_csv,respuestas=respuestas,tipo=tipo,categorias=categorias_0, ordenes = ordenes, colores = colores)
                fig=plot3(df,colores, categorias_0, url_font, font_char,nivel1=nivel1)

            else:
                key_=key[3:]
                tipo_=tipo
                if tipo_q=='moq':
                    tipo_='multi'
                df, nivel1 = make_df(key=key_,url_csv=url_csv,respuestas=respuestas,tipo=tipo_)
                vertical=True
                ordenado=False
                if tipo=='barrasO':
                    vertical=True
                    ordenado=True
                elif tipo=='barrasH':
                    vertical=False
                    ordenado=False
                elif tipo=='barrasHO':
                    vertical=False
                    ordenado=True    
                else:
                    pass
                fig=plot1(df,colores, url_font, font_char,vertical=vertical,ordenado=ordenado,nivel1=nivel1)
            nombre='img_'+pregunta.zfill(2) +'_' +tipo+".png"
            fig.savefig(nombre, dpi=200, transparent=True, bbox_inches='tight')
            enunciados[nombre]=enunciado
            storage.child('graficas/'+nombre).put(nombre)
    url_out=create_ppt(url_ppt,enunciados)


    return url_out

def RedondeoV2(x1, c, i):
    conteo=x1.groupby([c, i])["ps.weight"].sum()
    conteo=conteo/conteo.sum() * 100    
    red1 = np.floor(conteo)
    red2 = conteo - red1
    x1 = pd.DataFrame(conteo)
    x1["red1"] = red1
    x1["red2"] = red2    
    datos = x1.sort_values("red2", ascending = False).reset_index()    
    for k in datos[i].unique():
        datos1 = datos[datos[i] == k]
        datos2 = datos[datos[i] != k]
        cuantos = 100-sum(datos1.red1)
        if(cuantos>0):
            datos1.red1.iloc[range(int(cuantos))] = np.array(datos1.red1.iloc[range(int(cuantos))] + 1)
            datos = pd.concat([datos1,datos2])
        del(datos1,datos2,cuantos)
    datos = datos.sort_index()
    
    return(datos[[c, "red1"]]) 

def RedondeoV3(x1, c, i, llaves_ordenes):
    # selecting rows based on condition  
    x1 = x1[x1[c].isin(llaves_ordenes)].copy()
    conteo=x1.groupby([c, i])["ps.weight"].sum()    
    conteo=conteo/conteo.sum() * 100
    red1 = np.floor(conteo)
    red2 = conteo - red1
    x1 = pd.DataFrame(conteo)
    x1["red1"] = red1
    x1["red2"] = red2
    datos = x1.sort_values("red2", ascending = False).reset_index()
    for k in datos[i].unique():
        datos1 = datos[datos[i] == k]
        datos2 = datos[datos[i] != k]
        cuantos = 100-sum(datos1.red1)
        if(cuantos>0):
            datos1.red1.iloc[range(int(cuantos))] = datos1.red1.iloc[range(int(cuantos))] + 1
            datos = pd.concat([datos1,datos2])
        del(datos1,datos2,cuantos)
    datos = datos.sort_index()
    return(datos[[c, "red1"]])    



def make_df(key,url_csv,respuestas, tipo=None,categorias=None, ordenes= None, colores = None):    
    Agrupa = "nivel1"
    all_data = pd.read_csv(url_csv, encoding_errors='ignore')
    nivel1 = all_data.loc[0,Agrupa]
    if tipo=='pila':
        df=all_data.filter(like=key,axis=1)
        df.columns = categorias
        df.replace(respuestas,inplace=True)
        df=df.join(all_data[['ps.weight',Agrupa]])
        data=pd.DataFrame([],index=list(respuestas.values()))
        # Ordenes de menor a mayor
        print(ordenes.items())
        sort_ordenes = sorted(ordenes.items(), key=lambda x: int(x[1]), reverse=False)
        valores_ordenes = []
        llaves_ordenes = []
        colores_ordenes = []
        
        for imagine in sort_ordenes:
            c = imagine[0]
            if (int(imagine[1]) != 0):
                valores_ordenes.append(imagine[1])    
                llaves_ordenes.append(imagine[0])  
                if (colores != None):
                    colores_ordenes.append(colores[imagine[0]])
        for c in df.columns[:-2]:
            conteo = RedondeoV3(df, c, Agrupa, llaves_ordenes)
            conteo.rename(columns={c:'c','red1':c},inplace=True)
            conteo.set_index('c',inplace=True)
            data=data.join(conteo) 

        dataframe_proper=data.T
            
        if(valores_ordenes == []):
            dataframe_proper = dataframe_proper.sort_values(by=[dataframe_proper.columns[0]], ascending = False)
        elif (chkList_equal(valores_ordenes)):
            dataframe_proper = dataframe_proper.sort_values(by=[dataframe_proper.columns[0]], ascending = False)
        else:
            dataframe_proper = dataframe_proper[llaves_ordenes]   
            # using dictionary comprehension
            # to convert lists to dictionary
            if (colores != None):
                print(llaves_ordenes)
                print(colores_ordenes)
                colores = {llaves_ordenes[imagine2]: colores_ordenes[imagine2] for imagine2 in range(len(llaves_ordenes))}                    
        
        return dataframe_proper, nivel1, colores
    
    
    elif tipo=='multi':
        df=all_data.filter(like=key,axis=1)
        df.columns = respuestas.values()
        df=(df==1)*1
        df=df.join(all_data[['ps.weight']])
        data={}
        for c in df.columns[:-1]:
            data[c]=(df[c]*df["ps.weight"]).sum()/df["ps.weight"].sum()

        
        data=pd.DataFrame.from_dict(data,orient='index')
        dataframe_proper=data.reset_index()
        dataframe_proper.columns=['etiquetas','freq']
        dataframe_proper['freq']=dataframe_proper.freq.apply(lambda x: int(round(100*x,0)))

    else:
        df=all_data[[key]]
        df.replace(respuestas,inplace=True)
        df=df.join(all_data[['ps.weight',Agrupa]])
        df = RedondeoV2(df, key, Agrupa)
        df.columns=['etiquetas','freq']
        dataframe_proper = pd.DataFrame(list(respuestas.values()), columns = ["etiquetas"])
        dataframe_proper = dataframe_proper.merge(df, on = "etiquetas", how = "left")
        
    return dataframe_proper, nivel1
