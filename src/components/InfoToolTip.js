export function InfoToolTip(props) {
  return (
    <div
      className={`popup popup__tool-tip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_tool-tip">
        <button
          className="popup__button-closed"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__img_tool-tip" src={props.image} />
        <h2 className="popup__title_tool-tip">{props.title}</h2>
      </div>
    </div>
  );
}
