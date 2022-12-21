-- 1)

create database mibase;
use mibase;


-- 2)

CREATE TABLE usuario(id int unsigned not null auto_increment, nombre varchar(50) not null,apellido varchar(50) not null, edad int unsigned, email varchar(50) not null, primary key(id));


-- 3)

insert into usuario (nombre, apellido, edad, email) values ("Alan", "Ferro", 12, "jm@hotmail.com"), 	("Nico", "Marini", 17, "seve@gmail.com"), ("lolo", "seve", 11, "holaferro@live.com.ar")

-- 4)

select * from usuario;


-- 5)

delete from usuario	where id = 3;


-- 6)

update usuario set edad = 24 where id = 1; 


