CREATE TABLE alerta (
idAlerta varchar(256) primary key,
idProjeto varchar(256),
tipoItem varchar(256),                            
resumo varchar(256),
descricao varchar(256),                             
responsavel varchar(256),
relator varchar(256),
prioridade varchar(256),
dtHora datetime default current_timestamp,
ultimaAtualizacao datetime
);

CREATE TABLE informacaoAlerta (
idInformacao int auto_increment,
fkDado int,
fkAlerta int,
componenteAlerta varchar(45),
tempoResolucao time,
statusAlerta varchar(45),
    constraint fkDado foreign key (fkDado) references dado (idDado),
    constraint fkAlerta foreign key (fkAlerta) references alerta (idAlerta),
    constraint primaryKey primary key (idInformacao, fkDado, fkAlerta)
);