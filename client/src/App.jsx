import { useState } from "react";
import axios from "axios";
import QrCodeGenerator from "qrcode";

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");

  const handleShorten = async () => {
    if (!url) return;

    try {
      const response = await axios.post(`${apiBaseUrl}/api/url/shorten`, {
        originalUrl: url,
      });
      setShortUrl(response.data.shortUrl);
      setCopied(false);

      // Generate QR code
      const qr = await QrCodeGenerator.toDataURL(response.data.shortUrl);
      setQrImage(qr);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black p-4">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <p className="mb-2">Short URL:</p>
            <div className="flex items-center">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mr-4"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            {qrImage && (
              <div className="mt-4">
                <p className="mb-2">QR Code:</p>
                <img src={qrImage} alt="QR Code" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
