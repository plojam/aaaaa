import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.page.html',
  styleUrls: ['./deposito.page.scss'],
})
export class DepositoPage implements OnInit {
  cedulaR: String;
  cedulaE: String;
  cantidad: String;
  res:any;
  bancoS: String
  bancoE: number
  bancoR: number
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  transferencia(){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log("entra transferencia")
    if(this.bancoS == "bA"){
      this.bancoE = 1
      this.bancoR = 2
      this.http.put('http://192.168.40.136:5000/depositar/'+this.cedulaE+"/"+this.cantidad,headers).subscribe((response)=>{console.log(response)});
      this.http.put('http://192.168.40.136:5001/retirar/'+this.cedulaR+"/"+this.cantidad,headers).subscribe((response)=>{console.log(response)});
    }else if(this.bancoS == "bP"){
      this.bancoE = 2
      this.bancoR = 1
      this.http.put('http://192.168.40.136:5000/retirar/'+this.cedulaE+"/"+this.cantidad,headers).subscribe((response)=>{console.log(response)});
      this.http.put('http://192.168.40.136:5001/depositar/'+this.cedulaR+"/"+this.cantidad,headers).subscribe((response)=>{console.log(response)});

    }
    console.log("Datos : " + this.cedulaE + this.cedulaR + this.cantidad + this.bancoE);
  }

}
