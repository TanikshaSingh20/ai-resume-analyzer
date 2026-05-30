// import { create } from "zustand";
//
// declare global {
//     interface Window {
//         puter: {
//             auth: {
//                 getUser: () => Promise<PuterUser>;
//                 isSignedIn: () => Promise<boolean>;
//                 signIn: () => Promise<void>;
//                 signOut: () => Promise<void>;
//             };
//             fs: {
//                 write: (
//                     path: string,
//                     data: string | File | Blob
//                 ) => Promise<File | undefined>;
//                 read: (path: string) => Promise<Blob>;
//                 upload: (file: File[] | Blob[]) => Promise<FSItem>;
//                 delete: (path: string) => Promise<void>;
//                 readdir: (path: string) => Promise<FSItem[] | undefined>;
//             };
//             ai: {
//                 chat: (
//                     prompt: string | ChatMessage[],
//                     imageURL?: string | PuterChatOptions,
//                     testMode?: boolean,
//                     options?: PuterChatOptions
//                 ) => Promise<Object>;
//                 img2txt: (
//                     image: string | File | Blob,
//                     testMode?: boolean
//                 ) => Promise<string>;
//             };
//             kv: {
//                 get: (key: string) => Promise<string | null>;
//                 set: (key: string, value: string) => Promise<boolean>;
//                 delete: (key: string) => Promise<boolean>;
//                 list: (pattern: string, returnValues?: boolean) => Promise<string[]>;
//                 flush: () => Promise<boolean>;
//             };
//         };
//     }
// }
//
// interface PuterStore {
//     isLoading: boolean;
//     error: string | null;
//     puterReady: boolean;
//     auth: {
//         user: PuterUser | null;
//         isAuthenticated: boolean;
//         signIn: () => Promise<void>;
//         signOut: () => Promise<void>;
//         refreshUser: () => Promise<void>;
//         checkAuthStatus: () => Promise<boolean>;
//         getUser: () => PuterUser | null;
//     };
//     fs: {
//         write: (
//             path: string,
//             data: string | File | Blob
//         ) => Promise<File | undefined>;
//         read: (path: string) => Promise<Blob | undefined>;
//         upload: (file: File[] | Blob[]) => Promise<FSItem | undefined>;
//         delete: (path: string) => Promise<void>;
//         readDir: (path: string) => Promise<FSItem[] | undefined>;
//     };
//     ai: {
//         chat: (
//             prompt: string | ChatMessage[],
//             imageURL?: string | PuterChatOptions,
//             testMode?: boolean,
//             options?: PuterChatOptions
//         ) => Promise<AIResponse | undefined>;
//         feedback: (
//             path: string,
//             message: string
//         ) => Promise<AIResponse | undefined>;
//         img2txt: (
//             image: string | File | Blob,
//             testMode?: boolean
//         ) => Promise<string | undefined>;
//     };
//     kv: {
//         get: (key: string) => Promise<string | null | undefined>;
//         set: (key: string, value: string) => Promise<boolean | undefined>;
//         delete: (key: string) => Promise<boolean | undefined>;
//         list: (
//             pattern: string,
//             returnValues?: boolean
//         ) => Promise<string[] | KVItem[] | undefined>;
//         flush: () => Promise<boolean | undefined>;
//     };
//
//     init: () => void;
//     clearError: () => void;
// }
//
// const getPuter = (): typeof window.puter | null =>
//     typeof window !== "undefined" && window.puter ? window.puter : null;
//
// export const usePuterStore = create<PuterStore>((set, get) => {
//     const setError = (msg: string) => {
//         set({
//             error: msg,
//             isLoading: false,
//             auth: {
//                 user: null,
//                 isAuthenticated: false,
//                 signIn: get().auth.signIn,
//                 signOut: get().auth.signOut,
//                 refreshUser: get().auth.refreshUser,
//                 checkAuthStatus: get().auth.checkAuthStatus,
//                 getUser: get().auth.getUser,
//             },
//         });
//     };
//
//     const checkAuthStatus = async (): Promise<boolean> => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return false;
//         }
//
//         set({ isLoading: true, error: null });
//
//         try {
//             const isSignedIn = await puter.auth.isSignedIn();
//             if (isSignedIn) {
//                 const user = await puter.auth.getUser();
//                 set({
//                     auth: {
//                         user,
//                         isAuthenticated: true,
//                         signIn: get().auth.signIn,
//                         signOut: get().auth.signOut,
//                         refreshUser: get().auth.refreshUser,
//                         checkAuthStatus: get().auth.checkAuthStatus,
//                         getUser: () => user,
//                     },
//                     isLoading: false,
//                 });
//                 return true;
//             } else {
//                 set({
//                     auth: {
//                         user: null,
//                         isAuthenticated: false,
//                         signIn: get().auth.signIn,
//                         signOut: get().auth.signOut,
//                         refreshUser: get().auth.refreshUser,
//                         checkAuthStatus: get().auth.checkAuthStatus,
//                         getUser: () => null,
//                     },
//                     isLoading: false,
//                 });
//                 return false;
//             }
//         } catch (err) {
//             const msg =
//                 err instanceof Error ? err.message : "Failed to check auth status";
//             setError(msg);
//             return false;
//         }
//     };
//
//     const signIn = async (): Promise<void> => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//
//         set({ isLoading: true, error: null });
//
//         try {
//             await puter.auth.signIn();
//             await checkAuthStatus();
//         } catch (err) {
//             const msg = err instanceof Error ? err.message : "Sign in failed";
//             setError(msg);
//         }
//     };
//
//     const signOut = async (): Promise<void> => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//
//         set({ isLoading: true, error: null });
//
//         try {
//             await puter.auth.signOut();
//             set({
//                 auth: {
//                     user: null,
//                     isAuthenticated: false,
//                     signIn: get().auth.signIn,
//                     signOut: get().auth.signOut,
//                     refreshUser: get().auth.refreshUser,
//                     checkAuthStatus: get().auth.checkAuthStatus,
//                     getUser: () => null,
//                 },
//                 isLoading: false,
//             });
//         } catch (err) {
//             const msg = err instanceof Error ? err.message : "Sign out failed";
//             setError(msg);
//         }
//     };
//
//     const refreshUser = async (): Promise<void> => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//
//         set({ isLoading: true, error: null });
//
//         try {
//             const user = await puter.auth.getUser();
//             set({
//                 auth: {
//                     user,
//                     isAuthenticated: true,
//                     signIn: get().auth.signIn,
//                     signOut: get().auth.signOut,
//                     refreshUser: get().auth.refreshUser,
//                     checkAuthStatus: get().auth.checkAuthStatus,
//                     getUser: () => user,
//                 },
//                 isLoading: false,
//             });
//         } catch (err) {
//             const msg = err instanceof Error ? err.message : "Failed to refresh user";
//             setError(msg);
//         }
//     };
//
//     const init = (): void => {
//         const puter = getPuter();
//         if (puter) {
//             set({ puterReady: true });
//             checkAuthStatus();
//             return;
//         }
//
//         const interval = setInterval(() => {
//             if (getPuter()) {
//                 clearInterval(interval);
//                 set({ puterReady: true });
//                 checkAuthStatus();
//             }
//         }, 100);
//
//         setTimeout(() => {
//             clearInterval(interval);
//             if (!getPuter()) {
//                 setError("Puter.js failed to load within 10 seconds");
//             }
//         }, 10000);
//     };
//
//     const write = async (path: string, data: string | File | Blob) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.fs.write(path, data);
//     };
//
//     const readDir = async (path: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.fs.readdir(path);
//     };
//
//     const readFile = async (path: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.fs.read(path);
//     };
//
//     const upload = async (files: File[] | Blob[]) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.fs.upload(files);
//     };
//
//     const deleteFile = async (path: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.fs.delete(path);
//     };
//
//     const chat = async (
//         prompt: string | ChatMessage[],
//         imageURL?: string | PuterChatOptions,
//         testMode?: boolean,
//         options?: PuterChatOptions
//     ) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         // return puter.ai.chat(prompt, imageURL, testMode, options);
//         return puter.ai.chat(prompt, imageURL, testMode, options) as Promise<
//             AIResponse | undefined
//         >;
//     };
//
//     const feedback = async (path: string, message: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//
//         return puter.ai.chat(
//             [
//                 {
//                     role: "user",
//                     content: [
//                         {
//                             type: "file",
//                             puter_path: path,
//                         },
//                         {
//                             type: "text",
//                             text: message,
//                         },
//                     ],
//                 },
//             ],
//             { model: "claude-sonnet-4-6" }
//         ) as Promise<AIResponse | undefined>;
//     };
//
//     const img2txt = async (image: string | File | Blob, testMode?: boolean) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.ai.img2txt(image, testMode);
//     };
//
//     const getKV = async (key: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.kv.get(key);
//     };
//
//     const setKV = async (key: string, value: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.kv.set(key, value);
//     };
//
//     const deleteKV = async (key: string) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.kv.delete(key);
//     };
//
//     const listKV = async (pattern: string, returnValues?: boolean) => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         if (returnValues === undefined) {
//             returnValues = false;
//         }
//         return puter.kv.list(pattern, returnValues);
//     };
//
//     const flushKV = async () => {
//         const puter = getPuter();
//         if (!puter) {
//             setError("Puter.js not available");
//             return;
//         }
//         return puter.kv.flush();
//     };
//
//     return {
//         isLoading: true,
//         error: null,
//         puterReady: false,
//         auth: {
//             user: null,
//             isAuthenticated: false,
//             signIn,
//             signOut,
//             refreshUser,
//             checkAuthStatus,
//             getUser: () => get().auth.user,
//         },
//         fs: {
//             write: (path: string, data: string | File | Blob) => write(path, data),
//             read: (path: string) => readFile(path),
//             readDir: (path: string) => readDir(path),
//             upload: (files: File[] | Blob[]) => upload(files),
//             delete: (path: string) => deleteFile(path),
//         },
//         ai: {
//             chat: (
//                 prompt: string | ChatMessage[],
//                 imageURL?: string | PuterChatOptions,
//                 testMode?: boolean,
//                 options?: PuterChatOptions
//             ) => chat(prompt, imageURL, testMode, options),
//             feedback: (path: string, message: string) => feedback(path, message),
//             img2txt: (image: string | File | Blob, testMode?: boolean) =>
//                 img2txt(image, testMode),
//         },
//         kv: {
//             get: (key: string) => getKV(key),
//             set: (key: string, value: string) => setKV(key, value),
//             delete: (key: string) => deleteKV(key),
//             list: (pattern: string, returnValues?: boolean) =>
//                 listKV(pattern, returnValues),
//             flush: () => flushKV(),
//         },
//         init,
//         clearError: () => set({ error: null }),
//     };
// });








