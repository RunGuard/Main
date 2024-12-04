const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ao acessar ${url}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
};

const atualizarIndicadorChamadosAbertos = async () => {
  const chamados = await fetchData("/api/getIssues");
  if (chamados) {
    const chamadosAbertos = chamados.filter((item) => item.status !== "Itens concluídos").length;
    const campoItensTot = document.getElementById("valorChamadosAbertos");
    if (campoItensTot) {
      campoItensTot.innerHTML = chamadosAbertos;
    } else {
      console.error("Elemento valorChamadosAbertos não encontrado");
    }
  } else {
    console.error("Nenhum chamado encontrado.");
  }
};

const temaGraficos = {
  chart: {
    background: "#35353D",
    foreColor: "#FFFFFF",
    toolbar: {
      show: false,
    },
  },
  colors: ["#FFDC60"],
  grid: {
    borderColor: "#555",
    yaxis: {
      lines: {
        show: true,
        opacity: 0.1,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
};

const criarGraficoBarra = async () => {
  const chamados = await fetchData("/api/getIssues");
  let componentes = {
    CPU: 0,
    RAM: 0,
    RAM_SSD: 0,
  };
  chamados.forEach((elem) => {
    if (elem.description.toLowerCase().includes("CPU:".toLowerCase())) {
      componentes.CPU++;
    }
    if (elem.description.toLowerCase().includes("Memória:".toLowerCase())) {
      componentes.RAM++;
    }
    if (elem.description.toLowerCase().includes("Memória usada:".toLowerCase())) {
      componentes.RAM_SSD++;
    }
  });

  const series = [
    {
      name: "Alertas",
      data: Object.values(componentes),
    },
  ];

  const options = {
    series: [
      {
        name: "Alertas",
        data: Object.values(componentes),
      },
    ],
    chart: {
      type: "bar",
      height: "100%",
      background: "#35353D",
      fontFamily: "Poppins, sans-serif",
    },
    title: {
      text: "Alertas por Componente",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "normal",
        color: "#FFFFFF",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        distributed: true,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#FFDC60"],
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#000000"],
        fontSize: "12px",
      },
    },
    xaxis: {
      categories: ["CPU", "RAM", "RAM + SSD"],
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#404040",
    },
  };

  const elementoGrafico = document.querySelector("#graficoBarra");
  if (elementoGrafico) {
    const chart = new ApexCharts(elementoGrafico, options);
    chart.render();
  }
};

const criarGraficoPizza = async () => {
  const chamados = await fetchData("/api/getIssues");
  const chamadosPorPrioridade = chamados.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {});

  // Revisar
  const labels = Object.keys(chamadosPorPrioridade);
  const series = Object.values(chamadosPorPrioridade);

  const options = {
    series: Object.values(chamadosPorPrioridade),
    chart: {
      type: "donut",
      height: 180,
      background: "#35353D",
      fontFamily: "Poppins, sans-serif",
    },
    title: {
      text: "Alertas por prioridade",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "normal",
        color: "#FFFFFF",
      },
    },
    colors: ["#FFDC60", "#FFB960", "#FF8B60"],
    labels: Object.keys(chamadosPorPrioridade),
    theme: {
      mode: "dark",
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (value) {
          return value + " alertas";
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#FFFFFF",
      },
      fontSize: "12px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#ffffff"],
        fontSize: "12px",
      },
    },
  };

  const chart = new ApexCharts(document.querySelector("#graficoPizza"), options);
  chart.render();
};

const atualizarListaFuncionarios = async () => {
  const funcionarios = await fetchData("/api/funcionarios");
  const lista = document.getElementById("listaFuncionarios");
  if (lista && funcionarios && Array.isArray(funcionarios)) {
    lista.innerHTML = "";
    funcionarios.forEach((funcionario) => {
      const li = document.createElement("li");
      li.textContent = `${funcionario.displayName}`;

      li.addEventListener("click", () => filtrarChamadosPorFuncionario(funcionario.displayName));

      li.style.cursor = "pointer";

      lista.appendChild(li);
    });
  } else {
    console.error("Erro ao atualizar lista de funcionários");
  }
};

let funcionarioSelecionado = null;

const filtrarChamadosPorFuncionario = (nomeFuncionario) => {
  if (funcionarioSelecionado === nomeFuncionario) {
    resetarFiltros();
    funcionarioSelecionado = null;
    return;
  }

  funcionarioSelecionado = nomeFuncionario;
  const chamados = document.querySelectorAll(".global");

  chamados.forEach((chamado) => {
    const responsavelElement = chamado.querySelector(".bottom .left");
    if (responsavelElement) {
      const responsavelTexto = responsavelElement.textContent;
      const responsavelNome = responsavelTexto.replace("Responsável: ", "");

      if (responsavelNome === nomeFuncionario) {
        chamado.style.display = "block";
      } else {
        chamado.style.display = "none";
      }
    }
  });

  const selectPrioridade = document.getElementById("filtroPrioridade");
  if (selectPrioridade) {
    selectPrioridade.value = "todas";
  }

  const inputFiltro = document.getElementById("filtroNome");
  if (inputFiltro) {
    inputFiltro.value = nomeFuncionario;
  }
};

