import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback?: {
        overallScore: number;
    };
};

const ResumeCard = ({
                        resume,
                    }: {
    resume: Resume;
}) => {
    return (
        <Link
            to={`/resume/${resume.id}`}
            className="resume-card animate-in fade-in duration-1000"
        >
            <div className="resume-card-header">
                <div className="flex flex-col gap-1">
                    <h2 className="!text-black font-bold break-words text-2xl">
                        {resume.companyName}
                    </h2>

                    <h3 className="text-sm break-words text-gray-500">
                        {resume.jobTitle}
                    </h3>
                </div>

                <div className="flex-shrink-0">
                    <ScoreCircle score={resume.feedback?.overallScore || 0} />
                </div>
            </div>

            <div className="gradient-border animate-in fade-in duration-1000 overflow-hidden rounded-2xl">
                <div className="w-full h-full bg-white">
                    <img
                        src={resume.imagePath}
                        alt="resume"
                        className="w-full h-[350px] max-sm:h-[220px] object-cover object-top"
                    />
                </div>
            </div>
        </Link>
    );
};

export default ResumeCard;