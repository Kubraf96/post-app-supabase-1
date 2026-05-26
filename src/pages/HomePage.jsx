import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(URL, {
        headers: {
          apikey: APIKEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, []);

  return (
    <main className="app">
      <section className="feed-intro">
        <p className="feed-eyebrow">2GATHER</p>
        <h1 className="page-title">Find dit næste event her!</h1>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}

console.log("VITE_SUPABASE_URL:", URL);
console.log("VITE_SUPABASE_APIKEY:", APIKEY);
