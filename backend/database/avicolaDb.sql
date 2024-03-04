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
    contrasenia varchar(20),
    foreign key (id_rol) references rol (id) on delete cascade on update cascade
);
insert into perfil (nombre, apellido_paterno, apellido_materno, direccion, telefono, email, estado, id_rol, contrasenia )values 
('Juan', 'Perez','Lopez', 'av.mirador', 7894632,'asd@.gmail.com', true,3, 'clases');

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

-- id_perfil compara si es igual al id de perfil si son iguales asigna la contrasenia
-- el update indica a q id de la tabla perfil se asigna la contrasenia no todos los 
-- empleados pueden ser administrador
insert into perfil_contrasenia(contrasenia, id_perfil) values
('clase', 3);
UPDATE perfil
SET contrasenia = 'amosis'
WHERE id = 1;

create table produccion(
    id int AUTO_INCREMENT primary key,
    galpones int,
    alimentos varchar(20),
    pollos_de_engorde int,
    medicinas varchar(20),
    id_alimento int,
    id_galpon int,
    id_medicina int,
    id_lote int,
    id_perfil int,
    id_peso int,
    id_gastos int,
    foreign key (id_alimento) references alimento (id),
    foreign key (id_galpon) references galpon (id),
    foreign key (id_medicina) references medicina (id),
    foreign key (id_lote) references lote(id),
    foreign key (id_perfil) references perfil (id),
    foreign key (id_empleado) references empleado(id),
    foreign key (id_mortalidad) references mortalidad(id),
    foreign key (id_peso) references peso(id),
    foreign key (id_gastos) references gastos(id),

);

create table alimento(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(40),
    precio float,
    cantidad int,
);
create table galpon(
    id int AUTO_INCREMENT PRIMARY KEY,
    num_gallina int not null,
    capacidad int,
    disponible BOOLEAN,
    
);
create table medicina(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(60),
    via varchar(20),
    num_dosis int,
    precio float,
    cantidad int,
);

create table lote(
    id int AUTO_INCREMENT PRIMARY KEY,
    raza varchar (20),
    fecha_ingreso timestamp default current_timestamp,
    cantidad int,
    valor_unidad decimal(10,2)
);

create table mortalidad(
    id int AUTO_INCREMENT PRIMARY KEY,
    cantidad     int,
    causa           varchar(50),    
    descripcion      varchar(80),
    fecha_registro_muerte timestamp default current_timestamp,
);
create table gastos( 
id int AUTO_INCREMENT PRIMARY KEY,
detalle VARCHAR(80),
fecha_gasto  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
importe DECIMAL(10,2)   
);

create table peso(
id int auto_increment primary key,
peso_promedio decimal (10,2),
fecha_medicion timestamp default current_timestamp
);