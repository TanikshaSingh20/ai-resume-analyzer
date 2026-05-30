// import type { Route } from "./+types/home";
// import Navbar from "../components/Navbar";
// import ResumeCard from "../components/ResumeCard";
// import { usePuterStore } from "../lib/puter";
// import { useNavigate } from "react-router";
// import { useEffect, useState } from "react";
//
// type Resume = {
//     id: string;
//     companyName: string;
//     jobTitle: string;
//     imagePath: string;
//     feedback?: {
//         overallScore: number;
//     };
// };
//
// export function meta({}: Route.MetaArgs) {
//     return [
//         { title: "Resumind" },
//         {
//             name: "description",
//             content: "Smart feedback for your dream job!",
//         },
//     ];
// }
//
// export default function Home() {
//     const resumes: Resume[] = [
//         {
//             id: "1",
//             companyName: "Google",
//             jobTitle: "Frontend Developer",
//             imagePath: "/images/resume_01.png",
//             feedback: {
//                 overallScore: 85,
//             },
//         },
//         {
//             id: "2",
//             companyName: "Microsoft",
//             jobTitle: "Cloud Engineer",
//             imagePath: "/images/resume_02.png",
//             feedback: {
//                 overallScore: 55,
//             },
//         },
//         {
//             id: "3",
//             companyName: "Amazon",
//             jobTitle: "Full Stack Developer",
//             imagePath: "/images/resume_03.png",
//             feedback: {
//                 overallScore: 78,
//             },
//         },
//     ];
//
//     const { auth,kv} = usePuterStore();
//     const navigate: NavigateFunction = useNavigate();
//
//     const[resumes,setResumes] = useState<Resume[]>( [] );
//     const[loadingResumes, setLoadingResumes] = useState<boolean>(false);
//
//
//     useEffect(() => {
//         if (!auth.isAuthenticated) navigate("/auth?next=/");
//     }, [auth.isAuthenticated])
//
//     useEffect(() => {
//         const loadResumes = async (): Promise<void> => {
//             setLoadingResumes(true);
//
//             const resumes = (await kv.list("resume:*", true)) as KVItem[];
//
//             const parsedResumes: Resume[] =
//                 resumes?.map((resume) => JSON.parse(resume.value) as Resume) || [];
//
//             console.log("parsedResumes", parsedResumes);
//             setResumes(parsedResumes);
//
//             setLoadingResumes(false);
//         };
//
//         loadResumes();
//     }, []);
//
//
//
//
//     useEffect(() => {
//         const loadResume = async (): Promise<void> => {
//             const blob: Blob | undefined = await fs.read(resume.imagePath);
//
//             if (!blob) return;
//
//             let url: string = URL.createObjectURL(blob);
//
//             setResumeUrl(url);
//         };
//
//         loadResume();
//     }, [resume.imagePath]);
//
//
//
//     return (
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
//             <Navbar />
//
//             <section className="main-section">
//                 <div className="page-heading">
//                     <h1>Track Your Applications & Resume Ratings</h1>
//                     {!loadingResumes && resumes?.length === 0 ? (
//                         <h2>No resumes found. Upload your first resume to get feedback.</h2>
//                     ) : (
//                         <h2>Review your submissions and check AI-powered feedback.</h2>
//                     )}
//                 </div>
//
//                 {loadingResumes && (
//                     <div className="flex flex-col items-center justify-center">
//                         <img
//                             src="/images/resume-scan-2.gif"
//
//                             className="w-[200px]"
//                         />
//                     </div>
//                 )}
//
//                 {!loadingResumes && resumes.length > 0 && (
//                     <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//                         {resumes.map((resume) => (
//                             <ResumeCard key={resume.id} resume={resume} />
//                         ))}
//                     </div>
//                 )}
//
//                 {!loadingResumes && resumes.length > 0 && (
//                     <div className = "flex flex-col items-center justify-center mt-10 gap-4">
//                     <Link to = "/upload" className = "primary-button w-fit text-xl font-semibold">
//                         Upload Resume
//                     </Link>
//                     </div>
//                 )}
//             </section>
//         </main>
//     );
// }




