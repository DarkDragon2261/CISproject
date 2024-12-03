
    function getRandomInt(min: number, max: number): number {
     return Math.floor(Math.random() * (max - min)) + min;
     }

    abstract class Append {
        abstract addChar(pass: string): string; 
      
      }
      
      
      class AppendNum extends Append {
        
       addChar(pass: string): string {
          let randomNum: number = getRandomInt(0,9);
          pass += randomNum.toString();
          return pass;
        }
      }

      class appendSpecialChar extends Append {
        addChar(pass: string): string {
            const specialstring = "!@#$%&";
            let specialindex: number = getRandomInt(0,5);

            const specialChar: string = specialstring[specialindex];

            pass += specialChar;
            return pass;
        }
    }

    class appendAlphaChar extends Append {
        addChar(pass: string): string {
            const specialstring = "abcdefghijklmonpqrstuvwxyz";
            let specialindex: number = getRandomInt(0,25);

            const specialChar: string = specialstring[specialindex];

            pass += specialChar;
            return pass;
        }
    }

  function passBuilder() : string {
    let password: string = '';

    const instanceNum = new AppendNum();
    const instanceAlpha = new appendAlphaChar();
    const instanceSpecial = new appendSpecialChar();
    
    for (let i = 0; i < 10; i++) {
      let randomnumber: number = getRandomInt(1,4);

      switch (randomnumber) {
        case(1):
        password = instanceNum.addChar(password); 
        break;
      
        case(2):
        password = instanceAlpha.addChar(password); 
        break;

        case(3):
        password = instanceSpecial.addChar(password); 
        break;
        
        default:
          break;
      }

    }

    return password;
  }

  export {passBuilder};