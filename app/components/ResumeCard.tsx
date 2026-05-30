// import { Link } from "react-router";
// import ScoreCircle from "./ScoreCircle";
// import { useEffect, useState } from "react";
// import { usePuterStore } from "../lib/puter";
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
// const ResumeCard = ({ resume }: { resume: Resume }) => {
//     const { fs } = usePuterStore();
//     const [resumeUrl, setResumeUrl] = useState<string>("");
//
//     useEffect(() => {
//         const loadResume = async (): Promise<void> => {
//             const blob: Blob | undefined = await fs.read(resume.imagePath);
//
//             if (!blob) return;
//
//             const url: string = URL.createObjectURL(blob);
//             setResumeUrl(url);
//         };
//
//         loadResume();
//     }, [imagePath]);
//
//     return (
//         <Link
//             to={`/resume/${resume.id}`}
//             className="resume-card animate-in fade-in duration-1000"
//         >
//             <div className="resume-card-header">
//                 <div className="flex flex-col gap-1">
//                     {companyName && <h2 className="!text-black font-bold break-words text-2xl">{companyName}
//
//                     </h2>
//                     {jobTitle && <h3 className="text-sm break-words text-gray-500">
//                         {jobTitle}
//                     </h3>
//                 {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
//                 </div>
//                 <div className="flex-shrink-0">
//                     <ScoreCircle score={resume.feedback?.overallScore || 0} />
//                 </div>
//             </div>
//     {resumeUrl && (
//
//             <div className="gradient-border animate-in fade-in duration-1000 overflow-hidden rounded-2xl">
//                 <div className="w-full h-full">
//                     <img
//                         src={imagePath}
//                         alt="resume"
//                         className="w-full h-[350px] max-sm:h-[220px] object-cover object-top"
//                     />
//                 </div>
//             </div>
//     )}
//         </Link>
//     );
// };
//
// export default ResumeCard;


// import { Link } from "react-router";
// import ScoreCircle from "./ScoreCircle";
// import { useEffect, useState } from "react";
// import { usePuterStore } from "../lib/puter";
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
// const ResumeCard = ({ resume }: { resume: Resume }) => {
//     const { fs } = usePuterStore();
//     const [resumeUrl, setResumeUrl] = useState<string>("");
//
//     useEffect(() => {
//         const loadResume = async (): Promise<void> => {
//             const blob: Blob | undefined = await fs.read(resume.imagePath);
//
//             if (!blob) return;
//
//             const url: string = URL.createObjectURL(blob);
//             setResumeUrl(url);
//         };
//
//         loadResume();
//     }, [resume.imagePath]);
//
//     return (
//         <Link
//             to={`/resume/${resume.id}`}
//             className="resume-card animate-in fade-in duration-1000"
//         >
//             <div className="resume-card-header">
//                 <div className="flex flex-col gap-1">
//                     {resume.companyName && (
//                         <h2 className="!text-black font-bold break-words text-2xl">
//                             {resume.companyName}
//                         </h2>
//                     )}
//                     {resume.jobTitle && (
//                         <h3 className="text-sm break-words text-gray-500">
//                             {resume.jobTitle}
//                         </h3>
//                     )}
//                     {!resume.companyName && !resume.jobTitle && (
//                         <h2 className="!text-black font-bold">Resume</h2>
//                     )}
//                 </div>
//                 <div className="flex-shrink-0">
//                     <ScoreCircle score={resume.feedback?.overallScore || 0} />
//                 </div>
//             </div>
//
//             {resumeUrl && (
//                 <div className="gradient-border animate-in fade-in duration-1000 overflow-hidden rounded-2xl">
//                     <div className="w-full h-full">
//                         <img
//                             src={resumeUrl}
//                             alt="resume"
//                             className="w-full h-[350px] max-sm:h-[220px] object-cover object-top"
//                         />
//                     </div>
//                 </div>
//             )}
//         </Link>
//     );
// };
//
// export default ResumeCard;


import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "../lib/puter";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback?: {
        overallScore: number;
    };
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState<string>("");

    useEffect(() => {
        const loadResume = async (): Promise<void> => {
            const blob: Blob | undefined = await fs.read(resume.imagePath);
            if (!blob) return;
            const url: string = URL.createObjectURL(blob);
            setResumeUrl(url);
        };
        loadResume();
    }, [resume.imagePath]);

    return (
        <Link
            to={`/resume/${resume.id}`}
            className="resume-card animate-in fade-in duration-1000"
        >
            <div className="resume-card-header">
                <div className="flex flex-col gap-1">
                    {resume.companyName && (
                        <h2 className="!text-black dark:!text-white font-bold break-words text-2xl">
                            {resume.companyName}
                        </h2>
                    )}
                    {resume.jobTitle && (
                        <h3 className="text-sm break-words text-gray-500 dark:text-gray-400">
                            {resume.jobTitle}
                        </h3>
                    )}
                    {!resume.companyName && !resume.jobTitle && (
                        <h2 className="!text-black dark:!text-white font-bold">Resume</h2>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={resume.feedback?.overallScore || 0} />
                </div>
            </div>

            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000 overflow-hidden rounded-2xl">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[220px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;