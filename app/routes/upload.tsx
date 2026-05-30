// import { type FormEvent, useState} from 'react'
//
// import React, { useState } from "react";
// import Navbar from "~/components/Navbar";
// import FileUploader from "~/components/FileUploader";
//
// const Upload = (): React.JSX.Element => {
//     const [isProcessing, setIsProcessing] = useState(true);
//     const [statusText, setStatusText] = useState("");
//     const[file,setFile]= useState<File|null>(null);
//
//     const handleFileSelect = (file: File| null) => {
//       setFile(file)
//     }
//
//     const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//
//     }
//     return (
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//             <Navbar />
//
//             <section className="main-section">
//                 <div className="page-heading py-16">
//                     <h1>Smart feedback for your dream job</h1>
//                     {isProcessing ? (
//                         <>
//                             <h2>{statusText}</h2>
//                             <img src="/images/resume-scan.gif" className="w-full"/>
//                         </>
//                     ) : (
//                         <h2>Drop your resume for an ATS score and improvement tips</h2>
//                     )}
//                     {!isProcessing && (
//                         <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
//                             <div className="form-div">
//                                 <label htmlFor="company-name"> Company Name</label>
//                                 <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
//                             </div>
//                             <div className="form-div">
//                                 <label htmlFor="job-title"> Job Title</label>
//                                 <input type="text" name="job-title" placeholder="Job Title" id="job-title"/>
//                             </div>
//                             <div className="form-div">
//                                 <label htmlFor="job-description"> Job Description</label>
//                                 <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description"/>
//                             </div>
//                             <div className="form-div">
//                                 <label htmlFor="uploader"> Upload Resume</label>
//                                 <FileUploader onFileSelect={handleFileSelect }/>
//                             </div>
//
//                             <button className="primary-button" type="submit">
//                                Analyze Resume
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </section>
//         </main>
//     );
// };
//
// export default Upload;





// upload.tsx
//
// import { type FormEvent, useState } from 'react'
//
// import Navbar from "../components/Navbar";
// import FileUploader from "../components/FileUploader";
// import {usePuterStore} from "../lib/puter";
// import {useNavigate} from "react-router";
//
// const Upload = (): React.JSX.Element => {
//
//     const { auth, isLoading, fs, ai, kv } = usePuterStore();
//
//     const navigate = useNavigate();
//
//     const [isProcessing, setIsProcessing] = useState(false);
//
//     const [statusText, setStatusText] = useState("");
//
//     const [file, setFile] = useState<File | null>(null);
//
//     const handleFileSelect = (file: File | null) => {
//
//         setFile(file);
//
//     }
//
//     const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
//         setIsProcessing(true);
//         setStatusText( 'Uploading the file...');
//         const uploadedFile = await fs.upload([file]);
//
//         if(!uploadedFile)  return setStatusText( 'Error: Failed to upload file');
//
//         setStatusText( 'Converting to image...');
//         const imageFile = await convertPdfToImage(file);
//         if(!imageFile.file)  return setStatusText( 'Error: Failed to convert PDF to image');
//
//         setStatusText( 'Uploading the image...');
//         const uploadedImage = await fs.upload([imageFile.file]);
//
//         if(!uploadedImage)  return setStatusText( 'Error: Failed to upload file');
//
//         setStatusText( 'Preparing data...');
//
//         const uuid = generateUUID();
//         const data = {
//             id:uuid,
//             resumePath: uploadedFile.path,
//             imagePath: uploadedImage.path,
//             companyName, jobTitle, jobDescription,
//             feedback: '',
//         }
//         await kv.set(`resume: ${uuid} `, JSON.stringify(data));
//
//         setStatusText( 'Analyzing...');
//
//         const feedback = await ai.feedback(
//             uploadedFile.path,
//             prepareInstructions({jobTitle, jobDescription})
//         )
//         if(!feedback) return setStatusText( 'Error: Failed to analyze resume');
//
//         const feedbackText = typeof feedback.message.content === 'string'
//             ? feedback.message.content
//             : feedback.message.content[0].text;
//         data.feedback = JSON.parse(feedbackText);
//         await kv.set(`resume-${uuid}`, JSON.stringify(data));
//         setStatusText( 'Analysis complete, redirecting...');
//         console.log(data);
//
//     }
//
//     const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//
//         e.preventDefault();
//         const form = e.currentTarget.closest('form');
//         if(!form) return;
//         const formData = new FormData(form);
//
//         const companyName = formData.get('company-name') as string;
//         const jobTitle = formData.get('job-title') as string;
//         const jobDescription = formData.get('job-description') as string;
//
//         if(!file) return;
//
//         handleAnalyze({ companyNAme, jobTile, jobDesription, file});
//
//     }
//
//     return (
//
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//
//             <Navbar />
//
//             <section className="main-section">
//
//                 <div className="page-heading py-16">
//
//                     <h1>Smart feedback for your dream job</h1>
//
//                     {isProcessing ? (
//
//                         <>
//
//                             <h2>{statusText}</h2>
//
//                             <img
//                                 src="/images/resume-scan.gif"
//                                 className="w-full"
//                             />
//
//                         </>
//
//                     ) : (
//
//                         <h2>
//                             Drop your resume for an ATS score and improvement tips
//                         </h2>
//
//                     )}
//
//                     {!isProcessing && (
//
//                         <form
//                             id="upload-form"
//                             onSubmit={handleSubmit}
//                             className="flex flex-col gap-4 mt-8"
//                         >
//
//                             <div className="form-div">
//
//                                 <label htmlFor="company-name">
//                                     Company Name
//                                 </label>
//
//                                 <input
//                                     type="text"
//                                     name="company-name"
//                                     placeholder="Company Name"
//                                     id="company-name"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="job-title">
//                                     Job Title
//                                 </label>
//
//                                 <input
//                                     type="text"
//                                     name="job-title"
//                                     placeholder="Job Title"
//                                     id="job-title"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="job-description">
//                                     Job Description
//                                 </label>
//
//                                 <textarea
//                                     rows={5}
//                                     name="job-description"
//                                     placeholder="Job Description"
//                                     id="job-description"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="uploader">
//                                     Upload Resume
//                                 </label>
//
//                                 <FileUploader onFileSelect={handleFileSelect} />
//
//                             </div>
//
//                             <button
//                                 className="primary-button"
//                                 type="submit"
//                             >
//                                 Analyze Resume
//                             </button>
//
//                         </form>
//
//                     )}
//
//                 </div>
//             </section>
//         </main>
//
//     )
//
// }
//
// export default Upload




