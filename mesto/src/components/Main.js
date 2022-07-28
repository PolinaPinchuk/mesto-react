import React from 'react';
import { api } from '../utils/api';
import Card from "./Card";

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [userDescription, setUserDescription] = React.useState("")
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
          .then(([data, initCards]) => {
            setUserAvatar(data.avatar);
            setUserName(data.name);
            setUserDescription(data.about);
            setCards(initCards);
          })
          .catch((err) => console.log(err));
      }, []);
     
    return (
        <main className="content">
        <section className="profile">
            <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar}>
                <img className='profile__avatar' src={userAvatar} alt='Фото профиля'/>
            </button>
            <div className="profile__info">
                <div className="profile__container">
                    <h1 className="profile__title">{userName}</h1>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
        {cards &&
            cards.map((newCard) => {
              return (
                <Card
                  card={newCard}
                  key={newCard._id}
                  name={newCard.name}
                  link={newCard.link}
                  likes={newCard.likes.length}
                  onCardClick={props.onCardClick}
                />
              );
            })}
        </section>
        </main>     
    )
  }
  
export default Main