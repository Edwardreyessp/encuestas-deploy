#!/usr/bin/env python
# coding: utf-8
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib import path
from matplotlib.patches import BoxStyle
import matplotlib.patches as mpatches
import os
import requests
import matplotlib.font_manager as font_manager
import matplotlib as mpl

class ExtendedTextBox(BoxStyle._Base):
    """
    An Extended Text Box that expands to the axes limits 
                        if set in the middle of the axes
    """

    def __init__(self, pad=0.3, width=500.):
        """
        width: 
            width of the textbox. 
            Use `ax.get_window_extent().width` 
                   to get the width of the axes.
        pad: 
            amount of padding (in vertical direction only)
        """
        self.width=width
        self.pad = pad
        super(ExtendedTextBox, self).__init__()
    def transmute(self, x0, y0, width, height, mutation_size):
        """
        x0 and y0 are the lower left corner of original text box
        They are set automatically by matplotlib
        """
        # padding
        pad = mutation_size * self.pad
        # we add the padding only to the box height
        height = height + 2.*pad
        # boundary of the padded box
        y0 = y0 - pad
        y1 = y0 + height
        _x0 = x0
        x0 = _x0 +width /2. - self.width/2.
        x1 = _x0 +width /2. + self.width/2.
        cp = [(x0, y0),
              (x1, y0), (x1, y1), (x0, y1),
              (x0, y0)]
        com = [path.Path.MOVETO,
               path.Path.LINETO, path.Path.LINETO, path.Path.LINETO,
               path.Path.CLOSEPOLY]
        pathstring = path.Path(cp, com)
        return pathstring

def cm_to_inch(value):
    return value/2.54

    
# create function that
# return space count
def check_space(string):
    # counter
    count = 0
     
    # loop for search each index
    for i in range(0, len(string)):
         
        # Check each char
        # is blank or not
        if string[i] == " ":
            count += 1         
    return count

def space_split(a):
    if a.count(" ") == 1:
        return a.split(" ", 1)
    return " ".join(a.split(" ", 2))

def count_unique(finduniqueList):
    newList = []
    count = 0
    for point in finduniqueList:
        if point not in newList:
            count += 1
            newList.append(point)
    return count

def list_unique(finduniqueList):
    newList = []
    for point in finduniqueList:
        if point not in newList:
            newList.append(point)
    return newList

def chkList_equal(lst):
    if len(lst) < 0:
        res = True
    res = lst.count(lst[0]) == len(lst)
    return res 



