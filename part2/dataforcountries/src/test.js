import axios from "axios";

import { getWeatherMeteo } from "./ApiServices.js"; 

async function testGetWeatherMeteo() {
  try {
    console.log("Iniciando teste getWeatherMeteo...");

    // Exemplo: Berlim (lat, lon)
    const location = [52.52, 13.41];

    const data = await getWeatherMeteo(location);

    console.log("Resposta recebida:");
    console.log(data);

    if (!data || !data.current) {
      console.error("ERRO: campo 'current' não encontrado na resposta");
      return;
    }

    console.log("Temperatura:", data.current.temperature_2m);
    console.log("Umidade:", data.current.relative_humidity_2m);
    console.log("Código do tempo:", data.current.weather_code);

    console.log("Teste concluído com sucesso.");
  } catch (err) {
    console.error("Erro ao testar getWeatherMeteo:");
    console.error(err);
  }
}

testGetWeatherMeteo();
