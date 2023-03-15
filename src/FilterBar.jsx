


export default function FilterBar({ selectedCategory, onCategoryChange, selectedDay, onDayChange }) {

  return (
    <label>
      Category:
      <select
        value={selectedCategory} // ...force the select's value to match the state variable...
        onChange={e => onCategoryChange(e.target.value)} // ... and update the state variable on any change!
      >
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Biography">Biography</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
        <option value="Music">Music</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Other">Other</option>

      </select>
      Day:
      <select
        value={selectedDay} // ...force the select's value to match the state variable...
        onChange={e => onDayChange(e.target.value)} // ... and update the state variable on any change!
      >
        <option value="All">All</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>
    </label>

  );

}