import React, { useEffect, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from "axios";

const statDefault = { label: "", value: "", order: 0 };

function StatForm({ open, onClose, onSave, initial }) {
    const [form, setForm] = useState(initial || statDefault);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm(initial || statDefault);
    }, [initial]);

    if (!open) return null;

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        onSave(form, () => setLoading(false));
    }
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
                <button
                    className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500"
                    onClick={onClose}
                    type="button"
                >
                    &times;
                </button>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="font-bold text-lg mb-3">
                        {initial ? "Edit Stat" : "Tambah Stat"}
                    </h2>
                    <div>
                        <label className="block mb-1">Label</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={form.label}
                            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Value</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={form.value}
                            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Urutan</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={form.order}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, order: e.target.value }))
                            }
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Menyimpan..." : initial ? "Update" : "Tambah"}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const defaultForm = {
    year: "",
    title: "",
    desc: "",
    tags: [],
    right: false,
    gradient: false,
    pulse: false,
};

const tagColors = [
    { name: "Biru", val: "bg-primary/10 text-primary" },
    { name: "Hijau", val: "bg-green-100 text-green-700" },
    { name: "Ungu", val: "bg-purple-100 text-purple-700" },
    { name: "Biru Muda", val: "bg-blue-100 text-blue-700" },
    { name: "Orange", val: "bg-orange-100 text-orange-700" },
];

