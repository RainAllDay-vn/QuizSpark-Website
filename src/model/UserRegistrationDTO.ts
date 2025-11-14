export default interface UserRegistrationDTO {
  accountType: 'STUDENT' | 'TEACHER';
  username: string;
  firstName: string;
  lastName: string;
  dob?: string;
  educationLevel?: string;
}