using System.Globalization;

namespace EASY.COOK.Shared
{
    public class PlatformException : Exception
    {
        public PlatformException() : base()
        {
        }

        public PlatformException(string message) : base(message)
        {
        }

        public PlatformException(string message, string code) : base(String.Format(message, code))
        {
        }

        public PlatformException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}
