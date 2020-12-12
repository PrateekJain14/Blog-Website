import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor() { }
  sucess(string) {
    $(
      "#snackbar"
    ).remove()

    $("body").append(`<div id="snackbar" class="sucessbg"   >${string}</div>`)
    var x = document.getElementById("snackbar");
    $("#snackbar").addClass("show")
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    },
      3000);

  }



  error(string) {
    $(
      "#snackbar"
    ).remove()

    $("body").append(`<div id="snackbar" class="errorbg"   >${string}</div>`)
    var x = document.getElementById("snackbar");

    $("#snackbar").addClass("show")
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    },
      3000);

  }

}