// import { type FormEvent, useState } from 'react'
// import Navbar from "../components/Navbar";
// import FileUploader from "../components/FileUploader";
// import { usePuterStore } from "../lib/puter";
// import { useNavigate } from "react-router";
// import { convertPdfToImage } from "../lib/pdf2img";
// import { generateUUID, formatSize } from "../lib/utils";
// import { prepareInstructions } from "../../constants";
//
//
// const Upload = (): React.JSX.Element => {
//
//     const { auth, isLoading, fs, ai, kv } = usePuterStore();
//
//     const navigate = useNavigate();
//
//     const [isProcessing, setIsProcessing] = useState(false);
//
//     const [statusText, setStatusText] = useState("");
//
//     const [file, setFile] = useState<File | null>(null);
//
//     const handleFileSelect = (file: File | null) => {
//
//         setFile(file);
//
//     }
//
//     const handleAnalyze = async ({
//                                      companyName,
//                                      jobTitle,
//                                      jobDescription,
//                                      file
//                                  }: {
//         companyName: string,
//         jobTitle: string,
//         jobDescription: string,
//         file: File
//     }) => {
//
//         setIsProcessing(true);
//
//         setStatusText('Uploading the file...');
//
//         const uploadedFile = await fs.upload([file]);
//
//         if (!uploadedFile)
//             return setStatusText('Error: Failed to upload file');
//
//         setStatusText('Converting to image...');
//
//         const imageFile = await convertPdfToImage(file);
//
//         if (!imageFile.file)
//             return setStatusText('Error: Failed to convert PDF to image');
//
//         setStatusText('Uploading the image...');
//
//         const uploadedImage = await fs.upload([imageFile.file]);
//
//         if (!uploadedImage)
//             return setStatusText('Error: Failed to upload image');
//
//         setStatusText('Preparing data...');
//
//         const uuid = generateUUID();
//
//         const data = {
//
//             id: uuid,
//
//             resumePath: uploadedFile.path,
//
//             imagePath: uploadedImage.path,
//
//             companyName,
//
//             jobTitle,
//
//             jobDescription,
//
//             feedback: null,
//
//         }
//
//         await kv.set(`resume-${uuid}`, JSON.stringify(data));
//
//         setStatusText('Analyzing...');
//
//         const feedback = await ai.feedback(
//
//             uploadedFile.path,
//
//             prepareInstructions({
//                 jobTitle,
//                 jobDescription
//             })
//
//         )
//
//         if (!feedback)
//             return setStatusText('Error: Failed to analyze resume');
//
//         const feedbackText =
//             typeof feedback.message.content === 'string'
//                 ? feedback.message.content
//                 : feedback.message.content[0].text;
//
//         data.feedback = JSON.parse(feedbackText);
//
//         await kv.set(`resume-${uuid}`, JSON.stringify(data));
//
//         setStatusText('Analysis complete, redirecting...');
//
//         console.log(data);
//         navigate(`/resume/${uuid}`);
//
//     }
//
//     const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//
//         e.preventDefault();
//
//         const form = e.currentTarget;
//
//         const formData = new FormData(form);
//
//         const companyName =
//             formData.get('company-name') as string;
//
//         const jobTitle =
//             formData.get('job-title') as string;
//
//         const jobDescription =
//             formData.get('job-description') as string;
//
//         if (!file) return;
//
//         handleAnalyze({
//             companyName,
//             jobTitle,
//             jobDescription,
//             file
//         });
//
//     }
//
//     return (
//
//         <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//
//             <Navbar />
//
//             <section className="main-section">
//
//                 <div className="page-heading py-16">
//
//                     <h1>Smart feedback for your dream job</h1>
//
//                     {isProcessing ? (
//
//                         <>
//
//                             <h2>{statusText}</h2>
//
//                             <img
//                                 src="/images/resume-scan.gif"
//                                 className="w-full"
//                             />
//
//                         </>
//
//                     ) : (
//
//                         <h2>
//                             Drop your resume for an ATS score and improvement tips
//                         </h2>
//
//                     )}
//
//                     {!isProcessing && (
//
//                         <form
//                             id="upload-form"
//                             onSubmit={handleSubmit}
//                             className="flex flex-col gap-4 mt-8"
//                         >
//
//                             <div className="form-div">
//
//                                 <label htmlFor="company-name">
//                                     Company Name
//                                 </label>
//
//                                 <input
//                                     type="text"
//                                     name="company-name"
//                                     placeholder="Company Name"
//                                     id="company-name"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="job-title">
//                                     Job Title
//                                 </label>
//
//                                 <input
//                                     type="text"
//                                     name="job-title"
//                                     placeholder="Job Title"
//                                     id="job-title"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="job-description">
//                                     Job Description
//                                 </label>
//
//                                 <textarea
//                                     rows={5}
//                                     name="job-description"
//                                     placeholder="Job Description"
//                                     id="job-description"
//                                 />
//
//                             </div>
//
//                             <div className="form-div">
//
//                                 <label htmlFor="uploader">
//                                     Upload Resume
//                                 </label>
//
//                                 <FileUploader
//                                     onFileSelect={handleFileSelect}
//                                 />
//
//                             </div>
//
//                             <button
//                                 className="primary-button"
//                                 type="submit"
//                             >
//                                 Analyze Resume
//                             </button>
//
//                         </form>
//
//                     )}
//
//                 </div>
//
//             </section>
//
//         </main>
//
//     )
//
// }
//
// export default Upload