######################################
######################################
def plot1(df, colores, font_url, font_char, vertical=True, ordenado=False, slide_layout = 0, nivel1 = "Nacional"):    
    color_primario = font_char["colorPrimary"] #font_char[0]
    color_secundario = font_char["colorSecondary"]#font_char[1]
    color_terciario = font_char["colorTerceary"] #font_char[2]
    color_texto = font_char["colorText"]
    tamano_eje = font_char["sizeAxisText"]
    tamano_barra = font_char["sizeBarText"]
    tamano_grafica = font_char["sizeChartText"]
    tamano_leyenda = font_char["sizeLegendText"]
    
    
    if (color_secundario == "#BFBFBF"):
        color_secundario = color_primario
        color_terciario = color_primario
    elif (color_terciario == "#BFBFBF"):
        color_terciario == color_primario        
    colores_list = list(colores.values())
        
    sequence_creator = np.stack([[0,1,2] for _ in range(int(np.ceil(len(colores_list)/3)))], axis=0)
    sequence_creator = sequence_creator.reshape(sequence_creator.shape[0]*sequence_creator.shape[1])
    boolean_list_cols = list_unique(colores_list) == "#BFBFBF"
    boolean_list_cols = np.array(boolean_list_cols, dtype=bool) * 1
    if boolean_list_cols.sum()/count_unique(colores_list) >= 0.5:
        for a in range(len(colores_list)):
            if sequence_creator[a] == 0:                
                colores_list[a] = color_primario
            elif sequence_creator[a] == 1:
                colores_list[a] = color_secundario
            else:
                colores_list[a] = color_terciario

                
    myfile = requests.get(font_url)
    open('customfont1.ttf', 'wb').write(myfile.content)
                
    font_path = 'customfont1.ttf'  # Your font path goes here
    font_manager.fontManager.addfont(font_path)
    fontname = font_manager.FontProperties(fname=font_path)

    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = fontname.get_name()
    

    ################    
    for label_index in range(len(df['etiquetas'])):
        label = df.loc[label_index, 'etiquetas']
        if(len(label) > 40):
            temp1 = str(label[:40])
            temp2 =  str(label[40:])
            if(len(temp2) > 40):
                temp2_1 = str(temp2[:40])
                temp2_2 =  str(temp2[40:])
                temp1 = temp1.replace(" ", "\n", 1)
                temp2_1 = temp2_1.replace(" ", "\n", 1)
                df.loc[label_index, 'etiquetas'] = temp1 + temp2_1 + temp2_2    
            else:
                temp1 = temp1.replace(" ", "\n", 1)
                df.loc[label_index, 'etiquetas'] = temp1 + temp2    
        
    BoxStyle._style_list["ext"] = ExtendedTextBox
    y='etiquetas'
    x='freq'    

    if ordenado:
        df=df.sort_values("freq", ascending = False)
    if vertical:
        x='etiquetas'
        y='freq'
    if (slide_layout == 0):
        width_ppt = 30.35
        height_ppt = 14.2        
    else:
        width_ppt = 16.8
        height_ppt = 14.2               
    fig = plt.figure(figsize=(cm_to_inch(width_ppt), cm_to_inch(height_ppt)), dpi=200)
    ax = sns.barplot(x=x, y=y, data=df, palette = colores_list)
    ax.xaxis.label.set_color('#4d4d4d')

     
    if (vertical):
        plt.xticks(fontsize = tamano_eje, 
                   fontproperties=fontname, 
                   color=color_texto, 
                   rotation=45,  ha='right', rotation_mode='anchor')  # Set text labels and properties.
                
    ax.bar_label(ax.containers[0], fontsize = tamano_grafica, 
                 fontproperties=fontname,  
                 color=color_texto)

    
    # Maximum bar width is 1. Normalise counts to be in the interval 0-1. Need to supply a maximum possible count here as maxwidth
    def normaliseCounts(widths,maxwidth):
        widths = np.array(widths)/float(maxwidth)
        return widths

    
    if (vertical):
        # Set these based on your column counts
        columncounts = 40 * np.ones(len(colores_list))    
        widthbars = normaliseCounts(columncounts,100)
        # Loop over the bars, and adjust the width (and position, to keep the bar centred)
        for bar,newwidth in zip(ax.patches,widthbars):
            x = bar.get_x()
            width = bar.get_width()
            centre = x+width/2.

            bar.set_x(centre-newwidth/2.)
            bar.set_width(newwidth)    
    else:
        # Set these based on your column counts
        columncounts = 40 * np.ones(len(colores_list))    
        widthbars = normaliseCounts(columncounts,100)
        # Loop over the bars, and adjust the width (and position, to keep the bar centred)
        for bar,newheight in zip(ax.patches,widthbars):
            y = bar.get_y()
            height = bar.get_height()
            centre = y+height/2.

            bar.set_y(centre-newheight/2.)
            bar.set_height(newheight)    
        
    # place a text box in upper left in axes coords
    # set the title position to the horizontal center (0.5) of the axes
    title = ax.set_title(nivel1, position=(.5, 1), pad=40, 
                         fontproperties=fontname, fontsize = tamano_barra,
                 backgroundcolor="#D3D3D3", color='#4d4d4d')
    # set the box style of the title text box toour custom box
    bb = title.get_bbox_patch()
    # use the axes' width as width of the text box
    bb.set_boxstyle("ext", pad=0.1, width=ax.get_window_extent().width + 300 )
    
    # these are matplotlib.patch.Patch properties
    if vertical:
        plt.ylabel("%", fontsize = tamano_grafica, fontproperties=fontname, color=color_texto) 
        plt.xlabel("") 
        plt.yticks(list(), fontsize = tamano_eje, fontproperties=fontname, color=color_texto)
        ax.tick_params(
        axis='x',          # changes apply to the x-axis
        which='both',      # both major and minor ticks are affected
        bottom=False,      # ticks along the bottom edge are off
        top=False,         # ticks along the top edge are off
        labelbottom=True) # labels along the bottom edge are off
        ax.xaxis.label.set_color('#4d4d4d')            
    else:
        plt.xlabel("%", fontsize = tamano_grafica, fontproperties=fontname, color=color_texto)
        plt.ylabel("") 
        plt.xticks(list())
        plt.yticks(fontsize = tamano_eje, fontproperties=fontname, color=color_texto)  # Set text labels and properties.        
        ax.tick_params(
        axis='x',          # changes apply to the x-axis
        which='both',      # both major and minor ticks are affected
        bottom=False,      # ticks along the bottom edge are off
        top=False,         # ticks along the top edge are off
        labelbottom=False) # labels along the bottom edge are off
        ax.xaxis.label.set_color('#4d4d4d')            
    
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_visible(False)

    fig.tight_layout()
    return fig 

    
