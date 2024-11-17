var ranking = false
async function atualizarGrafico() {
    var mes1 = sessionStorage.MINVALUE
    var mes2 = sessionStorage.MAXVALUE
    var data = []
    var categoria = []
    var categoriaNum = []

    fetch(`/dashboard-Diego/coletarDados/${mes1}/${mes2}`, {
        cache: 'no-store',
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(dado => {
            console.log(dado)
            document.getElementById("servidor-alerta").innerHTML = `${dado[0].nomeEquipamento} <span id="qtd-servidor-alerta" style="font-size: 0.6em;"> XX</span><span
                        style="font-size: 0.6em;"> alertas</span>`
            document.getElementById("qtd-servidor-alerta").innerHTML = "/" + dado[0].total_alerta

            if (!ranking){
                document.getElementById("ranking-primeiro").innerHTML = dado[0].nomeEquipamento
                document.getElementById("ranking-primeiro-qtd").innerHTML = dado[0].total_alerta
                document.getElementById("ranking-segundo").innerHTML = dado[1].nomeEquipamento
                document.getElementById("ranking-segundo-qtd").innerHTML = dado[1].total_alerta
                document.getElementById("ranking-terceiro").innerHTML = dado[2].nomeEquipamento
                document.getElementById("ranking-terceiro-qtd").innerHTML = dado[2].total_alerta
                ranking = true
            } else {

            }
        })

    fetch(`/dashboard-Diego/atualizarGrafico/${mes1}/${mes2}`, {
        cache: 'no-store',
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(dado => {
            dado.map(info => {
                data.push(info.qtdAlerta)
                categoria.push(meses[info.mes - 1])
                categoriaNum.push(info.mes)
            })
        })
        .then(() => {
            var x = categoriaNum;
            var y = data;

            var m = (somar(multiplicar(x, y)) - (somar(x) * somar(y)) / x.length) /
                (somar(quadrado(x)) - (somar(x) * somar(x)) / x.length);
            var b = media(y) - m * media(x);

            var total = somar(data)

            document.getElementById("alerta-info").innerHTML = total

            var r2 = (calcularR2(x, y) * 100).toFixed()

            if (r2 != "NaN") {
                document.getElementById("previsao").innerHTML = `${(m * 13 + b).toFixed()}<span id="rquadrado"></span>`
                document.getElementById("rquadrado").innerHTML = ` / Precisão: ${r2}%`
            } else {
                document.getElementById("previsao").innerHTML = `<span id="rquadrado">Dados insuficientes</span>`
            }


            document.getElementById("chart").innerHTML = ""
            var options = {
                series: [{
                    name: 'Alertas',
                    data: data
                }],
                chart: {
                    type: 'bar',
                    height: 300,
                    width: 505,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                colors: ['#ffdc60'],
                title: {
                    text: 'Quantidade de alertas no período selecionado',
                    align: 'center',
                    style: {
                        color: 'white'
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#000'],
                        fontSize: '12px',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    }
                },
                stroke: {
                    show: false,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: categoria,
                    labels: {
                        style: {
                            colors: Array(categoria.length).fill('white'),
                            weight: 400
                        }
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: Array(categoria.length).fill('#696969')
                        },
                    },
                    min: 0,
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " alertas"
                        },
                        title: {
                            formatter: function (seriesName) {
                                return seriesName + ':';
                            },
                            style: {
                                color: '#fff'
                            }
                        }
                    },
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                        color: '#fff'
                    },
                    theme: 'dark'
                }
            };
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

        })
}


fetch(`/dashboard-Diego/atualizarGrafico/${1}/${12}`, {
    cache: 'no-store',
    method: "GET",
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(dado => {
        var total_alerta = 0
        dado.map(info => {
            total_alerta += info.qtdAlerta
        })
        document.getElementById("alerta-total").innerHTML = total_alerta
    })


function graficoDetails() {
    var dados = []
    var dias = []
    var mes = document.getElementById("slc_mes").value

    fetch(`/dashboard-Diego/graficoDetails/${mes}`, {
        cache: 'no-store',
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(dado => {
            dado.map(info => {
                dados.push(info.qtdAlerta)
                dias.push(info.dia)
            })
        })
        .then(() => {

            document.getElementById("chartDetails").innerHTML = ""
            
            var options = {
                series: [{
                    name: 'Alertas',
                    data: dados
                }],
                chart: {
                    type: 'bar',
                    height: 375,
                    width: 600,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                colors: ['#ffdc60'],
                title: {
                    text: 'Quantidade de alertas por dia no mês selecionado',
                    align: 'center',
                    style: {
                        fontWeight: '400',
                        fontSize: '2em',
                        color: 'white'
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#000'],
                        fontSize: '12px',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    }
                },
                stroke: {
                    show: false,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: dias,
                    labels: {
                        style: {
                            colors: Array(dias.length).fill('white'),
                            weight: 400
                        }
                    },
                    title: {
                        text: 'Dia',
                        align: 'center',
                        style: {
                            color: 'white'
                        }
                    },
                    min: 1,
                    max: 30,
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: Array(dias.length).fill('#696969')
                        },
                    },
                    min: 0,
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    x: {
                        formatter: function (val) {
                            return "Dia: " + val; // Personalize o título com "Data: " ou outro texto
                        }
                    },
                    y: {
                        formatter: function (val) {
                            return val + " alertas"
                        },
                        title: {
                            formatter: function (seriesName) {
                                return seriesName + ':';
                            },
                            style: {
                                color: '#fff'
                            }
                        }
                    },
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                        color: '#fff'
                    },
                    theme: 'dark'
                }
            };
            var chartDetails = new ApexCharts(document.querySelector("#chartDetails"), options);
            chartDetails.render();
        })
}


function multiplicar(x, y) {
    var ret = [];
    for (var i = 0; i < x.length; i++)
        ret.push(x[i] * y[i]);
    return ret;
}

function quadrado(x) {
    var ret = [];
    for (var i = 0; i < x.length; i++)
        ret.push(x[i] * x[i]);
    return ret;
}

function somar(x) {
    var ret = 0;
    for (var i = 0; i < x.length; i++)
        ret += x[i];
    return ret;
}

function media(x) {
    return somar(x) / x.length;
}

function calcularR2(x, y) {
    const n = x.length;
    const mediaX = media(x);
    const mediaY = media(y);

    let numerador = somar(multiplicar(
        x.map(xi => xi - mediaX),
        y.map(yi => yi - mediaY)
    ));

    let somaQuadradoX = somar(quadrado(x.map(xi => xi - mediaX)));
    let somaQuadradoY = somar(quadrado(y.map(yi => yi - mediaY)));
    const denominador = Math.sqrt(somaQuadradoX * somaQuadradoY);

    const r = numerador / denominador;

    const r2 = Math.pow(r, 2)
    sessionStorage.r2 = r2;
    return r2;
}