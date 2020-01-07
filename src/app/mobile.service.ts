import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';
const url='http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class MobileService {

  elements: any = {};
  searchResult: any = {};


  constructor(private http: HttpClient, public local: LocalStorageService) { }

  private userName = new BehaviorSubject('');
  private logOut = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();
  logOutStatus = this.logOut.asObservable();  

  signup(signupData) {
    return this.http.post("http://localhost:3000/signupUser", signupData);
  }

  login(loginData) {
    return this.http.post("http://localhost:3000/login", loginData);
  }

  showProducts(userId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/products/showproducts", { userId: userId }, options);
  }

  deleteItem(userId, itemId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/products/deleteItem", { userId: userId, itemId: itemId }, options);
  }

  updateItem(userId, productCategory, productName, productPrice,
    productCamera,productMemory,productProcessor,productAvailability,
    productColor,productBrand,productDescription , Token) {
        let options = this.createHeaders(Token);
        let itemId = this.local.get('itemId')
        return this.http.post(url+"/products/editItem", { productCategory:productCategory, productName:productName, productPrice:productPrice,
        productCamera:productCamera,productMemory:productMemory,productProcessor:productProcessor,productAvailability:productAvailability,
        productColor:productColor,productBrand:productBrand,userId:userId,productDescription:productDescription,itemId: itemId }, options);
  }

  filter(userId, Token,category) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/products/filter", { userId: userId , category:category}, options);
  }

  addItem(product, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/products/addItem", product, options);
  }

  itemFetch(userId, itemId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/products/itemFetch", { userId: userId, itemId: itemId }, options);
  }
  
  showUsers(userId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/signupUser/users", { userId: userId }, options);
  }

  deleteUser(userId, Id, Token) {
    let options = this.createHeaders(Token);
    return this.http.post(url+"/signupUser/deleteItem", { userId: userId, itemId: Id }, options);
  }

  changeUserName(name: string, logout: string) {
    this.userName.next(name);
    this.logOut.next(logout);
  }

  uploadImage(picture, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("https://foodcourtbackend.herokuapp.com/restaurant/image", picture, options);
  }

  createHeaders(Token) {  
    let headers = new HttpHeaders({
      'contetnt-Type': 'application/json',
      'Authorization': "Token " + Token
    });
    let options = { headers: headers }
    return options;
  }

  public getLocalStorage() {
    this.elements.Token = this.local.get("Token");
    this.elements.userId = this.local.get("userId");
    this.elements.name = this.local.get("name");
    this.elements.userType = this.local.get("userType");
    return this.elements;
  }

  public setLocalStorage(elements) {
    this.local.set("Token", elements.Token);
    this.local.set("userId", elements.userId);
    this.local.set("name", elements.name);
    this.local.set("userType", elements.userType);
  }

  public clearLocalStorage() {
    this.local.clear();
    this.elements = {};
    this.searchResult = {};
  }

  getDataPresent() {
    return this.searchResult;
  }
  setDataPresent(data, count,totalDocs,searchKey,fieldType,forwardMove,backwardMove) {
    this.searchResult.restaurants = data;
    this.searchResult.count = count;
    this.searchResult.totalDocs=totalDocs;
    this.searchResult.searchKey=searchKey;
    this.searchResult.fieldType=fieldType;
    this.searchResult.forwardMove=forwardMove;
    this.searchResult.backwardMove=backwardMove;
  }
}