def plot3(df,  colores, categorias_0, font_url, font_char, nivel1 = "Nacional"):     
    BoxStyle._style_list["ext"] = ExtendedTextBox
    
    color_primario = font_char["colorPrimary"] #font_char[0]
    color_secundario = font_char["colorSecondary"]#font_char[1]
    color_terciario = font_char["colorTerceary"] #font_char[2]
    color_texto = font_char["colorText"]
    tamano_eje = font_char["sizeAxisText"]
    tamano_barra = font_char["sizeBarText"]
    tamano_grafica = font_char["sizeChartText"]
    tamano_leyenda = font_char["sizeLegendText"]

    if (color_secundario == "#BFBFBF"):
        color_secundario = color_primario
        color_terciario = color_primario
    elif (color_terciario == "#BFBFBF"):
        color_terciario == color_primario        
    colores_list = list(colores.values())
    
    sequence_creator = np.stack([[0,1,2] for _ in range(int(np.ceil(len(colores_list)/3)))], axis=0)
    sequence_creator = sequence_creator.reshape(sequence_creator.shape[0]*sequence_creator.shape[1])
    boolean_list_cols = list_unique(colores_list) == "#BFBFBF"
    boolean_list_cols = np.array(boolean_list_cols, dtype=bool) * 1
    print(boolean_list_cols.sum())
    if boolean_list_cols.sum()/count_unique(colores_list) >= 0.5:
        for a in range(len(colores_list)):
            if sequence_creator[a] == 0:                
                colores_list[a] = color_primario
            elif sequence_creator[a] == 1:
                colores_list[a] = color_secundario
            else:
                colores_list[a] = color_terciario        
    
        
    myfile = requests.get(font_url)
    open('CustomFont1.ttf', 'wb').write(myfile.content)
    font_path = 'customfont1.ttf'  # Your font path goes here
    font_manager.fontManager.addfont(font_path)
    fontname = font_manager.FontProperties(fname=font_path)

    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = fontname.get_name()
    
    
    # creating subplots
    width_ppt = 30
    height_ppt = 14.2            
    fig , ax = plt.subplots(figsize=(cm_to_inch(width_ppt), cm_to_inch(height_ppt)), dpi=200)
    # plotting columns
    data_cum=df.cumsum(axis=1)
    for i, colname in enumerate(df.columns):
        widths = df.loc[:, colname]
        starts = data_cum.loc[:,colname] - widths
        count = check_space(colname)
        if(count == 1):
            temp1, temp2 = space_split(colname)
            temp1 = temp1 + "\n"            
            labellist = temp1 + temp2     
        elif(count == 2):
            temp0, temp1, temp2 = space_split(colname)
            temp1 = temp1 + "\n"
            temp1 = temp0 + temp1
            labellist = temp1 + temp2    

        ax.barh(categorias_0, widths, left=starts,
                label=colname, color=colores_list[i])
    #plot the labels on the bars
    plt.yticks(fontsize = tamano_eje, fontproperties=fontname, color=color_texto) 
    plt.xticks(list())
    plt.ylabel("%", fontsize = tamano_grafica, 
               fontproperties=fontname, 
               color=color_texto)     
    
    # place a text box in upper left in axes coords
    # set the title position to the horizontal center (0.5) of the axes
    title = ax.set_title(nivel1, position=(.5, 6), fontproperties=fontname,
                         fontsize = tamano_barra,
                 backgroundcolor="#D3D3D3", color='#4d4d4d')
    # set the box style of the title text box to our custom box
    bb = title.get_bbox_patch()
    # use the axes' width as width of the text box
    bb.set_boxstyle("ext", pad=0.1, width=ax.get_window_extent().width )
    
    patchlist = []
       
    for i,j in enumerate(colores.keys()):
        patchlist.append(mpatches.Patch(color=colores_list[i], label=j))
        # Label with label_type 'center' instead of the default 'edge'
        ax.bar_label(ax.containers[i], label_type='center', fontsize = tamano_grafica, color = color_texto,
                     fontproperties=fontname)        
                
    font_prop = font_manager.FontProperties(size=tamano_leyenda)
    leyenda = ax.legend(loc='upper center', handlelength = 0.7, handleheight = 1.4, 
                        bbox_to_anchor=(0.5, -0.05), prop=font_prop,
                        ncol=len(colores_list[i]), frameon = False, facecolor = "inherit")
    for text in leyenda.get_texts():
        text.set_color(color_texto)
        
    # use the axes' width as width of the text box
    bb.set_boxstyle("ext", pad=0.1, width=ax.get_window_extent().width )
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_visible(False)    
    # visualizing illustration
    # This should be called after all axes have been added
    fig.tight_layout()
    return fig
