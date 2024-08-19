const Card = ({ title, data }) => {
  return (
    <div className="card card-normal bg-base-100 w-48 shadow-xl m-auto text-center card-data">
      <div className="card-body">
        <p className="card-title text-lg">{title}</p>
        <h1 className="text-5xl">{data}</h1>
      </div>
    </div>
  );
};

export default Card;
