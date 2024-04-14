import React, { useState } from "react";

export default function NoteForm() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = { title, desc };

        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        try {
            const json = await response.json();

            if (!response.ok) {
                setError(json.error || "Something went wrong!");
            }

            if (response.ok) {
                setError(null);
                setTitle('');
                setDesc('');
                console.log('New note added.', json);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.log('Error parsing JSON: ', err);
        }
    }

    return <form className="create" onSubmit={handleSubmit}>
        <h3>Add New Note</h3>

        <div className="create-group">
            <div>
                <label>Note Title: </label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div>
                <label>Note Description: </label>
                <input type="text" onChange={(e) => setDesc(e.target.value)} value={desc} />
            </div>
        </div>

        <button type="submit">ADD</button>

        {error && <div className="error">{error}</div>}
    </form>;
}
