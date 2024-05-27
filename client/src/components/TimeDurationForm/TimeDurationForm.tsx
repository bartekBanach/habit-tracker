const TimeDurationForm = () => {
  return (
    <form className="flex gap-5">
      <input
        className="p-5"
        name="hours"
        type="number"
        placeholder="hours"
        maxLength={2}
        style={{ width: '2ch' }}
      ></input>
      <input name="minutes" type="number" placeholder="minutes"></input>
      <input name="seconds" type="number" placeholder="seconds"></input>
    </form>
  );
};

export default TimeDurationForm;
