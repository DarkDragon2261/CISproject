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
    const result = await supabaseResponse(responses.response1, responses.userEmail);
    if (result === true) {
      return true;
    } else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}

class ResponseHandler2 extends ResponseHandler {
  async HandleResponse(responses: UserResponses): Promise<boolean> {
    const result = await supabaseResponse(responses.response2, responses.userEmail);
    if (result === true) {
      return true;
    } else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}

class ResponseHandler3 extends ResponseHandler {
  async HandleResponse(responses: UserResponses): Promise<boolean> {
    const result = await supabaseResponse(responses.response3, responses.userEmail);
    if (result === true) {
      return true;
    } else if (this.Successor != null) {
      return this.Successor.HandleResponse(responses);
    }
    return false;
  }
}

const supabaseResponse = async (securityquestion: string, useremail: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('Users')
    .select('Security1')
    .eq('Email', useremail);

  if (error) {
    console.error("Error fetching data:", error);
    return false;
  }

  if (data && data.length > 0) {
    const storedAnswer = data[0].Security1;
    return storedAnswer === securityquestion;
  }

  return false;
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
