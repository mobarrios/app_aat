import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DataBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataBaseProvider {

  // public properties
  db: SQLiteObject = null;

  constructor() {}

  // public methods
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(task: any){
    let sql = 'INSERT INTO users(token, club) VALUES(?,?)';
    return this.db.executeSql(sql, ['dasdsa', 'elclu']);
  }

  

  // createTable(){
  //   //let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT, club TEXT)';
  //   // return this.db.executeSql(sql, []);
  //    this.createTableEncuentros();
  //    this.createTableEncuentrosJugadores();
  //   // this.createTableEncuentrosResultados();
  //   // this.createTableJugadores();
  //    this.createTableUsers();
  // }

  delete(task: any){
    let sql = 'DELETE FROM users WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM users';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(task: any){
    let sql = 'UPDATE users SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  createTableUsers(){
    let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT ,token TEXT, club TEXT, expiration DATE ,username TEXT)';
    return this.db.executeSql(sql, []);
  }

  createTableEncuentros(){
    let sql = 'CREATE TABLE IF NOT EXISTS encuentros(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, encuentro_id INTEGER, club_local_id INTEGER, club_local_nombre TEXT , club_visita_id INTEGER, club_visita_nombre TEXT, campeonato TEXT, categoria TEXT, division TEXT , fecha DATE)';
    return this.db.executeSql(sql, []);
  }

  createTableEncuentrosJugadores(){
    let sql = 'CREATE TABLE IF NOT EXISTS encuentros_jugadores(id INTEGER PRIMARY KEY AUTOINCREMENT, encuentro_id INTEGER, lv TEXT , partido TEXT, jugador_id INTEGER, jugador_nombre TEXT)';
    return this.db.executeSql(sql, []);
  }

  createTableJugadores(){
    let sql = 'CREATE TABLE IF NOT EXISTS jugadores(id INTEGER PRIMARY KEY AUTOINCREMENT, id_jugador INTEGER, dni INTEGER, nombre TEXT, apellido TEXT)';
    return this.db.executeSql(sql, []);
  }


  createTableEncuentrosResultados(){
    let sql = 'CREATE TABLE IF NOT EXISTS encuentros_resultados(id INTEGER PRIMARY KEY AUTOINCREMENT, encuentro_id INTEGER, lv TEXT, partido TEXT ,n_set INTEGER, puntos INTEGER)';
    return this.db.executeSql(sql, []);
  }

}
