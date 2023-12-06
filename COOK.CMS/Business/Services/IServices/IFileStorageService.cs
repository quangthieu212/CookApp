using COOK.CMS.Shared.Dtos.Responses;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace COOK.CMS.Business.Services.IServices
{
    public interface IFileStorageService
    {
        public UploadFileResponse uploadFile(IFormFile file, long owner_id, string targetLocation);
        public List<UploadFileResponse> uploadFiles(List<IFormFile> Files, long owner_id, string targetLocation);
    }
}