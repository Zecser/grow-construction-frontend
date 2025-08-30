import { Download } from "lucide-react";

interface ProjectDownloadProps {
  url: string;
}

const ProjectDownload = ({ url }: ProjectDownloadProps) => {
  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="text-gray-800">Download Project Plan (PDF):</span>
      <a
        href={url}
        download
        className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium px-3 py-2 rounded-md hover:underline hover:text-blue-800"
      >
        Download
        <Download size={16} />
      </a>
    </div>
  );
};

export default ProjectDownload;
