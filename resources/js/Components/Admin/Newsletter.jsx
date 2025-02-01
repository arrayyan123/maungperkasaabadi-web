import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function Newsletter() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setBody(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        if (image) {
            formData.append("image", image); // Tambahkan file gambar ke FormData
        }

        setIsLoading(true);
        try {
            const response = await axios.post("/api/admin/newsletter", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data.message);
            setTitle("");
            setBody("");
            setImage(null);
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(""); // Reset the Quill editor
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Failed to send newsletter");
            } else {
                alert("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Newsletter</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-black">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                {/* Body */}
                <div className="mb-4">
                    <label htmlFor="body" className="block text-sm font-medium text-black">
                        Body
                    </label>
                    <div ref={quillRef} className="mt-2 bg-white text-black rounded" style={{ minHeight: "150px" }} />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-white">
                        Image (optional)
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mt-1 block w-full text-gray-300 bg-gray-800 rounded-md shadow-sm"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className={`px-4 py-2 text-white rounded-md ${isLoading ? "bg-gray-400" : "bg-blue-600"
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Newsletter"}
                </button>
            </form>
        </div>
    );
}