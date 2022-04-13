interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string | null;
  created_at: string;
  updated_at: string;
}

export default IUser;
