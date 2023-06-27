import "./App.css";
import { useEffect, useState } from "react";
import { app } from "./firebaseApp";
import { getDatabase, ref, onValue, set } from "firebase/database";
import moment from "moment/moment";
import "moment/locale/es";
import { VictoryLine, VictoryChart, VictoryLabel } from "victory";

function App() {
  const [sensores, setSensores] = useState([]);
  const [fecha, setFecha] = useState(moment().format("YYYY-MM-DD"));
  const [hora, setHora] = useState(moment().format("HH:mm:ss"));

  const base = getDatabase(app);

  const setPrueba = () => {
    set(ref(base, `registros/${fecha}/${hora}`), {
      agua: Math.floor(Math.random() * (100 - 0)) + 0,
      temperatura: Math.floor(Math.random() * (100 - 0)) + 0,
      humedad: Math.floor(Math.random() * (100 - 0)) + 0,
      humedad_tierra: Math.floor(Math.random() * (100 - 0)) + 0,
      vibracion: Math.floor(Math.random() * (100 - 0)) + 0,
      lluvia: Math.floor(Math.random() * (100 - 0)) + 0,
      luz: Math.floor(Math.random() * (100 - 0)) + 0,
      gas: Math.floor(Math.random() * (100 - 0)) + 0,
      fecha: fecha,
      hora: moment().format("HH:mm:ss"),
    });
  };

  useEffect(() => {
    const sensoresRef = ref(base, `registros/${fecha}`);
    onValue(sensoresRef, (snapshot) => {
      const data = snapshot.val();
      setSensores(
        Object.values(data)
          .map((item) => item)
          .reverse()
          .slice(0, 6)
      );
      console.log(sensores[0]);
      cargarGraficos();
    });
  }, []);

  const cargarGraficos = () => {
    const temperatura = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.temperatura };
    });
    const humedad = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.humedad };
    });
    const humedad_tierra = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.humedad_tierra };
    });
    const lluvia = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.lluvia };
    });
    const luz = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.luz };
    });
    const gas = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.gas };
    });

    const vibracion = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.vibracion };
    });

    const agua = sensores.map((item) => {
      const x = moment(item.hora, "HH:mm:ss").format("mm:ss");
      return { x, y: item.agua };
    });

    return (
      <>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel
              text="Temperatura"
              x={225}
              y={30}
              textAnchor="middle"
            />
            <VictoryLine data={temperatura.reverse()} />
          </VictoryChart>
        </div>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Humedad" x={225} y={30} textAnchor="middle" />
            <VictoryLine data={humedad.reverse()} />
          </VictoryChart>
        </div>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel
              text="Hum. Tierra"
              x={225}
              y={30}
              textAnchor="middle"
            />
            <VictoryLine data={humedad_tierra.reverse()} />
          </VictoryChart>
        </div>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Lluvia" x={225} y={30} textAnchor="middle" />
            <VictoryLine data={lluvia.reverse()} />
          </VictoryChart>
        </div>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Foto Res." x={225} y={30} textAnchor="middle" />
            <VictoryLine data={luz.reverse()} />
          </VictoryChart>
        </div>
        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Gas" x={225} y={30} textAnchor="middle" />
            <VictoryLine data={gas.reverse()} />
          </VictoryChart>
        </div>

        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Vibración" x={225} y={30} textAnchor="middle" />
            <VictoryLine data={vibracion.reverse()} />
          </VictoryChart>
        </div>

        <div className="col-12 col-md-6">
          <VictoryChart
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "90%" } }}
          >
            <VictoryLabel text="Ni. Agua" x={225} y={30} textAnchor="middle" />
            <VictoryLine data={agua.reverse()} />
          </VictoryChart>
        </div>
      </>
    );
  };

  const cargarSensores = () => {
    if (sensores.length > 0) {
      return (
        <>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Fecha
              <span className="badge bg-warning mx-1 fw-light">
                {moment(sensores[0].fecha).format("LL")}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Hora
              <span className="badge bg-warning mx-1 fw-light">
                {sensores[0].hora}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Temperatura
              <span className="badge bg-success">
                {sensores[0].temperatura}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Humedad
              <span className="badge bg-success">{sensores[0].humedad}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Hum. Tierra
              <span className="badge bg-success">
                {sensores[0].humedad_tierra}
              </span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              Lluvia
              <span className="badge bg-success">{sensores[0].lluvia}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Foto Res.
              <span className="badge bg-success">{sensores[0].luz}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Gas
              <span className="badge bg-success">{sensores[0].gas}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Vibración
              <span className="badge bg-success">{sensores[0].vibracion}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Ni. Agua
              <span className="badge bg-success">{sensores[0].agua}</span>
            </li>
          </ul>
        </>
      );
    }
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="row my-4">
            <div className="col-12">
              <h3>Estación Meteorológica</h3>
            </div>
            <div className="col-12 mt-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => {
                  setPrueba();
                }}
              >
                Envio de prueba
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9">
              <div className="row">
                <div className="col-12 mt-2">
                  <h4>Gráficas</h4>
                </div>
              </div>

              <div className="row">{cargarGraficos()}</div>
            </div>
            <div className="col-12 col-md-3">
              <div className="row">
                <div className="col-12 mt-2">
                  <h4>Sensores</h4>
                </div>
                <div className="col-12">{cargarSensores()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
