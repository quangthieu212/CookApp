using EASY.COOK.Services.IService;
using EASY.COOK.Share.Dtos.Responses;

namespace EASY.COOK.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string uploadLocation = "/opt/tempfile/uploads/";
        public UploadFileResponse uploadFile(IFormFile file, long owner_id, string targetLocation)
        {
            try
            {
                if(string.IsNullOrEmpty(targetLocation))
                {
                    targetLocation = uploadLocation;
                }
                if (file == null || file.Length == 0)
                {
                    return new UploadFileResponse();
                }
                //create unique name for file
                var uuidName = Guid.NewGuid().ToString();
                //set file url
                string savePath = Path.Combine(Directory.GetCurrentDirectory(), targetLocation, owner_id.ToString(), uuidName);
                //create folder if not exist
                if (!Directory.Exists(savePath))
                    Directory.CreateDirectory(savePath);
               
                //get file extension
                FileInfo fileInfo = new FileInfo(file.FileName);

                string fileNameWithPath = Path.Combine(savePath, fileInfo.Name);

                using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return new UploadFileResponse(fileInfo.Name, fileNameWithPath, fileInfo.Extension);
            }
            catch
            {
                return new UploadFileResponse();
            }
        }
        public List<UploadFileResponse> uploadFiles(List<IFormFile> Files, long owner_id, string targetLocation)
        {
            List<UploadFileResponse> list = new List<UploadFileResponse>();
            if(Files != null && Files.Count > 0)
            {
                if (string.IsNullOrEmpty(targetLocation))
                {
                    targetLocation = uploadLocation;
                }
                foreach (var file in Files)
                {
                    var res = uploadFile(file, owner_id, targetLocation);
                    if(res != null)
                        list.Add(res);
                }
            }
            return list;
        }

    }
}
