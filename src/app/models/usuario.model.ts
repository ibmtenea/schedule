
export class Usermodule {
    public id_persona: number;
    public nombres: string;
    public password:string;
    public email:string;

  
    constructor(id_persona:number,nombres: string,password:string,email:string) {
      this.id_persona = id_persona;
      this.nombres = nombres;
      this.password = password;
      this.email = email;
    }
  }
  