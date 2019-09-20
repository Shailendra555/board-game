import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  rows = 0;
  columns = 0;
  selectedCell = '';

  ngOnInit() {
    var rows = +window.prompt("Please enter rows", '10' );
    var columns = +window.prompt("Please enter columns", '10' );
    if(!rows || rows < 8 || !columns || columns < 8){
      rows = columns = 8;
      alert('Rows and Columns set to 8x8');
    }
    this.rows = rows;
    this.columns = columns;
    this.createBoard(rows, columns);
    this.setUserDefaultPosition(rows, columns);
    this.setRandomQueens(rows, columns);
  }


  @ViewChild('container', {static: true}) container: ElementRef;
  createBoard(rows, columns){
    var d1 = this.container.nativeElement;
    for(let i = 1 ; i <= rows ; i++){
      for(let j = 1; j <= columns; j++){
          let x  = document.createElement('span');
          x.setAttribute('id', 'cell-'+i+ '-' +j)
          x.setAttribute("class", "cell" );
          d1.appendChild(x);
      }
      let _break = document.createElement('br');
      d1.appendChild(_break);
    }
  }

    userPosition = 'cell-'+1+'-'+1;
    userDiv;
    setUserDefaultPosition(rows, columns){
      let row = Math.floor(rows/2);
      let column = Math.floor(columns/2);
      this.selectedCell = 'cell-'+row+'-'+column;
      let cell = document.getElementById(this.selectedCell);
      cell.classList.add('selected-cell');
      this.userDiv = document.createElement('span');
      this.userDiv.setAttribute('id', 'user');
      this.userDiv.setAttribute('class', 'user-block');
      this.userPosition = this.selectedCell;
      cell.appendChild(this.userDiv);
    }

    setRandomQueens(rows, columns){

      for(let i = 1; i<= rows; i++){
        let col = this.generateRandomNumberBetween(1, columns);

        var cell = document.getElementById('cell-'+i+'-'+col);
        if(cell.childElementCount>0){
          cell = document.getElementById('cell-'+i+'-'+(col+1));
        }
        let queenDiv = document.createElement('span');
      queenDiv.setAttribute('id', 'queen');
      queenDiv.setAttribute('class', 'queen-block');
      cell.appendChild(queenDiv);
      }

    }

    generateRandomNumberBetween(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    totalMoves = 0;
    @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
      this.currentRow = +this.userPosition.split('-')[1];
      this.currentColumn = +this.userPosition.split('-')[2];
        if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
          switch(event.keyCode){
            case 37: {
              // left
              if(this.checkBetweenRange('column', this.currentColumn)){
                if(this.currentColumn !== 1){
                  this.currentColumn -= 1;
                  this.userPosition = 'cell-'+this.currentRow+'-'+this.currentColumn;
                  this.changePositionOfUser(this.userPosition);
                }
              }
              break;
            }
            case 38: {
              // up
              if(this.checkBetweenRange('row', this.currentRow)){
                if(this.currentRow !== 1){
                  this.currentRow -= 1;
                this.userPosition = 'cell-'+this.currentRow+'-'+this.currentColumn;
                this.changePositionOfUser(this.userPosition);
                }
                
              }
              break;
            }
            case 39: {
              //right
              if(this.checkBetweenRange('column', this.currentColumn)){
                if(this.currentColumn !== this.columns){
                  this.currentColumn += 1;
                  this.userPosition = 'cell-'+this.currentRow+'-'+this.currentColumn;
                  this.changePositionOfUser(this.userPosition);
                }

                
              }
              break;
            }
            case 40: {
              // down
              if(this.checkBetweenRange('row', this.currentRow)){
                if(this.currentRow !== this.rows){
                  this.currentRow += 1;
                  this.userPosition = 'cell-'+this.currentRow+'-'+this.currentColumn;
                  this.changePositionOfUser(this.userPosition);
                }
              }
              break;
            }
        }
      }      
   
  }

  currentRow = 1;
  currentColumn = 1;

  checkBetweenRange(parameter, value){
    if(parameter === 'row'){
      if(value >=1 && value <= this.rows){
        return true;
      } 
      return false;
    } else {
      if(value >= 1 && value <= this.columns){
        return true;
      }
      return false;
    }
  }

  changePositionOfUser(newPosition){
    this.totalMoves += 1; 
    var childDivs = this.container.nativeElement.getElementsByTagName('span');

for( let i=0; i< childDivs.length; i++ )
{
 var childDiv = childDivs[i];
childDiv.classList.remove("selected-cell");
}
      var removeUser = document.getElementById('user');
      removeUser.parentNode.removeChild(removeUser);
      this.selectedCell = newPosition;
      let cell = document.getElementById(this.selectedCell);
      cell.classList.add('selected-cell');
      if(cell && cell.childElementCount > 0){
        var removeQueen = cell.firstChild;
        removeQueen.parentNode.removeChild(removeQueen);
      }
      this.userDiv = document.createElement('span');
      this.userDiv.setAttribute('id', 'user');
      this.userDiv.setAttribute('class', 'user-block');
      this.userPosition = this.selectedCell;
      cell.appendChild(this.userDiv);
      this.checkIfGameOver();
  }

  checkIfGameOver(){
    let cell = document.getElementById('queen');
    if(!cell){
      alert('Game Over with '+this.totalMoves+ ' moves');
      location.reload();
    }
  }
}
