const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "vuePortal",
});

conn.connect(function (error) {
	if (error) {
		throw error;
	} else {
		console.log("Conexion a base de datos realizada con exito.");
	}
});

app.get("/", function (req, res) {
	res.send("Home route");
});

app.get("/api/articulos", (req, res) => {
	conn.query("SELECT * FROM articulos", (error, filas) => {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

app.get("/api/articulos/:id", (req, res) => {
	conn.query(
		"SELECT * FROM articulos WHERE id=?",
		[req.params.id],
		(error, fila) => {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

app.post("/api/articulos", (req, res) => {
	let data = {
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		stock: req.body.stock,
	};
	let sql = "INSERT INTO articulos SET ?";
	conn.query(sql, data, (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

app.put("/api/articulos/:id", (req, res) => {
	let id = req.params.id;
	let descripcion = req.body.descripcion;
	let precio = req.body.precio;
	let stock = req.body.stock;

	let sql = "UPDATE articulos SET descripcion=?,precio=?,stock=? where id=?";
	conn.query(sql, [descripcion, precio, stock, id], (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

app.delete("/api/articulos/:id", (req, res) => {
	conn.query(
		"DELETE FROM articulos WHERE id=?",
		[req.params.id],
		(error, results) => {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

//$env:PUERTO=7000
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
	console.log("Sevicio Iniciado en el puerto: " + puerto);
});

/**
 * 
 * INSERT INTO articulos ('id', 'descripcion', 'precio', 'stock') VALUES

(1, 'Harina eee - 3 KG', 150.00, 50),
(2, 'Fanta naranja', 86.00, 10),
(3, 'vino Malbec', 252.00, 42),
(4, 'Azucar - 3 KG', 450.00, 20),
(6, 'Leche entera sancor', 89.00, 36),
(7, 'Dulce de leche Sancor', 99.00, 50),
(8, 'Queso cremoso', 250.00, 60);
 */
