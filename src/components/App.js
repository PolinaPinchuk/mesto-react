import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])


    // Определяем, являемся ли мы владельцем текущей карточки
    //const isOwn = cards.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    //const cardDeleteButtonClassName = (
    //`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    //);
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    //const isLiked = cards.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    //const cardLikeButtonClassName = `...`;


    React.useEffect(() => {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([user, initCards]) => {
          setCards(initCards)
          setCurrentUser(user)
        })
        .catch((err) => console.log(err))
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
      }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
    }

    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } 

    function handleCardDelete(card) {
      api.deleteCard(card._id).then(() => {
          setCards(cards.filter((item) => item !== card))
        })
    }

    function handleUpdateUser(userItem) {
      api.editProfile(userItem)
        .then((item) => {
          setCurrentUser(item)
          closeAllPopups()
        })
        .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userAvatar) {
      api.editAvatar(userAvatar)
        .then((item) => {
          setCurrentUser(item)
          closeAllPopups()
        })
        .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(dataNewCard) {
      api.addCard(dataNewCard)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups()
        })
        .catch((err) => console.log(err))
    }
 
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">

    <div className="page">
        <div className="page__container">

        <Header />

        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <PopupWithForm name="add-form" onClose={closeAllPopups} title="Вы уверены?" button="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard}  isOpen={isImagePopupOpen} onClose={closeAllPopups}/>                          
         <Footer />
      
        </div>
        
    </div>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
