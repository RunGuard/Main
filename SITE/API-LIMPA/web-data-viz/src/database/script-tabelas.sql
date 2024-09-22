-- CRIAÇÃO DE DATABASE
drop database if exists runguard;
create database runguard;
use runguard;

-- CRIAÇÃO DE TABELAS
create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
cnpj char(18)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
cpf varchar(14),
cargo varchar(45),
fkEmpresa int,
    constraint fkEmpresaUsuario foreign key (fkEmpresa) references empresa (idEmpresa)
);

select * from usuario;

create table equipamento (
idEquipamento int primary key auto_increment,
nomeEquipamento varchar(45),
cpuVersao varchar(45),
memoriaRam varchar(45),
SistemaOperacional varchar(45),
fkEmpresa int,
    constraint fkEmpresaEquipamento foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table dado (
idDado int primary key auto_increment,
cpuPercent double,
memoriaPercent double,
memoriaUsada double,
dtHora datetime default current_timestamp,
fkEquipamento int,
    constraint fkEquipamentoDados foreign key (fkEquipamento) references equipamento (idEquipamento)
);

insert into empresa values
(default, 'Uber', '111/232/2232-11'),
(default, '99 Táxi', '111/111/1113-22');

insert into equipamento values
(default, 'M1', 1),
(default, 'M2', 1),
(default, 'M3', 1),
(default, 'M4', 1);

select * from dado;

CREATE VIEW Monitoramento AS
SELECT 
    dadosMonitoramento.idDado AS ID,
    CONCAT(dadosMonitoramento.cpuPercent, "%") AS "Porcentagem CPU",         -- Porcentagem de uso da CPU
    CONCAT(dadosMonitoramento.memoriaPercent, "%") AS "Porcentagem Memória", -- Porcentagem de uso da memória
    CONCAT(dadosMonitoramento.memoriaUsada, " GB") AS "Memória Usada",       -- Memória usada em GB
    dadosMonitoramento.dtHora AS "Data",                                     -- Data e hora da coleta
    equipamento.nomeEquipamento AS "Equipamento"                             -- Nome do equipamento monitorado
FROM 
    dado AS dadosMonitoramento                                               -- Tabela de dados
JOIN 
    equipamento AS equipamento ON dadosMonitoramento.fkEquipamento = equipamento.idEquipamento;  -- Junção com a tabela de equipamentos