// import type { Route } from "./+types/home";
// import Navbar from "../components/Navbar";
// import ResumeCard from "../components/ResumeCard";
// import { usePuterStore } from "../lib/puter";
// import { useNavigate, Link } from "react-router";
// import { useEffect, useState } from "react";
//
// type Resume = {
//     id: string;
//     companyName: string;
//     jobTitle: string;
//     imagePath: string;
//     feedback?: {
//         overallScore: number;
//     };
// };
//
// type KVItem = {
//     key: string;
//     value: string;
// };
//
// export function meta({}: Route.MetaArgs) {
//     return [
//         { title: "Resumind" },
//         { name: "description", content: "Smart feedback for your dream job!" },
//     ];
// }
//
// export default function Home() {
//     const { auth, kv } = usePuterStore();
//     const navigate = useNavigate();
//
//     const [resumes, setResumes] = useState<Resume[]>([]);
//     const [loadingResumes, setLoadingResumes] = useState<boolean>(false);
//
//     useEffect(() => {
//         if (!auth.isAuthenticated) navigate("/auth?next=/");
//     }, [auth.isAuthenticated]);
//
//     useEffect(() => {
//         const loadResumes = async (): Promise<void> => {
//             setLoadingResumes(true);
//
//             const result = (await kv.list("resume-*", true)) as KVItem[];
//
//             const parsedResumes: Resume[] =
//                 result?.map((resume) => JSON.parse(resume.value) as Resume) || [];
//
//             console.log("parsedResumes", parsedResumes);
//             setResumes(parsedResumes);
//             setLoadingResumes(false);
//         };
//
//         if (auth.isAuthenticated) loadResumes();
//     }, [auth.isAuthenticated]);
//
//     return (
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
//             <Navbar />
//
//             <section className="main-section">
//                 <div className="page-heading">
//                     <h1>Track Your Applications & Resume Ratings</h1>
//                     {!loadingResumes && resumes?.length === 0 ? (
//                         <h2>No resumes found. Upload your first resume to get feedback.</h2>
//                     ) : (
//                         <h2>Review your submissions and check AI-powered feedback.</h2>
//                     )}
//                 </div>
//
//                 {loadingResumes && (
//                     <div className="flex flex-col items-center justify-center">
//                         <img src="/images/resume-scan-2.gif" className="w-[200px]" />
//                     </div>
//                 )}
//
//                 {!loadingResumes && resumes.length > 0 && (
//                     <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//                         {resumes.map((resume) => (
//                             <ResumeCard key={resume.id} resume={resume} />
//                         ))}
//                     </div>
//                 )}
//
//                 <div className="flex flex-col items-center justify-center mt-10 gap-4">
//                     <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
//                         Upload Resume
//                     </Link>
//                 </div>
//             </section>
//         </main>
//     );
// }



