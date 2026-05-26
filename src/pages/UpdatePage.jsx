import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`${URL}?id=eq.${id}`, { headers });
      const data = await response.json();
      setImage(data[0].image);
      setCaption(data[0].caption);
      setDate(data[0].date);
      setLocation(data[0].location);
    }

    getPost();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(`${URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        image: image.trim(),
        caption: caption.trim(),
        date: date.trim(),
        location: location.trim(),
      }),
    });

    navigate(`/posts/${id}`);
  }

  return (
    <main className="app">
      <h1 className="page-title">Updater event</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Billede URL</label>
            <input
              id="image"
              name="image"
              placeholder="https://..."
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />
            {image && (
              <img src={image} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-field">
            <label htmlFor="caption">Titel</label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              placeholder="Skriv en titel til dit event..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              required
            />
          </div>

          <div className="form-field"></div>
          <label htmlFor="date">Dato</label>
          <input
            id="date"
            name="date"
            placeholder="Hvornår foregår dit event?"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="form-field"></div>
        <label htmlFor="location">Lokation</label>
        <input
          id="location"
          name="location"
          placeholder="Hvor foregår dit event?"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Gem ændringer
          </button>
        </div>
      </form>
    </main>
  );
}
