
function hasUppercase(str: string): boolean {
    return /[A-Z]/.test(str);
  }

function ValidateMediator (fullname: string, password: string, sec1: string, sec2: string, sec3: string): string {
    let warnings : string = '';

    if (password.includes(fullname)) {
        warnings += "Your password contains your name! \n";
    }

    if (password.length < 5) {
        warnings += "Your password is too short, try something longer \n";
    }

    let upperCasesec1: boolean = hasUppercase(sec1);
    let upperCasesec2: boolean = hasUppercase(sec2);
    let upperCasesec3: boolean = hasUppercase(sec3);

    if (upperCasesec1 != upperCasesec2 || upperCasesec3 != upperCasesec1) {
        warnings += "Your security questions have some capital letters, just be careful";
    }

    return warnings;
}

export {ValidateMediator}