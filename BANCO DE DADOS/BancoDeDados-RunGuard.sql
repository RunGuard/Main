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
sistemaOperacional varchar(45),
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
(default, 'Uber', '123123123'),
(default, '99 Táxi', '18321371');

insert into equipamento values
(default, 'M1', 1),
(default, 'M2', 1),
(default, 'M3', 1),
(default, 'M4', 1);

select * from dado;

CREATE VIEW Monitoramento as
SELECT 
    d.idDado AS ID,
    CONCAT(d.cpuPercent, "%") AS "Porcentagem CPU",
    CONCAT(d.memoriaPercent, "%") AS "Porcentagem Memoria",
    CONCAT(d.memoriaUsada, "GB") AS "Memoria usada",
    d.dtHora AS "Data",
    e.nomeEquipamento AS Equipamento
FROM 
    dado as d
JOIN 
    equipamento as e ON d.fkEquipamento = e.idEquipamento;

SELECT * FROM Monitoramento;

SELECT * FROM dado;
select * from empresa;

select * from usuario;