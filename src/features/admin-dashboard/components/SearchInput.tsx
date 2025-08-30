import { SearchIcon } from "lucide-react";
import { Input } from "../../../components/ui/input";

const SearchInput = () => {
  return (
    <div className="relative w-full max-w-md">
      <Input
        className="w-full !bg-white text-gray-700 rounded-full pl-4 pr-10 py-2"
      />
      <SearchIcon className="absolute right-3 top-1/2 transform text-primary -translate-y-1/2" />
    </div>
  );
};

export default SearchInput;