import { type FormEvent, useState } from 'react';
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";
import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "../lib/pdf2img";
import { generateUUID } from "../lib/utils";
import { prepareInstructions } from "../../constants";

const STEPS = [
    { id: 1, label: "Uploading resume" },
    { id: 2, label: "Converting to image" },
    { id: 3, label: "Uploading image" },
    { id: 4, label: "Preparing data" },
    { id: 5, label: "Analyzing with AI" },
    { id: 6, label: "Complete!" },
];

const ProgressBar = ({ currentStep, statusText }: { currentStep: number; statusText: string }) => {
    const progress = Math.round((currentStep / STEPS.length) * 100);

    return (
        <div className="flex flex-col gap-4 w-full mt-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{statusText}</p>
                <p className="text-sm font-bold text-violet-500">{progress}%</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                    className="h-3 rounded-full bg-gradient-to-r from-violet-400 to-rose-300 transition-all duration-700 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Steps list */}
            <div className="flex flex-col gap-3 mt-2">
                {STEPS.map((step) => (
                    <div key={step.id} className="flex flex-row gap-3 items-center">
                        {currentStep > step.id ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs">✓</span>
                            </div>
                        ) : currentStep === step.id ? (
                            <div className="w-5 h-5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin flex-shrink-0" />
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                        )}
                        <p className={`text-sm transition-all duration-300 ${
                            currentStep > step.id
                                ? "text-green-500 line-through"
                                : currentStep === step.id
                                    ? "text-violet-500 font-semibold"
                                    : "text-gray-400 dark:text-gray-500"
                        }`}>
                            {step.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Upload = (): React.JSX.Element => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => setFile(file);

    const handleAnalyze = async ({
                                     companyName, jobTitle, jobDescription, file
                                 }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        setIsProcessing(true);

        setCurrentStep(1);
        setStatusText("Uploading resume...");
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText("Error: Failed to upload file");

        setCurrentStep(2);
        setStatusText("Converting to image...");
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

        setCurrentStep(3);
        setStatusText("Uploading image...");
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText("Error: Failed to upload image");

        setCurrentStep(4);
        setStatusText("Preparing data...");
        const uuid = generateUUID();
        const data: any = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: null,
        };
        await kv.set(`resume-${uuid}`, JSON.stringify(data));

        setCurrentStep(5);
        setStatusText("Analyzing resume with AI...");
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        );
        if (!feedback) return setStatusText("Error: Failed to analyze resume");

        const feedbackText =
            typeof feedback.message.content === "string"
                ? feedback.message.content
                : feedback.message.content[0].text;

        const cleanJson = feedbackText.replace(/```json|```/g, "").trim();
        data.feedback = JSON.parse(cleanJson);
        await kv.set(`resume-${uuid}`, JSON.stringify(data));

        setCurrentStep(6);
        setStatusText("Analysis complete! Redirecting...");
        setTimeout(() => navigate(`/resume/${uuid}`), 1200);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;
        if (!file) return;
        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover dark:bg-gray-900">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>

                    {isProcessing ? (
                        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-4">
                            <h2 className="text-center font-semibold text-lg mb-2">
                                Analyzing your resume...
                            </h2>
                            <ProgressBar currentStep={currentStep} statusText={statusText} />
                        </div>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}

                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Upload;