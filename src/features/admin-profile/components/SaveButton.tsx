interface Props {
  onClick: () => void;
  loading: boolean;
}

const SaveButton: React.FC<Props> = ({ onClick, loading }) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-green-700 text-white px-10 py-3 rounded-full hover:bg-green-800 disabled:bg-gray-400"
    >
      {loading ? "Saving..." : "Save"}
    </button>
  </div>
);

export default SaveButton;
