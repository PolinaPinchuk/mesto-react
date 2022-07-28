function PopupWithForm (props) {  
    
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <form name={props.name} className="popup__content" onSubmit={props.onSubmit} noValidate>
                {props.children}
            </form>
        </div>
        </section>
    )
  }
  
export default PopupWithForm