CREATE DATABASE IF NOT exists avicoladb;
USE avicoladb;  
create table perfil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido_paterno VARCHAR(255),
    apellido_materno VARCHAR(255),
    direccion varchar(100),
	telefono varchar(15),
	email varchar(50),
	estado BOOLEAN,
	fecha_creacion timestamp default current_timestamp,
	fecha_update timestamp default current_timestamp on update current_timestamp,
    id_rol int,
    foreign key (id_rol) references rol (id) on delete cascade on update cascade
);
insert into perfil (nombre, apellido_paterno, apellido_materno, direccion, telefono, email, estado, id_rol )values 
('Juan', 'Perez','Lopez', 'av.mirador', 7894632,'asd@.gmail.com', true,2,'amosis');

create table rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo varchar(20)
);
insert into rol (tipo) values
('proveedor'),
('cliente'),
('administrador'),
('empleado');

create table insumo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_insumo varchar(20),
    precio_unitario float(10,2)
    id_perfil INT,
    foreign key (id_perfil) references perfil (id) on delete cascade on update cascade
);
insert into insumo (nombre_insumo, precio_unitario, id_perfil) values
('grano', 10 , 1 ),
('trigo', 15, 1 ),
('arroz', 10, 1 ),
('frijol', 1520, 1 );


create table detalle_compra(
    id int AUTO_INCREMENT primary key,
    cantidad int,
    subtotal int,
    id_insumo int,
    foreign key (id_insumo) references insumo (id) on delete cascade on update cascade,
    id_registro_compra int,
    foreign key (id_registro_compra )references registro_compra (id) on delete cascade on update cascade
);

insert into detalle_compra (cantidad , subtotal , id_insumo ,id_registro_compra) values
(1,  10,   4,    7),
(2,  20,   20,   8),
(3,  30,   21,   9);


create table registro_compra(
    id int auto_increment primary key ,
    total int,
    id_perfil int,
    foreign key (id_perfil) references perfil (id) on delete cascade on update cascade
);
insert into registro_compra (total, id_perfil) values
(50,     1),
(100,    1),
(150,    1);

create table perfil_contrasenia (
    id int auto_increment primary key,
    contrasenia varchar(20),
    id_perfil int,
    foreign key (id_perfil) references perfil (id) on delete cascade on update cascade
);
insert into perfil_contrasenia(contrasenia, id_perfil) values
('clase', 3);
-- id_perfil compara si es igual al id de perfil si son iguales asigna la contrasenia
-- el update indica a q id de la tabla perfil se asigna la contrasenia no todos los 
-- empleados pueden ser administrador
UPDATE perfil
SET contrasenia = 'amosis'
WHERE id = 1;