const resetarFiltros = () => {
  const chamados = document.querySelectorAll(".global");
  chamados.forEach((chamado) => {
    chamado.style.display = "block";
  });

  const selectPrioridade = document.getElementById("filtroPrioridade");
  const selectServidor = document.getElementById("filtroServidor");
  const inputFiltro = document.getElementById("filtroNome");

  if (selectPrioridade) selectPrioridade.value = "todas";
  if (selectServidor) selectServidor.value = "todos";
  if (inputFiltro) inputFiltro.value = "";

  funcionarioSelecionado = null;
};

const determinarServidor = (responsavel) => {
  switch (responsavel.trim()) {
    case "Ilys Gomes Maroto":
      return "1";
    case "Diego Crispim dos Santos Campos":
      return "2";
    case "Alexandre Vasconcelos Nichio Junior":
      return "3";
    default:
      return "N/A";
  }
};

const atualizarListaChamados = async () => {
  const chamados = await fetchData("/api/getIssues");
  const chamadosContainer = document.getElementById("listaChamados");

  if (chamadosContainer && chamados && Array.isArray(chamados)) {
    chamadosContainer.innerHTML = "";
    chamados.forEach((chamado) => {
      const servidor = determinarServidor(chamado.displayName);

      const data = new Date(chamado.created);
      const hora = data.getHours().toString().padStart(2, "0");
      const minutos = data.getMinutes().toString().padStart(2, "0");
      const dia = data.getDate().toString().padStart(2, "0");
      const mes = (data.getMonth() + 1).toString().padStart(2, "0");
      const dataFormatada = `${hora}:${minutos} de ${dia}/${mes}`;

      const agora = new Date();
      const diferencaEmMinutos = Math.floor((agora - data) / (1000 * 60));
      let tempoPercorrido;
      let unidade;

      if (diferencaEmMinutos >= 60) {
        const horas = Math.floor(diferencaEmMinutos / 60);
        tempoPercorrido = horas;
        unidade = horas === 1 ? "hora" : "horas";
      } else {
        tempoPercorrido = diferencaEmMinutos;
        unidade = diferencaEmMinutos === 1 ? "minuto" : "minutos";
      }

      chamadosContainer.innerHTML += `
          <div class="global" id="${chamado.priority}" data-servidor="${servidor}">
            <div class="top">
              <div class="left">Prioridade: ${chamado.priority}</div>
              <div class="right">Servidor ${servidor}</div>
            </div>
            <div class="central">${chamado.description}</div>
            <div class="bottom">
              <div class="left">Responsável: ${chamado.displayName}</div>
              <div class="right">
                <div class="up">Aberto: ${tempoPercorrido} ${unidade} atrás</div>
                <div class="down"> Criado em: ${dataFormatada}</div>
              </div>
            </div>
          </div>`;
    });
  } else {
    console.error("Erro ao atualizar lista de chamados");
  }
};

const filtrarPorServidor = () => {
  // revisar
  const selectPrioridade = document.getElementById("filtroPrioridade");
  const inputFiltro = document.getElementById("filtroNome");

  if (selectPrioridade) selectPrioridade.value = "todas";
  if (inputFiltro) inputFiltro.value = "";
  funcionarioSelecionado = null;

  const selectServidor = document.getElementById("filtroServidor");
  const servidorSelecionado = selectServidor.value;
  const chamados = document.querySelectorAll(".global");

  chamados.forEach((chamado) => {
    if (servidorSelecionado === "todos") {
      chamado.style.display = "block";
    } else if (chamado.dataset.servidor === servidorSelecionado) {
      chamado.style.display = "block";
    } else {
      chamado.style.display = "none";
    }
  });
};

document.getElementById("filtroServidor").addEventListener("change", filtrarPorServidor);

const filtrarChamadosPorPrioridade = () => {
  const selectPrioridade = document.getElementById("filtroPrioridade");
  const chamados = document.querySelectorAll(".global");
  const filtroSelecionado = selectPrioridade.value;

  chamados.forEach((chamado) => {
    if (filtroSelecionado === "todas") {
      chamado.style.display = "block";
    } else {
      if (chamado.id !== filtroSelecionado) {
        chamado.style.display = "none";
      } else {
        chamado.style.display = "block";
      }
    }
  });
};

const selectPrioridade = document.getElementById("filtroPrioridade");
if (selectPrioridade) {
  selectPrioridade.addEventListener("change", filtrarChamadosPorPrioridade);
}

const filtrarFuncionarios = () => {
  const input = document.getElementById("filtroNome");
  const termo = input.value.toLowerCase();
  const funcionarios = document.querySelectorAll("#listaFuncionarios li");

  funcionarios.forEach((funcionario) => {
    const nome = funcionario.textContent.toLowerCase();
    if (nome.includes(termo)) {
      funcionario.style.display = "flex";
    } else {
      funcionario.style.display = "none";
    }
  });
};

document.getElementById("btnBuscar").addEventListener("click", filtrarFuncionarios);
document.getElementById("filtroNome").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    filtrarFuncionarios();
  }
});

const inicializarDashboard = () => {
  console.log("Iniciou...");

  atualizarIndicadorChamadosAbertos();
  criarGraficoBarra();
  criarGraficoPizza();
  atualizarListaFuncionarios();
  atualizarListaChamados();

  const selectPrioridade = document.getElementById("filtroPrioridade");
  if (selectPrioridade) {
    selectPrioridade.addEventListener("change", filtrarChamadosPorPrioridade);
  }
};

document.addEventListener("DOMContentLoaded", inicializarDashboard);
