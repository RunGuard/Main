-- CRIAÇÃO DE DATABASE
drop database if exists runguard;
create database runguard;
use runguard;



-- CRIAÇÃO DE TABELAS
create table empresa (
idEmpresa int primary key auto_increment,
nome_empresa varchar(45)
);

create table usuario (
idUsuario int primary key auto_increment,
nome_usuario varchar(45),
email_usuario varchar(45) unique,
senha_usuario varchar(45),
codigo int,
fkEmpresa_usuario int,
    constraint fkEmpresaUsuario foreign key (fkEmpresa_usuario) references empresa (idEmpresa)
);

select * from usuario;

create table equipamento (
idEquipamento int primary key auto_increment,
nome_equipamento varchar(45),
fkEmpresa_equipamento int,
    constraint fkEmpresaEquipamento foreign key (fkEmpresa_equipamento) references empresa (idEmpresa)
);

create table dados (
idDados int primary key auto_increment,
cpu_porcent decimal(20,1),
memoria_porcent decimal(20,1),
memoria_usada decimal(20,1),
dtHora datetime default current_timestamp,
fkEquipamento int,
    constraint fkEquipamentoDados foreign key (fkEquipamento) references equipamento (idEquipamento)
);

insert into empresa values
(default, 'Uber'),
(default, '99 Táxi');

insert into equipamento values
(default, 'M1', 1),
(default, 'M2', 1),
(default, 'M3', 1),
(default, 'M4', 1);

select * from dados;

CREATE VIEW Monitoramento as
SELECT 
    d.idDados AS ID,
    CONCAT(d.cpu_porcent, "%") AS "Porcentagem CPU",
    CONCAT(d.memoria_porcent, "%") AS "Porcentagem Memoria",
    CONCAT(d.memoria_usada, "GB") AS "Memoria usada",
    CONCAT(d.disco_porcent_usado, "%") AS "Porcentagem de Disco Usada",
    d.dtHora AS "Data",
    e.nome_equipamento AS Equipamento
FROM 
    dados as d
JOIN 
    equipamento as e ON d.fkEquipamento = e.idEquipamento;

SELECT * FROM Monitoramento;

SELECT * FROM dados;

select * from usuario;