import { create } from "zustand";

declare global {
    interface Window {
        puter: {
            auth: {
                getUser: () => Promise<PuterUser>;
                isSignedIn: () => Promise<boolean>;
                signIn: () => Promise<void>;
                signOut: () => Promise<void>;
            };
            fs: {
                write: (
                    path: string,
                    data: string | File | Blob
                ) => Promise<File | undefined>;
                read: (path: string) => Promise<Blob>;
                upload: (file: File[] | Blob[]) => Promise<FSItem>;
                delete: (path: string) => Promise<void>;
                readdir: (path: string) => Promise<FSItem[] | undefined>;
            };
            ai: {
                chat: (
                    prompt: string | ChatMessage[],
                    imageURL?: string | PuterChatOptions,
                    testMode?: boolean,
                    options?: PuterChatOptions
                ) => Promise<Object>;
                img2txt: (
                    image: string | File | Blob,
                    testMode?: boolean
                ) => Promise<string>;
            };
            kv: {
                get: (key: string) => Promise<string | null>;
                set: (key: string, value: string) => Promise<boolean>;
                delete: (key: string) => Promise<boolean>;
                list: (pattern: string, returnValues?: boolean) => Promise<string[]>;
                flush: () => Promise<boolean>;
            };
        };
    }
}

interface PuterStore {
    isLoading: boolean;
    error: string | null;
    puterReady: boolean;
    auth: {
        user: PuterUser | null;
        isAuthenticated: boolean;
        signIn: () => Promise<void>;
        signOut: () => Promise<void>;
        refreshUser: () => Promise<void>;
        checkAuthStatus: () => Promise<boolean>;
        getUser: () => PuterUser | null;
    };
    fs: {
        write: (
            path: string,
            data: string | File | Blob
        ) => Promise<File | undefined>;
        read: (path: string) => Promise<Blob | undefined>;
        upload: (file: File[] | Blob[]) => Promise<FSItem | undefined>;
        delete: (path: string) => Promise<void>;
        readDir: (path: string) => Promise<FSItem[] | undefined>;
    };
    ai: {
        chat: (
            prompt: string | ChatMessage[],
            imageURL?: string | PuterChatOptions,
            testMode?: boolean,
            options?: PuterChatOptions
        ) => Promise<AIResponse | undefined>;
        feedback: (
            path: string,
            message: string
        ) => Promise<AIResponse | undefined>;
        img2txt: (
            image: string | File | Blob,
            testMode?: boolean
        ) => Promise<string | undefined>;
    };
    kv: {
        get: (key: string) => Promise<string | null | undefined>;
        set: (key: string, value: string) => Promise<boolean | undefined>;
        delete: (key: string) => Promise<boolean | undefined>;
        list: (
            pattern: string,
            returnValues?: boolean
        ) => Promise<string[] | KVItem[] | undefined>;
        flush: () => Promise<boolean | undefined>;
    };

