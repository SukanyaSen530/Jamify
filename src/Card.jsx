import "./Card.css";

export default function Card(props) {
  const { name, album, singers, year, imgUrl } = props;
  return (
    <article className="Card">
      <img src={imgUrl} alt={name} />
      <div>
        <h4>
          <span> Name : </span>
          {name}
        </h4>
        <p>
          <span> Album : </span>
          {album}
        </p>
        <p>
          <span> Singers : </span>
          {singers}
        </p>
        <p>
          <span> Year : </span>
          {year}
        </p>
      </div>
    </article>
  );
}