function TagInput({ tags, setTags }) {
    const [text, setText] = useState("");
    const [clr, setClr] = useState(tagColors[0].val);

    function addTag(e) {
        e.preventDefault();
        if (!text.trim()) return;
        setTags([...tags, { text, class: clr }]);
        setText("");
    }
    function removeTag(idx) {
        setTags(tags.filter((_, i) => i !== idx));
    }

    return (
        <div className="mb-2">
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
                <input
                    className="border rounded px-2 py-1 flex-1"
                    value={text}
                    placeholder="Tag text"
                    onChange={(e) => setText(e.target.value)}
                />
                <select
                    className="border rounded px-2 py-1"
                    value={clr}
                    onChange={(e) => setClr(e.target.value)}
                >
                    {tagColors.map((c) => (
                        <option key={c.val} value={c.val}>{c.name}</option>
                    ))}
                </select>
                <button
                    className="bg-primary text-white px-3 py-1 rounded"
                    onClick={addTag}
                    type="button"
                >
                    Tambah
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((t, i) => (
                    <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm ${t.class} flex items-center gap-1`}
                    >
                        {t.text}
                        <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-red-600"
                            onClick={() => removeTag(i)}
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function TimelineManage() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState(defaultForm);
    const [isEdit, setIsEdit] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);

    // Company Stat State
    const [stats, setStats] = useState([]);
    const [statModal, setStatModal] = useState(false);
    const [statEdit, setStatEdit] = useState(null);

    function fetchTimelines() {
        axios.get("/api/timelines").then((r) => setTimelines(r.data));
    }
    function fetchStats() {
        axios.get("/api/companystats").then((r) => setStats(r.data));
    }
    useEffect(() => {
        fetchTimelines();
        fetchStats();
    }, []);

    function handleAddStat() {
        setStatEdit(null);
        setStatModal(true);
    }
    function handleEditStat(stat) {
        setStatEdit(stat);
        setStatModal(true);
    }
    function handleSaveStat(form, done) {
        if (statEdit) {
            axios
                .put(`/api/companystats/${statEdit.id}`, form)
                .then(fetchStats)
                .finally(() => {
                    setStatModal(false);
                    done();
                });
        } else {
            axios
                .post(`/api/companystats`, form)
                .then(fetchStats)
                .finally(() => {
                    setStatModal(false);
                    done();
                });
        }
    }
    function handleDeleteStat(id) {
        if (!window.confirm("Hapus stat ini?")) return;
        axios.delete(`/api/companystats/${id}`).then(fetchStats);
    }

    function fetchTimelines() {
        setLoading(true);
        axios
            .get("/api/timelines")
            .then((r) => setData(r.data))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchTimelines();
    }, []);

    function handleOpenAdd() {
        setForm(defaultForm);
        setIsEdit(false);
        setEditId(null);
        setModal(true);
    }
    function handleOpenEdit(t) {
        setForm({ ...t, tags: t.tags || [] });
        setIsEdit(true);
        setEditId(t.id);
        setModal(true);
    }
    function handleClose() {
        setModal(false);
        setForm(defaultForm);
        setIsEdit(false);
        setEditId(null);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const payload = { ...form };
        if (isEdit) {
            axios
                .put(`/api/timelines/${editId}`, payload)
                .then(() => {
                    fetchTimelines();
                    handleClose();
                })
                .finally(() => setLoading(false));
        } else {
            axios
                .post("/api/timelines", payload)
                .then(() => {
                    fetchTimelines();
                    handleClose();
                })
                .finally(() => setLoading(false));
        }
    }

    function handleDelete(id) {
        if (!window.confirm("Hapus timeline ini?")) return;
        setLoading(true);
        axios
            .delete(`/api/timelines/${id}`)
            .then(() => fetchTimelines())
            .finally(() => setLoading(false));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-white">
                    Timeline Manage
                </h2>
            }
        >
            <div className="p-4 max-w-4xl mx-auto">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold">Data Stat Perusahaan</h2>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                            onClick={handleAddStat}
                        >
                            + Tambah Stat
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-xl border shadow">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Label</th>
                                    <th className="p-2">Value</th>
                                    <th className="p-2">Urutan</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.map((stat) => (
                                    <tr key={stat.id}>
                                        <td className="p-2">{stat.label}</td>
                                        <td className="p-2">{stat.value}</td>
                                        <td className="p-2">{stat.order}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleEditStat(stat)}
                                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteStat(stat.id)}
                                                className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {!stats.length && (
                                    <tr>
                                        <td colSpan={4} className="text-center p-4 text-gray-500">
                                            Data stat kosong!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Company Stat Modal Form --- */}
                <StatForm
                    open={statModal}
                    onClose={() => setStatModal(false)}
                    onSave={handleSaveStat}
                    initial={statEdit}
                />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Kelola Timeline Perusahaan</h1>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                        onClick={handleOpenAdd}
                    >
                        + Tambah Timeline
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-xl border shadow">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Tahun</th>
                                <th className="p-2">Judul</th>
                                <th className="p-2">Deskripsi</th>
                                <th className="p-2">Tags</th>
                                <th className="p-2">Posisi</th>
                                <th className="p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((t) => (
                                <tr key={t.id}>
                                    <td className="p-2">{t.year}</td>
                                    <td className="p-2">{t.title}</td>
                                    <td className="p-2 max-w-xs truncate">{t.desc}</td>
                                    <td className="p-2">
                                        <div className="flex flex-wrap gap-1">
                                            {(t.tags || []).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-0.5 rounded-full text-xs ${tag.class}`}
                                                >
                                                    {tag.text}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <span
                                            className={t.right ? "text-green-600" : "text-blue-600"}
                                        >
                                            {t.right ? "Kanan" : "Kiri"}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleOpenEdit(t)}
                                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!data.length && (
                                <tr>
                                    <td colSpan={6} className="text-center p-4 text-gray-500">
                                        Timeline kosong!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal Form */}
                {modal && (
                    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-2 relative">
                            <button
                                className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500"
                                onClick={handleClose}
                                type="button"
                            >
                                &times;
                            </button>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <h2 className="font-bold text-lg mb-3">
                                    {isEdit ? "Edit Timeline" : "Tambah Timeline"}
                                </h2>
                                <div>
                                    <label className="block mb-1">Tahun</label>
                                    <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={form.year}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, year: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Judul</label>
                                    <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, title: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Deskripsi</label>
                                    <textarea
                                        className="border rounded px-2 py-1 w-full"
                                        value={form.desc}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, desc: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <TagInput
                                    tags={form.tags}
                                    setTags={(tags) => setForm((f) => ({ ...f, tags }))}
                                />
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.right}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, right: e.target.checked }))
                                            }
                                        />
                                        Timeline di Kanan
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.gradient}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, gradient: e.target.checked }))
                                            }
                                        />
                                        Gradient Card
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.pulse}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, pulse: e.target.checked }))
                                            }
                                        />
                                        Milestone Pulse
                                    </label>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white px-4 py-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? "Menyimpan..." : isEdit ? "Update" : "Tambah"}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}