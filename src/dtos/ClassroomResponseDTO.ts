import type ClassroomMemberDTO from "./ClassroomMemberDTO";

export default interface ClassroomResponseDTO {
    id: string;
    name: string;
    description: string;
    joinCode: string;
    createdAt: string;
    members: ClassroomMemberDTO[];
}
