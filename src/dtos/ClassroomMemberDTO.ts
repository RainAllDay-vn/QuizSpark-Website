export default interface ClassroomMemberDTO {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: 'OWNER' | 'TEACHER' | 'STUDENT';
    joinedAt: string;
}
