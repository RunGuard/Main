-- CRIAÇÃO DE DATABASE
DROP DATABASE IF EXISTS runguard;
CREATE DATABASE runguard;
USE runguard;

-- CRIAÇÃO DE TABELAS
CREATE TABLE empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
cnpj char(18)
);

CREATE TABLE usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
cpf varchar(14),
cargo varchar(45),
fkEmpresa int,
    constraint fkEmpresaUsuario foreign key (fkEmpresa) references empresa (idEmpresa)
);

CREATE TABLE equipamento (
idEquipamento int primary key auto_increment,
nomeEquipamento varchar(45),
cpuVersao varchar(255),
memoriaRam varchar(45),
SistemaOperacional varchar(45),
fkEmpresa int,
    constraint fkEmpresaEquipamento foreign key (fkEmpresa) references empresa (idEmpresa)
);

CREATE TABLE dado (
idDado int primary key auto_increment,
cpuPercent double,
memoriaPercent double,
memoriaUsada double,
bytes_recebidos Bigint,
bytes_enviados Bigint,
pacotes_recebidos double,
pacotes_enviados double,
ping int,
dtHora datetime default current_timestamp,
fkEquipamento int,
    constraint fkEquipamentoDados foreign key (fkEquipamento) references equipamento (idEquipamento)
);
INSERT INTO dado (
    cpuPercent, 
    memoriaPercent, 
    memoriaUsada, 
    bytes_recebidos, 
    bytes_enviados, 
    pacotes_recebidos, 
    pacotes_enviados, 
    ping, 
    fkEquipamento
)
VALUES 
(85.5, 95.0, 1, 5, 5, 9, 9, 150, 5); -- Exemplo de registro fora dos limites



select * from dado whereS fkEquipamento = 5	;
SELECT 
            bytes_recebidos, 
            bytes_enviados, 
            pacotes_recebidos, 
            pacotes_enviados, 
            cpuPercent AS usoCPU, 
            ping, 
            DATE_FORMAT(dtHora, '%H:%i:%s') AS horario
        FROM dado
        WHERE fkEquipamento = fkEquipamento
        ORDER BY dtHora DESC 
        LIMIT 50;
CREATE TABLE alerta (
idAlerta int primary key auto_increment,
resumo varchar(256),
descricao varchar(256),
dtHora datetime default current_timestamp
);

CREATE TABLE informacaoAlerta (
idInformacao int auto_increment,
fkDado int,
fkAlerta int,
componenteAlerta varchar(45),
statusAlerta varchar(45),
    constraint fkDado foreign key (fkDado) references dado (idDado),
    constraint fkAlerta foreign key (fkAlerta) references alerta (idAlerta),
    constraint primaryKey primary key (idInformacao, fkDado, fkAlerta)
);

INSERT INTO empresa VALUES
(default, 'Uber',111111111111111111),
(default, '99 Táxi',222222222222222222);

INSERT INTO equipamento VALUES
(default, 'M1', 1,8,'Windows',1),
(default, 'M2', 1,8,'Windows',2),
(default, 'M3', 1,8,'Ubuntu',1),
(default, 'M4', 1,8,'Linux',2);

CREATE VIEW Monitoramento AS
SELECT 
    d.idDado AS ID,
    CONCAT(d.cpuPercent, "%") AS "Porcentagem CPU",
    CONCAT(d.memoriaPercent, "%") AS "Porcentagem Memoria",
    CONCAT(d.memoriaUsada, "GB") AS "Memoria usada",
    CONCAT(d.bytes_recebidos, "") AS "Bytes recebidos",
    CONCAT(d.bytes_enviados, "") AS "Bytes enviados",
    CONCAT(d.pacotes_recebidos, "") AS "Pacotes recebidos",
    CONCAT(d.pacotes_enviados, "") AS "Pacotes enviados",
    CONCAT(d.ping, "ms") AS "Latência",
   
    d.dtHora AS "Data",
    e.nomeEquipamento AS Equipamento
FROM 
    dado AS d
JOIN 
    equipamento AS e ON d.fkEquipamento = e.idEquipamento;


-- CRIPTOGRAFIA - Explicação de como funciona
-- MUDA O DELIMITADOR DE ';' PARA '$$', POIS DENTRO DE UMA FUNÇÃO HÁ MUITAS ULTILIZAÇÕES DE ';'
DELIMITER $$

-- CRIAÇAÕ DA FUNÇÃO 'criptografia' QUE RECEBE UM TEXTO E UMA CHAVE E RETORNA O TEXTO CRIPTOGRAFADO
CREATE FUNCTION criptografia(texto VARCHAR(255), chave INT)
RETURNS VARCHAR(255) -- DEFINE OQ A FUNÇÃO RETORNA  (texto de até 255 caracteres)
DETERMINISTIC -- DEFINE QUE A A FUNÇÃO É DETERMINISTICA  (para mesmas entradas, mesmos resultados)
BEGIN
    DECLARE resultado VARCHAR(255) DEFAULT ''; -- VAR PARA ARMAZENAR O RESULTADO
    DECLARE i INT DEFAULT 1; -- CONT PARA PERCORRER O TEXTO
    DECLARE caracter_atual CHAR(1); -- VAR PARA ARMAZERNAR O CHAR ATUAL
    DECLARE trocar_valor INT DEFAULT 0; -- VAR PARA ARMAZERNAR O VALOR DO DESLOCAMENTO (cifra)

    -- INVERTE O TEXTO
    SET texto = REVERSE(texto);

    -- LOOP PARA PERCORRER CADA CHAR DO TEXTO
    WHILE i <= LENGTH(texto) DO
        -- EXTRAI O CHAR ATUAL DO TEXTO
        SET caracter_atual = SUBSTRING(texto, i, 1); 
        
        -- GERA UM VALOR DE DESLCAMENTO BASEADO NA CHAVE E ÍNDICE DO CHAR
        SET trocar_valor = (ASCII(caracter_atual) + chave + i) % 95;

        -- CONCATENA O CHAR CRIPTOGRAFADO NO RESULTADO
        SET resultado = CONCAT(resultado, CHAR(32 + trocar_valor));
        
        -- INCREMENTA O CONTADOR PARA O PRÓXIMO CHAR
        SET i = i + 1;
    END WHILE;

    -- RETORNA O TEXTO CRIPTOGRAFADO
    RETURN resultado; 
END$$

-- CRIAÇÃO DE UM TRIGGER QUE CRIPTOGRAFA A SENHA ANTES DO INSERT NA TABELA
CREATE TRIGGER criptografia_para_insersao
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    -- CRIPTOGRAFA A SENHA ANTES DE INSERIR O NOVO REGISTRO
    SET NEW.senha = criptografia(NEW.senha,5);
END$$

-- CRIAÇÃO DE UM TRIGGER QUE CRIPTOGRAFA A SENHA ANTES DE UM UPDATE NA TABELA
CREATE TRIGGER criptografia_na_atualizacao
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
    -- CRIPTOGRAFA A SENHA ANTES DE ATUALIZAR O NOVO REGISTRO
    SET NEW.senha = criptografia(NEW.senha,5);
END$$

SELECT 
    *
FROM
    Monitoramento;
SELECT * FROM dado WHERE fkEquipamento = 5;
