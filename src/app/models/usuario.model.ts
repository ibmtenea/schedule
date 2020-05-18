
export class Usermodule {
    public id_persona: number;
    public nombres: string;
    public password:string;
    public email:string;
public id_rol:string;
  
    constructor(id_persona:number,nombres: string,password:string,email:string,id_rol:string) {
      this.id_persona = id_persona;
      this.nombres = nombres;
      this.password = password;
      this.email = email;
      this.id_rol=id_rol;
    }
  }
  