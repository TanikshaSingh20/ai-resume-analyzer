import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import {usePuterStore} from "../lib/puter";
import {type NavigateFunction, useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback?: {
        overallScore: number;
    };
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        {
            name: "description",
            content: "Smart feedback for your dream job!",
        },
    ];
}

export default function Home() {
    const resumes: Resume[] = [
        {
            id: "1",
            companyName: "Google",
            jobTitle: "Frontend Developer",
            imagePath: "/images/resume_01.png",
            feedback: {
                overallScore: 85,
            },
        },
        {
            id: "2",
            companyName: "Microsoft",
            jobTitle: "Cloud Engineer",
            imagePath: "/images/resume_02.png",
            feedback: {
                overallScore: 55,
            },
        },
        {
            id: "3",
            companyName: "Amazon",
            jobTitle: "Full Stack Developer",
            imagePath: "/images/resume_03.png",
            feedback: {
                overallScore: 78,
            },
        },
    ];

    const { auth } = usePuterStore();
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) navigate("/auth?next=/");
    }, [auth.isAuthenticated]);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />

            <section className="main-section">
                <div className="page-heading">
                    <h1>Track Your Applications & Resume Ratings</h1>
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                </div>

                {resumes.length > 0 && (
                    <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}