// import type { Route } from "./+types/home";
// import Navbar from "../components/Navbar";
// import ResumeCard from "../components/ResumeCard";
// import { usePuterStore } from "../lib/puter";
// import { useNavigate, Link } from "react-router";
// import { useEffect, useState } from "react";
//
// type Resume = {
//     id: string;
//     companyName: string;
//     jobTitle: string;
//     imagePath: string;
//     feedback?: { overallScore: number };
// };
//
// type KVItem = {
//     key: string;
//     value: string;
// };
//
// export function meta({}: Route.MetaArgs) {
//     return [
//         { title: "Resumind" },
//         { name: "description", content: "Smart feedback for your dream job!" },
//     ];
// }
//
// export default function Home() {
//     const { auth, kv } = usePuterStore();
//     const navigate = useNavigate();
//     const [resumes, setResumes] = useState<Resume[]>([]);
//     const [loadingResumes, setLoadingResumes] = useState<boolean>(false);
//
//     useEffect(() => {
//         if (!auth.isAuthenticated) navigate("/auth?next=/");
//     }, [auth.isAuthenticated, navigate]);
//
//     useEffect(() => {
//         const loadResumes = async (): Promise<void> => {
//             setLoadingResumes(true);
//
//             const result = (await kv.list("resume-*", true)) as KVItem[];
//
//             const parsedResumes: Resume[] =
//                 result?.map((resume) => JSON.parse(resume.value) as Resume) || [];
//
//             console.log("Loaded resumes:", parsedResumes);
//             setResumes([]);
//             // setResumes(parsedResumes);
//             setLoadingResumes(false);
//         };
//
//         if (auth.isAuthenticated) {
//             loadResumes();
//         }
//     }, [auth.isAuthenticated, kv]);
//
//     return (
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen dark:bg-gray-900">
//             <Navbar />
//
//             <section className="main-section">
//                 <div className="page-heading">
//                     <h1>Track Your Applications & Resume Ratings</h1>
//
//                     {!loadingResumes && resumes.length === 0 ? (
//                         <h2>
//                             No resumes found. Upload your first resume to get
//                             feedback.
//                         </h2>
//                     ) : (
//                         <h2>
//                             Review your submissions and check AI-powered
//                             feedback.
//                         </h2>
//                     )}
//                 </div>
//
//                 {loadingResumes && (
//                     <div className="flex flex-col items-center justify-center mt-10">
//                         <img
//                             src="/images/resume-scan-2.gif"
//                             className="w-[200px]"
//                             alt="Loading resumes"
//                         />
//                         <p className="text-gray-500 mt-4 animate-pulse">
//                             Loading your resumes...
//                         </p>
//                     </div>
//                 )}
//
//                 {!loadingResumes && resumes.length > 0 && (
//                     <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//                         {resumes.map((resume) => (
//                             <ResumeCard
//                                 key={resume.id}
//                                 resume={resume}
//                             />
//                         ))}
//                     </div>
//                 )}
//
//                 <div className="flex flex-col items-center justify-center mt-10 gap-4">
//                     <Link
//                         to="/upload"
//                         className="primary-button w-fit text-xl font-semibold"
//                     >
//                         ＋ Upload Resume
//                     </Link>
//                 </div>
//             </section>
//         </main>
//     );
// }





import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback?: { overallScore: number };
};

type KVItem = {
    key: string;
    value: string;
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState<boolean>(false);

    useEffect(() => {
        if (!auth.isAuthenticated) navigate("/auth?next=/");
    }, [auth.isAuthenticated, navigate]);

    useEffect(() => {
        const loadResumes = async (): Promise<void> => {
            setLoadingResumes(true);

            const result = (await kv.list("resume-*", true)) as KVItem[];

            const parsedResumes: Resume[] =
                result?.map((resume) => JSON.parse(resume.value) as Resume) || [];

            console.log("Loaded resumes:", parsedResumes);
            setResumes(parsedResumes); // fixed: was setResumes([])
            setLoadingResumes(false);
        };

        if (auth.isAuthenticated) {
            loadResumes();
        }
    }, [auth.isAuthenticated, kv]);

    const handleDelete = async (id: string) => {
        await kv["delete"](`resume-${id}`);
        setResumes((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen dark:bg-gray-900">
            <Navbar />

            <section className="main-section">
                <div className="page-heading">
                    <h1>Track Your Applications & Resume Ratings</h1>

                    {!loadingResumes && resumes.length === 0 ? (
                        <h2>
                            No resumes found. Upload your first resume to get
                            feedback.
                        </h2>
                    ) : (
                        <h2>
                            Review your submissions and check AI-powered
                            feedback.
                        </h2>
                    )}
                </div>

                {loadingResumes && (
                    <div className="flex flex-col items-center justify-center mt-10">
                        <img
                            src="/images/resume-scan-2.gif"
                            className="w-[200px]"
                            alt="Loading resumes"
                        />
                        <p className="text-gray-500 mt-4 animate-pulse">
                            Loading your resumes...
                        </p>
                    </div>
                )}

                {!loadingResumes && resumes.length > 0 && (
                    <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {resumes.map((resume) => (
                            <ResumeCard
                                key={resume.id}
                                resume={resume}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link
                        to="/upload"
                        className="primary-button w-fit text-xl font-semibold"
                    >
                        ＋ Upload Resume
                    </Link>
                </div>
            </section>
        </main>
    );
}
