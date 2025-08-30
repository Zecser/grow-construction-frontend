import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAddProject } from "../hooks/useAddProject";
import SelectField from "./SelectField";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const AddProject: React.FC = () => {
    const { formData, loading, handleChange, handleSubmit } = useAddProject({
        name: "",
        description: "",
        date: "",
        status: "",
        statusPercentage: 0,
        location: "",
        addProjectTo: "",
    });

    return (
        <div className="px-0 sm:px-0 lg:px-0 xl:px-0 md:pl-0 lg:pl-0 xl:pl-2 py-2 pr-3 lg:mr-0 xl:mr-0 ">
            {/* Back Button */}
            <Link to="/admin/projects" replace>
                <div className="flex items-center gap-2 mb-6">
                    <svg
                        width="12"
                        height="20"
                        className="w-2"
                        viewBox="0 0 12 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.54054 10L12 2.33333L9.72973 0L0 10L9.72973 20L12 17.6667L4.54054 10Z"
                            fill="var(--color-primary)"
                        />
                    </svg>
                    <h1 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-primary uppercase">
                        Add Project
                    </h1>
                </div>
            </Link>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-6 max-w-6xl w-full text-sm sm:text-base md:text-lg lg:text-xl lg:ml-3 xl:ml-3 md:ml-3"
            >
                {/* Project Name */}
                <InputField
                    id="projectName"
                    label="Project Name"
                    name="name"
                    value={formData.name}
                    placeholder="Enter project name"
                    onChange={handleChange}
                    required
                />

                {/* Description */}
                <TextAreaField
                    id="description"
                    label="Details"
                    name="description"
                    value={formData.description}
                    placeholder="Enter project details"
                    rows={4}
                    onChange={handleChange}
                    required
                />

                {/* Date, Status & Status Percentage */}
                <div className="flex flex-col items-start gap-[24px] w-full  md:pr-[0px] lg:pr-[400px] xl:pr-[651px]">
                    <InputField
                        id="date"
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                    <InputField
                        id="status"
                        label="Work Status"
                        name="status"
                        value={formData.status}
                        placeholder="Enter work status"
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                    <InputField
                        id="statusPercentage"
                        label="Status %"
                        name="statusPercentage"
                        value={formData.statusPercentage ?? 0}
                        placeholder="Enter status percentage"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Location */}
                <InputField
                    id="location"
                    label="Location"
                    name="location"
                    value={formData.location}
                    placeholder="Enter your location"
                    onChange={handleChange}
                    required
                />

                {/* Add this project to */}
                <SelectField
                    id="addProjectTo"
                    label="Add This Project To"
                    name="addProjectTo"
                    value={formData.addProjectTo}
                    onChange={handleChange}
                    options={[
                        { value: "All Projects", label: "All Projects" },
                        { value: "My Projects", label: "My Projects" },
                        { value: "Team Projects", label: "Team Projects" },
                    ]}
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-50 sm:w-75  self-center bg-primary hover:bg-green-900 text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl px-8 py-3 rounded-xl mt-6 shadow-md hover:shadow-lg transition-all"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Loading...
                        </span>
                    ) : (
                        "Save"
                    )}
                </button>
            </form>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default AddProject;
