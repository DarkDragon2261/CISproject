class UserResponses {
  response1 : string;
  response2 : string;
  response3: string;

  constructor (rep1 : string, rep2 : string, rep3 : string) {
    this.response1 =rep1;
    this.response2 = rep2;
    this.response3 = rep3;
  }
}

class ResponseHandler {
  Successor: ResponseHandler | null = null;

  SetSuccessor(newSuccessor: ResponseHandler): void {
      this.Successor = newSuccessor;
  }

  HandleResponse( responses: UserResponses): string {
    return "true";
  }
}

class ResponseHandler1 extends ResponseHandler {
  HandleResponse( responses: UserResponses): string {
    return "Answered Security 1";
  }
}

