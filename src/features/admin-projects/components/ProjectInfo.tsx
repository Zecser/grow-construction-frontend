interface ProjectInfoProps {
  id: string;
  clientName: string;
  constructionDetails: string[];
  amenities: string[];
  contactDetails: string;
  startedDate: string;
  estimatedCompletionTime: string;
  location: string;
}

const ProjectInfo = ({
  id,
  clientName,
  constructionDetails,
  amenities,
  contactDetails,
  startedDate,
  estimatedCompletionTime,
  location,
}: ProjectInfoProps) => {
  return (
    <div className="mt-2">
      <p className="mb-2 text-gray-800">Client ID: CLT{id}</p>
      <p className="mb-2 text-gray-800">Client Name: {clientName}</p>

      <p className="mt-3 font-medium text-gray-700">Construction Details:</p>
      <ul className="list-disc list-inside text-gray-600 ml-2 mb-3">
        {constructionDetails.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
        {amenities.length > 0 && (
          <li>
            Amenities:
            <ul className="list-disc list-inside ml-4 text-gray-600">
              {amenities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>

      <p className="mb-2 text-gray-800">Contact Details: {contactDetails}</p>
      <p className="mb-2 text-gray-800">Started Date: {startedDate}</p>
      <p className="mb-2 text-gray-800">
        Estimated Completion Time: {estimatedCompletionTime}
      </p>
      <p className="mb-2 text-gray-800">Location: {location}</p>
    </div>
  );
};

export default ProjectInfo;
