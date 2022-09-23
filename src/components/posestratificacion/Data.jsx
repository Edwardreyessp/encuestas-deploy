import { useState } from 'react';
import Encuestas from './Encuestas';
import Estratos from './Estratos';

const Data = () => {
  const [opcionesEncuesta, setOpcionesEncuesta] = useState({
    nacional: false,
    circuns: false,
    estatal: false,
    municipal: false,
    local: false,
    federal: false,
    seccion: false,
  });

  const [estratos, setEstratos] = useState({
    circuns: false,
    estados: false,
    municipio: false,
    local: false,
    deferal: false,
    seccion: false,
  });

  return (
    <main className="Data">
      <section className="Interaction">
        <section className="Menu">
          <section className="Encuestas">
            <div className="Title">Nivel de encuesta</div>
            <div className="Options">
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Nacional'}
                flag={opcionesEncuesta.nacional}
                option={'nacional'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Circunscripciones'}
                flag={opcionesEncuesta.circuns}
                option={'circuns'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Estatal'}
                flag={opcionesEncuesta.estatal}
                option={'estatal'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Municipal'}
                flag={opcionesEncuesta.municipal}
                option={'municipal'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Distritos locales'}
                flag={opcionesEncuesta.local}
                option={'local'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Distritos federales'}
                flag={opcionesEncuesta.federal}
                option={'federal'}
              />
              <Encuestas
                setOpcionesEncuesta={setOpcionesEncuesta}
                opcionesEncuesta={opcionesEncuesta}
                name={'Secciones'}
                flag={opcionesEncuesta.seccion}
                option={'seccion'}
              />
            </div>
          </section>
          <section className="Estratos">
            <div className="Title-estrato">
              <p>Cantidad estratos</p>
              <input type="text" />
            </div>
            <div className="Options">
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Circunscripciones'}
                flag={estratos.circuns}
                option={'circuns'}
              />
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Estados'}
                flag={estratos.estados}
                option={'estados'}
              />
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Municipios'}
                flag={estratos.municipio}
                option={'municipio'}
              />
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Distritos locales'}
                flag={estratos.local}
                option={'local'}
              />
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Distritos federales'}
                flag={estratos.federal}
                option={'federal'}
              />
              <Estratos
                estratos={estratos}
                setEstratos={setEstratos}
                name={'Secciones'}
                flag={estratos.seccion}
                option={'seccion'}
              />
            </div>
          </section>
        </section>
        <section className="Estratos-input">
          <p>R1:</p>
          <input type="text" />
        </section>
      </section>
      <section className="Buttons">
        <div className="Button">Subir datos</div>
        <div className="Button">Descargar visualización</div>
      </section>
    </main>
  );
};

export default Data;
