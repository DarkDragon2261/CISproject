import supabase from "../../supabaseClient";

class UserResponses {
  response1: string;
  response2: string;
  response3: string;
  userEmail: string;
  constructor(rep1: string, rep2: string, rep3: string, email: string) {
    this.response1 = rep1;
    this.response2 = rep2;
    this.response3 = rep3;
    this.userEmail = email;
  }
}

abstract class ResponseHandler {
  Successor: ResponseHandler | null = null;

  SetSuccessor(newSuccessor: ResponseHandler): void {
    this.Successor = newSuccessor;
  }

  abstract HandleResponse(responses: UserResponses): Promise<boolean>;
}

class ResponseHandler1 extends ResponseHandler {
  async HandleResponse(responses: UserResponses): Promise<boolean> {
   const {data, error} = await supabase 
    .from('Users')
    .select('Security1')
    .eq('Email', responses.userEmail)
    
    if (data) {
      const responseSupa = data[0].Security1;
      if (responses.response1 === responseSupa) {
          return true;
      }
    }
   else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}

class ResponseHandler2 extends ResponseHandler {
  async HandleResponse(responses: UserResponses): Promise<boolean> {
   const {data, error} = await supabase 
    .from('Users')
    .select('Security2')
    .eq('Email', responses.userEmail)
    
    if (data) {
      const responseSupa = data[0].Security2;
      if (responses.response2 === responseSupa) {
          return true;
      }
    }
   else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}

class ResponseHandler3 extends ResponseHandler {
  async HandleResponse(responses: UserResponses): Promise<boolean> {
   const {data, error} = await supabase 
    .from('Users')
    .select('Security3')
    .eq('Email', responses.userEmail)
    
    if (data) {
      const responseSupa = data[0].Security3;
      if (responses.response3 === responseSupa) {
          return true;
      }
    }
   else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}


function SecurityResponse(user: string, rep1: string, rep2: string, rep3: string): Promise<boolean> {
  let responses: UserResponses = new UserResponses(rep1, rep2, rep3, user);
  let handler1: ResponseHandler1 = new ResponseHandler1();
  let handler2: ResponseHandler2 = new ResponseHandler2();
  let handler3: ResponseHandler3 = new ResponseHandler3();

  handler1.SetSuccessor(handler2);
  handler2.SetSuccessor(handler3);

  return handler1.HandleResponse(responses);
}

export { SecurityResponse };
