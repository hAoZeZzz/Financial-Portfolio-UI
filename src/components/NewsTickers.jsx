import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../assets/CONST";

const NewsTickers = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/news/`);
                setNewsList(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch news:", err);
            }
        };
        fetchNews();
    }, []);

    if (newsList.length === 0) return null;

    // 把新闻标题内容重复一遍，确保无缝滚动
    const duplicatedNews = [...newsList, ...newsList];

    return (
        <div
            className="relative overflow-hidden whitespace-nowrap bg-neutral-700 mt-[50px] border-b border-neutral-700 text-brand-500 py-3 px-4"
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) => {
                e.currentTarget.querySelector(".ticker-content").style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.querySelector(".ticker-content").style.animationPlayState = "running";
            }}
        >
            <div
                className="ticker-content inline-flex gap-6"
                style={{
                    animation: "ticker-scroll 200s linear infinite",
                }}
            >
                {duplicatedNews.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-800 hover:underline"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        📰 {item.title}
                        <span className="mx-2 text-gray-300">|</span>
                    </a>
                ))}
            </div>

            <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
};

export default NewsTickers;
