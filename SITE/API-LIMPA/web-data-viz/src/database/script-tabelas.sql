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

create table equipamento (
idEquipamento int primary key auto_increment,
nomeEquipamento varchar(45),
cpuVersao varchar(45),
memoriaRam varchar(45),
SistemaOperacional varchar(45),
fkEmpresa int,
    constraint fkEmpresaEquipamento foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table dados (
idDado int primary key auto_increment,
cpuPercent double,
memoriaPercent double,
memoriaUsada double,
dtHora datetime default current_timestamp,
fkEquipamento int,
    constraint fkEquipamentoDados foreign key (fkEquipamento) references equipamento (idEquipamento)
);

CREATE VIEW Monitoramento AS
SELECT 
    dadosMonitoramento.idDado AS ID,
    CONCAT(dadosMonitoramento.cpuPercent, "%") AS "Porcentagem CPU",         -- Porcentagem de uso da CPU
    CONCAT(dadosMonitoramento.memoriaPercent, "%") AS "Porcentagem Memória", -- Porcentagem de uso da memória
    CONCAT(dadosMonitoramento.memoriaUsada, " GB") AS "Memória Usada",       -- Memória usada em GB
    dadosMonitoramento.dtHora AS "Data",                                     -- Data e hora da coleta
    equipamento.nomeEquipamento AS "Equipamento"                             -- Nome do equipamento monitorado
FROM 
    dados AS dadosMonitoramento                                               -- Tabela de dados
JOIN 
    equipamento AS equipamento ON dadosMonitoramento.fkEquipamento = equipamento.idEquipamento;  -- Junção com a tabela de equipamentos

insert into usuario values
(default, "Teste", "Teste@gmail.com", "12345", "11111111111", "Técnico de Infraestrutura", 1);

insert into empresa values
(default, 'Uber', '111.111.111/0001-1'),
(default, '99 Táxi', '111.111.111/0001-2');

insert into equipamento values
(default, 'M1', "Teste", "10GB", "Windows", 1);

INSERT INTO dados VALUES 
(default, 90, 20, 10, default, 1);

select * from usuario;
select * from empresa;
select * from equipamento;
select * from dados;