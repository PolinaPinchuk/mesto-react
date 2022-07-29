import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)

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
//        setSelectedCard(null)
    }

  return (
    <div className="App">

    <div className="page">
        <div className="page__container">

        <Header />

        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />

        <PopupWithForm isOpen={isEditProfilePopupOpen} name="edit-form" onClose={closeAllPopups} 
        title="Редактировать профиль" button="Сохранить">
                    <input id="name" className="popup__input" type="text" required minLength="2" maxLength="40" 
                    placeholder="Имя" name="name"/>
                    <span className="name-error popup__input-error"></span>
                    <input id="job" className="popup__input" type="text" required minLength="2" maxLength="200" 
                    placeholder="О себе" name="job"/>
                    <span className="job-error popup__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isAddPlacePopupOpen} name="add-form" onClose={closeAllPopups} title="Новое место" 
        button="Создать">
                    <input id="place" className="popup__input" type="text" required minLength="2" maxLength="30" 
                    placeholder="Название" name="place"/>
                    <span className="place-error popup__input-error"></span>
                    <input id="link" className="popup__input" type="url" required placeholder="Ссылка на картинку" 
                    name="link"/>
                    <span className="link-error popup__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isEditAvatarPopupOpen} name="add-form" onClose={closeAllPopups} 
        title="Обновить аватар" button="Сохранить">
                    <input type="url" placeholder="Ссылка на аватар" className="popup__input" required id="avatar" name="avatar" autoComplete="off"/>
                    <span className="avatar-error popup__input-error"></span>
        </PopupWithForm>
        <PopupWithForm name="add-form" onClose={closeAllPopups} title="Вы уверены?" button="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard}  isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
                           
         <Footer />
      
        </div>
        
    </div>

    </div>
  );
}

export default App;
