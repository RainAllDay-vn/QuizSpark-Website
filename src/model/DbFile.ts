export interface DbFile {
    id: string;
    fileName: string;
    fileType: string;
    uploadDate: string;
    derivedFiles: DbFile[];
}