    init: () => void;
    clearError: () => void;
}

const getPuter = (): typeof window.puter | null =>
    typeof window !== "undefined" && window.puter ? window.puter : null;

export const usePuterStore = create<PuterStore>((set, get) => {
    const setError = (msg: string) => {
        set({
            error: msg,
            isLoading: false,
            auth: {
                user: null,
                isAuthenticated: false,
                signIn: get().auth.signIn,
                signOut: get().auth.signOut,
                refreshUser: get().auth.refreshUser,
                checkAuthStatus: get().auth.checkAuthStatus,
                getUser: get().auth.getUser,
            },
        });
    };

    const checkAuthStatus = async (): Promise<boolean> => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return false;
        }

        set({ isLoading: true, error: null });

        try {
            const isSignedIn = await puter.auth.isSignedIn();
            if (isSignedIn) {
                const user = await puter.auth.getUser();
                set({
                    auth: {
                        user,
                        isAuthenticated: true,
                        signIn: get().auth.signIn,
                        signOut: get().auth.signOut,
                        refreshUser: get().auth.refreshUser,
                        checkAuthStatus: get().auth.checkAuthStatus,
                        getUser: () => user,
                    },
                    isLoading: false,
                });
                return true;
            } else {
                set({
                    auth: {
                        user: null,
                        isAuthenticated: false,
                        signIn: get().auth.signIn,
                        signOut: get().auth.signOut,
                        refreshUser: get().auth.refreshUser,
                        checkAuthStatus: get().auth.checkAuthStatus,
                        getUser: () => null,
                    },
                    isLoading: false,
                });
                return false;
            }
        } catch (err) {
            const msg =
                err instanceof Error ? err.message : "Failed to check auth status";
            setError(msg);
            return false;
        }
    };

    const signIn = async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        set({ isLoading: true, error: null });

        try {
            await puter.auth.signIn();
            await checkAuthStatus();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Sign in failed";
            setError(msg);
        }
    };

    const signOut = async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        set({ isLoading: true, error: null });

        try {
            await puter.auth.signOut();
            set({
                auth: {
                    user: null,
                    isAuthenticated: false,
                    signIn: get().auth.signIn,
                    signOut: get().auth.signOut,
                    refreshUser: get().auth.refreshUser,
                    checkAuthStatus: get().auth.checkAuthStatus,
                    getUser: () => null,
                },
                isLoading: false,
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Sign out failed";
            setError(msg);
        }
    };

    const refreshUser = async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        set({ isLoading: true, error: null });

        try {
            const user = await puter.auth.getUser();
            set({
                auth: {
                    user,
                    isAuthenticated: true,
                    signIn: get().auth.signIn,
                    signOut: get().auth.signOut,
                    refreshUser: get().auth.refreshUser,
                    checkAuthStatus: get().auth.checkAuthStatus,
                    getUser: () => user,
                },
                isLoading: false,
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed to refresh user";
            setError(msg);
        }
    };

    const init = (): void => {
        const puter = getPuter();
        if (puter) {
            set({ puterReady: true });
            checkAuthStatus();
            return;
        }

        const interval = setInterval(() => {
            if (getPuter()) {
                clearInterval(interval);
                set({ puterReady: true });
                checkAuthStatus();
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            if (!getPuter()) {
                setError("Puter.js failed to load within 10 seconds");
            }
        }, 10000);
    };

    const write = async (path: string, data: string | File | Blob) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.write(path, data);
    };

    const readDir = async (path: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.readdir(path);
    };

    const readFile = async (path: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.read(path);
    };

    const upload = async (files: File[] | Blob[]) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.upload(files);
    };

    const deleteFile = async (path: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.delete(path);
    };

    const chat = async (
        prompt: string | ChatMessage[],
        imageURL?: string | PuterChatOptions,
        testMode?: boolean,
        options?: PuterChatOptions
    ) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.ai.chat(prompt, imageURL, testMode, options) as unknown as Promise<AIResponse | undefined>;
    };

    const feedback = async (path: string, message: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        try {
            // Read the file from Puter storage
            const fileBlob = await puter.fs.read(path);
            if (!fileBlob) return;

            // Extract text from PDF using PDF.js (no Puter AI needed)
            const arrayBuffer = await fileBlob.arrayBuffer();
            const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
            // @ts-ignore
            pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

            // @ts-ignore
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let pdfText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(" ");
                pdfText += pageText + "\n";
            }

            console.log("Extracted text:", pdfText.substring(0, 200));

            // Call OpenRouter API with extracted text
            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                        "HTTP-Referer": window.location.origin,
                        "X-Title": "Resumind",
                    },
                    body: JSON.stringify({
                        model: "openrouter/auto",
                        messages: [
                            {
                                role: "user",
                                content: `Here is the resume content:\n\n${pdfText}\n\n${message}`,
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();
            console.log("OpenRouter response:", data);

            const text = data.choices?.[0]?.message?.content;
            if (!text) return;

            return {
                index: 0,
                message: {
                    role: "assistant",
                    content: text,
                    refusal: null,
                    annotations: [],
                },
                logprobs: null,
                finish_reason: "stop",
                usage: [],
                via_ai_chat_service: false,
            } as AIResponse;

        } catch (err) {
            console.error("OpenRouter API error:", err);
            return;
        }
    };

    const img2txt = async (image: string | File | Blob, testMode?: boolean) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.ai.img2txt(image, testMode);
    };

    const getKV = async (key: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.get(key);
    };

    const setKV = async (key: string, value: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.set(key, value);
    };

    const deleteKV = async (key: string) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return (puter.kv as any).del(key);
    };

    const listKV = async (pattern: string, returnValues?: boolean) => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        if (returnValues === undefined) {
            returnValues = false;
        }
        return puter.kv.list(pattern, returnValues);
    };

    const flushKV = async () => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.flush();
    };

    return {
        isLoading: true,
        error: null,
        puterReady: false,
        auth: {
            user: null,
            isAuthenticated: false,
            signIn,
            signOut,
            refreshUser,
            checkAuthStatus,
            getUser: () => get().auth.user,
        },
        fs: {
            write: (path: string, data: string | File | Blob) => write(path, data),
            read: (path: string) => readFile(path),
            readDir: (path: string) => readDir(path),
            upload: (files: File[] | Blob[]) => upload(files),
            delete: (path: string) => deleteFile(path),
        },
        ai: {
            chat: (
                prompt: string | ChatMessage[],
                imageURL?: string | PuterChatOptions,
                testMode?: boolean,
                options?: PuterChatOptions
            ) => chat(prompt, imageURL, testMode, options),
            feedback: (path: string, message: string) => feedback(path, message),
            img2txt: (image: string | File | Blob, testMode?: boolean) =>
                img2txt(image, testMode),
        },
        kv: {
            get: (key: string) => getKV(key),
            set: (key: string, value: string) => setKV(key, value),
            "delete": (key: string) => deleteKV(key),
            list: (pattern: string, returnValues?: boolean) =>
                listKV(pattern, returnValues),
            flush: () => flushKV(),
        },
        init,
        clearError: () => set({ error: null }),
    };
});