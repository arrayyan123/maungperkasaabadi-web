import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

// Data Stat Perusahaan (bisa dynamic sesuai kebutuhan)
// const stats = [
//     { label: "Tahun Didirikan", value: "2019" },
//     { label: "Karyawan", value: "500+" },
//     { label: "Kota", value: "50+" },
//     { label: "Pelanggan", value: "1M+" },
// ];

// Custom styles for timeline
const customStyle = `
  .timeline-line {
    background: linear-gradient(to bottom, #5D5CDE, #E5E5E5);
  }
  .milestone-dot {
    box-shadow: 0 0 0 4px white, 0 0 0 8px #5D5CDE20;
  }
  .card-hover {
    transition: all 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease-out forwards;
    animation-play-state: paused;
  }
  .fade-up.visible {
    animation-play-state: running;
  }
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function useFadeInOnVisible(delay = 0) {
    const ref = useRef();
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const handle = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    node.classList.add("visible");
                }
            });
        };
        const observer = new window.IntersectionObserver(handle, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        });
        node.style.animationDelay = `${delay}s`;
        observer.observe(node);
        return () => observer.disconnect();
    }, [delay]);
    return ref;
}

const TimelineItem = ({ data, idx }) => {
    const ref = useFadeInOnVisible(0.1 * (idx + 1));
    const isRight = data.right;

    return (
        <div ref={ref} className={`timeline-item relative fade-up`}>
            <div className="flex flex-col md:flex-row items-start md:items-center">
                {/* Left - only on desktop, alternate */}
                {!isRight && (
                    <div className="md:w-1/2 md:pr-8 order-2 md:order-1">
                        <div className="ml-16 md:ml-0 md:text-right">
                            <div
                                className={`${data.gradient
                                    ? "bg-gradient-to-r from-primary/5 to-purple-50 border-2 border-primary/20"
                                    : "bg-white border"
                                    } rounded-xl p-6 shadow-lg card-hover`}
                            >
                                <div className="text-sm text-primary font-semibold mb-2">
                                    {data.year}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {data.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{data.desc}</p>
                                <div className={`mt-4 flex flex-wrap gap-2 md:justify-end`}>
                                    {(data.tags || []).map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-sm ${tag.class}`}
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Timeline Dot */}
                <div
                    className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 order-1 md:order-2`}
                >
                    <div
                        className={`w-4 h-4 bg-primary rounded-full milestone-dot ${data.pulse ? "animate-pulse" : ""
                            }`}
                    ></div>
                </div>

                {/* Right - only on desktop, alternate */}
                {isRight && (
                    <div className="md:w-1/2 md:pl-8 order-3">
                        <div className="ml-16 md:ml-0">
                            <div
                                className={`${data.gradient
                                    ? "bg-gradient-to-r from-primary/5 to-purple-50 border-2 border-primary/20"
                                    : "bg-white border"
                                    } rounded-xl p-6 shadow-lg card-hover`}
                            >
                                <div className="text-sm text-primary font-semibold mb-2">
                                    {data.year}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {data.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{data.desc}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(data.tags || []).map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-sm ${tag.class}`}
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dummy for grid alignment (hidden on mobile) */}
                <div
                    className={`md:w-1/2 ${isRight
                        ? "md:pr-8 order-1 hidden md:block"
                        : "md:pl-8 order-3 hidden md:block"
                        }`}
                ></div>
            </div>
        </div>
    );
};

export default function TimelineSection() {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios
            .get("/api/timelines")
            .then((res) => {
                if (mounted) setTimeline(res.data);
            })
            .catch(() => setTimeline([]))
            .finally(() => setLoading(false));
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        axios.get('/api/companystats').then(res => setStats(res.data));
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <style>{customStyle}</style>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Perjalanan Perusahaan
                        </h1>
                        <p className="text-xl text-gray-600">
                            Mewujudkan Visi Menjadi Kenyataan
                        </p>
                        <div className="mt-4 flex justify-center">
                            <div className="w-24 h-1 bg-primary rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white rounded-xl p-6 text-center shadow-sm border card-hover"
                        >
                            <div className="text-3xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 timeline-line"></div>
                    <div className="space-y-12">
                        {loading ? (
                            <div className="text-center text-gray-500">Memuat data...</div>
                        ) : timeline.length ? (
                            timeline.map((item, idx) => (
                                <TimelineItem data={item} idx={idx} key={item.id || idx} />
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-10">
                                Timeline kosong
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}