export default interface IUser {
  id: number;
  idpersonagrupo: number;
  correo: string | null;
  password: string | null;
  nombres: string | null;
  apellidos: string | null;
  username: string | null;
}