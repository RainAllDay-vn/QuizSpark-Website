import React, { useEffect, useState } from "react";
import { getMyCollections ,type Collection } from "@/lib/api/api";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase";

const TestQuiz: React.FC = () => {
  const auth = getAuth(app)
  const currentUser = auth.currentUser
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getMyCollections();
        setCollections(data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (!currentUser) {
    return <p className="text-center text-gray-600 mt-10">Please log in first.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧠 My Quiz Collections</h1>
      {collections.length === 0 ? (
        <p className="text-gray-500">No collections found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {collections.map((c) => (
            <div
              key={c.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-lg font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-500">{c.description || "No description"}</p>
              <p className="text-sm mt-1 text-gray-400">
                {c.card_count ?? 0} cards
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(TestQuiz);
