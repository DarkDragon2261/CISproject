class Observer {
    wins : number = 10;

     updateObserver( newWins: number) {
        this.wins = newWins;
    }
}

class Subject {

    wins : number = 10; 
    
    listObservers : Observer[] = [];

    attachObserver(Observer1: Observer) {
        this.listObservers.push(Observer1);
    }

    detachObserver(Observer1: Observer) {
        const index = this.listObservers.indexOf(Observer1);
    if (index !== -1) {
      this.listObservers.splice(index, 1);
    }
  }

  setWins( newwins: number) {
    for (const observer of this.listObservers) {
        observer.updateObserver(newwins);
    }
  }
    }

export {Subject, Observer}