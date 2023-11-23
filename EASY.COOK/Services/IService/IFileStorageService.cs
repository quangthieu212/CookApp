using EASY.COOK.Share.Dtos.Responses;

namespace EASY.COOK.Services.IService
{
    public interface IFileStorageService
    {
        public UploadFileResponse uploadFile(IFormFile file, long owner_id, string targetLocation);
        public List<UploadFileResponse> uploadFiles(List<IFormFile> Files, long owner_id, string targetLocation);
    }
}