import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import api from "@/lib/api";

export default function App() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<{
        upcoming: string[];
        completed: string[];
        ongoing: string[];
    }>({
        upcoming: [],
        completed: [],
        ongoing: [],
    });

    const [loading, setLoading] = useState(false);

    const handleShowMore = (title: string) => {
        if (title === "ONGOING PROJECTS") {
            navigate("/admin/projects/ongoing");
        } else if (title === "UPCOMING PROJECTS") {
            navigate("/admin/projects/upcoming");
        } else if (title === "COMPLETED PROJECTS") {
            navigate("/admin/projects/completed");
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await api.get("/projects/titles-by-status/");

                setProjects(response.data);
            } catch (error) {

                setProjects({ upcoming: [], completed: [], ongoing: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const projectCards = [
        {
            title: "ONGOING PROJECTS",
            items: projects.ongoing,
            color: "bg-grayLight",
            footer: true,
        },
        {
            title: "UPCOMING PROJECTS",
            items: projects.upcoming,
            color: "bg-primary text-white",
            footer: true,
        },
        {
            title: "COMPLETED PROJECTS",
            items: projects.completed,
            color: "bg-white border border-primary",
            footer: true,
        },
        {
            title: "ADD PROJECTS",
            items: [],
            color: "bg-grayLight flex items-center justify-center border border-primary",
            footer: false,
            isAdd: true,
        },
    ];

    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 sm:p-8 md:ml-[-2rem] sm:ml-[-2rem] xs:ml-[-2rem] lg:mr-[10%] flex flex-col">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full max-w-5xl mx-auto lg:w-[700px] lg:h-[500px] lg:ml-10">
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full max-w-5xl mx-auto lg:w-[700px] lg:h-[500px] lg:ml-10">
                        {projectCards.map((card) => (
                            <div
                                key={card.title}
                                className={`shadow ${card.color} p-6 flex flex-col min-h-[210px]`}
                            >
                                <div
                                    className={`font-semibold text-lg mb-3 ${card.color.includes("text-white") ? "text-white" : "text-primary"
                                        }`}
                                >
                                    {card.title}
                                </div>

                                {card.isAdd ? (
                                    <div className="flex flex-1 items-center justify-center">
                                        <button
                                            className="flex flex-col items-center justify-center w-full h-full"
                                            onClick={() => navigate("/admin/projects/create")}
                                        >
                                            <svg
                                                className="w-16 h-16 text-[#176B57] mb-2"
                                                viewBox="0 0 63 50"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6.3 50C4.5675 50 3.0849 49.3885 1.8522 48.1656C0.6195 46.9427 0.0021 45.4708 0 43.75V6.25C0 4.53125 0.6174 3.06042 1.8522 1.8375C3.087 0.614583 4.5696 0.00208333 6.3 0H22.6012C23.4412 0 24.2424 0.15625 25.0047 0.46875C25.767 0.78125 26.4358 1.22396 27.0112 1.79687L31.5 6.25H56.7C58.4325 6.25 59.9161 6.8625 61.1509 8.0875C62.3857 9.3125 63.0021 10.7833 63 12.5V43.75C63 45.4687 62.3836 46.9406 61.1509 48.1656C59.9182 49.3906 58.4346 50.0021 56.7 50H6.3ZM31.5 40.625C32.3925 40.625 33.1411 40.325 33.7459 39.725C34.3507 39.125 34.6521 38.3833 34.65 37.5V27.5L37.485 30.3125C38.0625 30.8854 38.7975 31.1719 39.69 31.1719C40.5825 31.1719 41.3175 30.8854 41.895 30.3125C42.4725 29.7396 42.7612 29.0104 42.7612 28.125C42.7612 27.2396 42.4725 26.5104 41.895 25.9375L33.705 17.8125C33.075 17.1875 32.34 16.875 31.5 16.875C30.66 16.875 29.925 17.1875 29.295 17.8125L21.105 25.9375C20.5275 26.5104 20.2387 27.2396 20.2387 28.125C20.2387 29.0104 20.5275 29.7396 21.105 30.3125C21.6825 30.8854 22.4175 31.1719 23.31 31.1719C24.2025 31.1719 24.9375 30.8854 25.515 30.3125L28.35 27.5V37.5C28.35 38.3854 28.6524 39.1281 29.2572 39.7281C29.862 40.3281 30.6096 40.6271 31.5 40.625Z"
                                                    fill="var(--color-primary)"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <ul className="flex-1 mb-4 space-y-1">
                                            {card.items.length > 0 ? (
                                                card.items.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${card.color.includes("text-white")
                                                            ? "text-white"
                                                            : "text-[#222]"
                                                            } text-base`}
                                                    >
                                                        {item}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-gray-400 text-sm">No projects found</li>
                                            )}
                                        </ul>
                                        {card.footer && (
                                            <button
                                                className={`flex items-center md:pl-15 lg:pl-45 xl:pl-45 gap-1 text-sm font-medium mt-auto ${card.color.includes("text-white")
                                                    ? "text-white/80 "
                                                    : "text-primary"
                                                    }`}
                                                onClick={() => handleShowMore(card.title)}
                                            >
                                                Show More
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M9 6l6 6-6 6" />
                                                </svg>
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

