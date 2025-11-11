export default interface UserRegistrationDAO {
  accountType: 'STUDENT' | 'TEACHER';
  username: string;
  firstName: string;
  lastName: string;
  dob?: string;
  educationLevel?: string;
}