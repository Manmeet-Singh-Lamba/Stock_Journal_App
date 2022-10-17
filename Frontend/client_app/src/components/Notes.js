import Note from "./Note";

const Notes = ({ notes, onDelete }) => {
  return (
    <>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Notes;
