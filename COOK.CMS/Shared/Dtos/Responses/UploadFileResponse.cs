using System;

namespace COOK.CMS.Shared.Dtos.Responses
{
    public class UploadFileResponse
    {
        public string? fileName { get; set; }
        public string? fileDownloadUri { get; set; }
        public string? fileType { get; set; }

        public UploadFileResponse() { }
        public UploadFileResponse(String fileName, String fileDownloadUri, String fileType)
        {
            this.fileName = fileName;
            this.fileDownloadUri = fileDownloadUri;
            this.fileType = fileType;
        }
    }
}
