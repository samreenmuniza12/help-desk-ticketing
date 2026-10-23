import { useState } from "react";
function TicketForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if(title.trim() === "") return;
        await onCreate({ title, description });
        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={handleSubmit}>
           <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Whats the issue?"
            />
            <textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="More details (optional)"
            />
            <button type="submit">Submit Ticket</button>
        </form>
    );
} 

export default TicketForm;