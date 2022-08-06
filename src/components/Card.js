function Card(props) {
    function handleClick() {
      props.onCardClick(props.card);
    }
    function handleLikeClick() {
      props.onCardLike(props.card);
    }
    function handleCardDelete() {
      props.onCardDelete(props.card)
    }
  
    return (
        <div className="element">
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
        <div className="element__group">
            <h2 className="element__title">{props.name}</h2>
            <figure className="element__likes">
                <button className="element__button" type="button" onClick={handleLikeClick}></button>
                <span className="element__button-count" type="button">{props.likes}</span>
            </figure>
        </div>
        <button className="element__delete" onClick={handleCardDelete}></button>
        </div>
    );
  }
export default Card 