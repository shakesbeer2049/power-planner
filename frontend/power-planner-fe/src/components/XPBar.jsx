const XPBar = () => {
  return (
    <div className="xp-bar">
      <span>
        <b>XP</b>
      </span>{" "}
      <progress
        className="progress progress-success w-24"
        value={50}
        max="100"
      ></progress>
    </div>
  );
};

export default XPBar;
